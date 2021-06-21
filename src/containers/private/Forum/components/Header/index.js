import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";
import { removeLastPath } from "utils/etc";

const Header = (props) => {
  const { data, noBack, to } = props;
  const location = useLocation();

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
          {data?.challenge_type.replace("_", " ") || ""}
        </Text>
        <Title className={styles.name}>{data?.name || ""}</Title>
      </header>
    </>
  );
};

export { Header };
