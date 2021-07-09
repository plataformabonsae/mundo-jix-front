import React from "react";

import { Text, Title } from "components/Text";

import styles from "./styles.module.sass";

const Points = ({ points }) => (
  <div className={styles.wrapper}>
    <Title color="white">{points}</Title>
    <Text color="white" size={12} weight={"bold"}>
      ponto{points === 1 ? "" : "s"}
    </Text>
  </div>
);

export { Points };
