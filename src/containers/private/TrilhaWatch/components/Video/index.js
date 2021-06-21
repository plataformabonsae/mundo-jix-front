import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
// import parse from "html-react-parser";

import { Loading } from "components/Loading";

import { video } from "services/trail";

// import { Header } from "./components/Header";
// import { TrilhaItem } from "./components/TrilhaItem";

// import styles from "./styles.module.sass";

const Video = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const { current, loading } = useSelector((state) => state.trail);
  const { data: usertype } = useSelector((state) => state.usertype);
  // const { type, id, trail_type, trail_id } = useParams();

  useEffect(() => {
    dispatch(
      video(usertype, { id: item.id, type: item.type === "normal" ? 0 : 1 })
    )
      .then((res) => {
        console.log("then");
      })
      .catch((err) => {
        console.log("catch");
      });
  }, [dispatch, usertype, item]);

  useEffect(() => {
    props.previewData(current);
  }, [current, props]);

  const opts = {
    height: "100%",
    width: "100%'",
  };

  return (
    <>
      {loading && <Loading />}
      {/* <div className={styles.wrapper}> */}
      <YouTube
        videoId={current?.video?.video_id}
        opts={opts}
        // onReady={handleOnReady}
      />
      {/* </div> */}
    </>
  );
};

export { Video };
