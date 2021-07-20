import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Title, Text } from "components/Text";

import { removeLastPath } from "utils/etc";

import styles from "./styles.module.sass";

const TitleAndBack = (props) => {
  const location = useLocation();
  const { data, to, noBack, backText } = props;
  let Tag = !props.handleGoBack ? Link : "span";
  return (
    <>
      {!noBack && (
        <Tag
          className={styles.goback}
          /* onClick={() => props.handleGoBack && props.handleGoBack(to)} */
          to={to || removeLastPath(location.pathname)}
        >
          {backText || "Voltar"}
        </Tag>
      )}
      {data?.challenge_type && (
        <header className={styles.header}>
          <Text size={14} className={styles.tag}>
            {data?.challenge_type.replace("_", " ") || ""}
          </Text>
          <Title className={styles.name}>{data?.name || ""}</Title>
        </header>
      )}
    </>
  );
};

export { TitleAndBack };
