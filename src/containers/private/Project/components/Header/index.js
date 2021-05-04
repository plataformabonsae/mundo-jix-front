import React from "react";

import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

const Header = (props) => {
  const { data } = props;
  return (
    <header className={styles.header}>
      <Text size={14} className={styles.tag}>
        {data?.challenge_type.replace("_", " ") || "..."}
      </Text>
      <Title className={styles.name}>{data?.name || "..."}</Title>
    </header>
  );
};

export { Header };
