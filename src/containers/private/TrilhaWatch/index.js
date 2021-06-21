import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs";
import { Downloads } from "components/Downloads";
import { SubHeader } from "components/Header";
import { TrilhaItem } from "components/TrilhaItem";

import { Video } from "./components/Video";
import { Question } from "./components/Question";
import { Material } from "./components/Material";

import { normal, premium } from "services/trail";
import { get } from "services/challenges";

// import { Header } from "./components/Header";
// import { TrilhaItem } from "./components/TrilhaItem";

import styles from "./styles.module.sass";

const TrilhaWatch = (props) => {
  const dispatch = useDispatch();
  const { data: trail, loading } = useSelector((state) => state.trail);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: challenge } = useSelector((state) => state.challenge);
  const { type, id, trail_type, trail_id } = useParams();
  const [trailPreview, setTrailPreview] = useState({});
  const [trailPreviewData, setTrailPreviewData] = useState({});

  useEffect(() => {
    dispatch(get(usertype, { challenge_id: id }))
      .then((res) => {
        console.log("then");
      })
      .catch((err) => {
        console.log("catch");
      });
  }, [dispatch, usertype, id]);

  useEffect(() => {
    trail_type === "normal" && dispatch(normal(usertype, { challenge_id: id }));
    trail_type === "premium" &&
      dispatch(premium(usertype, { challenge_id: id }));
  }, [dispatch, usertype, id, trail_type]);

  useEffect(() => {
    if (trail === (undefined || null)) {
      return;
    } else {
      const trailByUrl = [...trail].filter(
        (item) => item.id === parseInt(trail_id)
      )[0];
      console.log(trailByUrl, trail_id);
      setTrailPreview({
        id: trailByUrl[trailByUrl.type].id,
        premium: trailByUrl.premium,
        type: trailByUrl.type,
      });
    }
  }, [trail, trail_id]);

  const handlePreviewData = (data) => {
    setTrailPreviewData(data);
  };

  const handlePreview = (id, premium, type) => {
    setTrailPreview({ id, premium, type });
  };

  return (
    <>
      <SubHeader>
        <TabFlat to={`/meus-desafios/${type}/${id}/inicio`} color={"white"}>
          Início
        </TabFlat>
        <TabFlat to={`/meus-desafios/${type}/${id}/projeto`} color={"white"}>
          Projeto
        </TabFlat>
        <TabFlat
          to={`/meus-desafios/${type}/${id}/trilha/normal`}
          color={"white"}
        >
          Trilha
        </TabFlat>
        <TabFlat to={`/meus-desafios/${type}/${id}/forum`} color={"white"}>
          Fórum
        </TabFlat>
      </SubHeader>
      <section className={styles.trilhawatch}>
        <section className={styles.trilhawatch__player}>
          <div className={styles.trilhawatch__content}>
            {trailPreview.type === "video" && (
              <Video previewData={handlePreviewData} item={trailPreview} />
            )}
            {trailPreview.type === "question" && (
              <Question previewData={handlePreviewData} item={trailPreview} />
            )}
            {trailPreview.type === "material" && (
              <Material previewData={handlePreviewData} item={trailPreview} />
            )}
          </div>
          <div className={styles.trilhawatch__selector}>
            <Title className={styles.trilhawatch__title}>
              {challenge?.challenge?.name}
            </Title>
            {/* <Text size={12}>{item.ord}/{trail.length}</Text> */}
            <div className={styles.trilhawatch__preview}>
              {trail?.map((item, index) => (
                <div
                  style={{
                    background: parseInt(trail_id) === item.id && "#e9eced",
                    padding: "0 32px",
                  }}
                >
                  <TrilhaItem
                    small
                    to={`/meus-desafios/${type}/${id}/trilha/normal/${item.id}`}
                    // onClick={() =>
                    //   handlePreview(item[item.type].id, item.premium, item.type)
                    // }
                    locked={item.premium === 1 ? true : false}
                    item={item}
                    trailType={item.type}
                    key={item.id}
                    video={item.video}
                    file={item.material}
                    question={item.question}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      <section className={styles.trailcontent}>
        {trailPreviewData && (
          <div className={styles.trailcontent__data}>
            {trailPreviewData?.video && (
              <>
                <Title>{trailPreviewData?.video.title}</Title>
                <Text>{trailPreviewData?.video.description}</Text>
                {/* <Downloads data={} /> */}
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export { TrilhaWatch };
