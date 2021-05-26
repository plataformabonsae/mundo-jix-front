import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Title, Text } from "components/Text";

import { removeLastPath } from "utils/etc";

import styles from "./styles.module.sass";

const TitleAndBack = (props) => {
  const location = useLocation();
  const { data, to, noBack } = props;
  return (
    <>
      {!noBack && (
        <Link
          className={styles.goback}
          to={to || removeLastPath(location.pathname)}
        >
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
