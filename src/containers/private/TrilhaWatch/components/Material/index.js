import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import YouTube from "react-youtube";
import parse from "html-react-parser";

import { Loading } from "components/Loading";
import Button from "components/Button";
import { Title, Text } from "components/Text";

import { material } from "services/trail";

import { BASEURL } from "utils/api";

// import { TrilhaItem } from "./components/TrilhaItem";

import styles from "./styles.module.sass";

const Material = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const { current, loading } = useSelector((state) => state.trail);
  const { data: usertype } = useSelector((state) => state.usertype);
  // const { type, id, trail_type, trail_id } = useParams();

  useEffect(() => {
    dispatch(
      material(usertype, { id: item.id, type: item.type === "normal" ? 0 : 1 })
    );
  }, [dispatch, usertype, item]);

  useEffect(() => {
    props.previewData(current);
  }, [current, props]);

  return (
    <>
      {loading && <Loading />}
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.content}>
            <Title size={22}>{current?.material?.name}</Title>
            <div className={styles.desc}>
              {!!current?.material?.description &&
                parse(current.material.description)}
            </div>
          </div>
          <div className={styles.download}>
            <Button
              href={BASEURL + current?.material?.file}
              type="primary"
              Tag="a"
              target={"_blank"}
              rel="noopener"
              style={{
                borderRadius: 5,
                padding: 8,
                minWidth: "inherit",
                fontSize: 14,
              }}
            >
              <svg
                width="11"
                height="10"
                viewBox="0 0 11 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M5.36841 6.66634C5.28089 6.66634 5.19721 6.63134 5.13702 6.56967L2.89573 4.27801C2.70148 4.07967 2.84578 3.74967 3.12711 3.74967H4.30112V1.35384C4.30112 1.06676 4.54062 0.833008 4.83476 0.833008H5.90205C6.19619 0.833008 6.43569 1.06676 6.43569 1.35384V3.74967H7.6097C7.89103 3.74967 8.03533 4.07967 7.84108 4.27801L5.59979 6.56967C5.5396 6.63134 5.45592 6.66634 5.36841 6.66634Z"
                    fill="white"
                  />
                  <path
                    d="M9.7449 9.16666H0.993191C0.58122 9.16666 0.246094 8.83958 0.246094 8.4375V8.22916C0.246094 7.82708 0.58122 7.5 0.993191 7.5H9.7449C10.1569 7.5 10.492 7.82708 10.492 8.22916V8.4375C10.492 8.83958 10.1569 9.16666 9.7449 9.16666Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="10.2459"
                      height="10"
                      fill="white"
                      transform="translate(0.246094)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {`  `}
              Baixar arquivo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export { Material };
