import React from "react";

import { Title } from "components/Text";

import styles from "./styles.module.sass";

import defaultImage from "assets/components/MainImage/image.png";
import defaultLogo from "assets/components/MainImage/logo.png";

const MainImage = (props) => {
  const { data } = props;
  return (
    <main className={styles.wrapper}>
      <div className={styles.image}>
        <img src={data?.image || defaultImage} alt={data?.name} />
      </div>
      <Title color={"white"} className={styles.title}>
        {data?.name || "..."}
      </Title>
      <div className={styles.logo}>
        <img src={props.logo || defaultLogo} alt={data?.name} />
      </div>
    </main>
  );
};

export { MainImage };
