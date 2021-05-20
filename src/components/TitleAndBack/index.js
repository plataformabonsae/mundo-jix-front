import React from "react";
import { Link } from "react-router-dom";

import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

const TitleAndBack = (props) => {
  const { data, to, noBack } = props;
  return (
    <>
      {!noBack && (
        <Link className={styles.goback} to={"/"}>
          Voltar
        </Link>
      )}
      <header className={styles.header}>
        <Text size={14} className={styles.tag}>
          {data?.challenge_type.replace("_", " ") || "..."}
        </Text>
        <Title className={styles.name}>{data?.name || "..."}</Title>
      </header>
    </>
  );
};

export { TitleAndBack };
