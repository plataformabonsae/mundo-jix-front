import React from "react";

import { Title } from "components/Text";

import styles from "./styles.module.sass";

import { BASEURL } from "utils/api";

import defaultImage from "assets/components/MainImage/image.png";
import defaultLogo from "assets/components/MainImage/logo.png";

const MainImage = (props) => {
  const { data } = props;
  return (
    <main className={styles.wrapper}>
      <div className={styles.image}>
        <img
          src={props.data.file ? BASEURL + props.data.file : defaultImage}
          alt={data?.name}
        />
      </div>
      {!props.noName && (
        <Title color={"white"} className={styles.title}>
          {data?.name || "..."}
        </Title>
      )}
      <div style={{ textAlign: props.logoPosition }} className={styles.logo}>
        <img
          src={
            props.data.company?.file
              ? BASEURL + data.company?.file
              : defaultLogo
          }
          alt={data?.name}
        />
      </div>
    </main>
  );
};

export { MainImage };
