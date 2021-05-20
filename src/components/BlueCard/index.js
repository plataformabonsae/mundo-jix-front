import React, { useState } from "react";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

const BlueCardContainer = (props) => {
  return (
    <section {...props} className={styles.container}>
      {props.children}
    </section>
  );
};

const BlueCard = (props) => {
  const [viewInfo, setViewInfo] = useState(false);

  return (
    <Card className={styles.card} {...props}>
      {props.info && (
        <span
          className={styles.info}
          onMouseEnter={() => setViewInfo(true)}
          onMouseLeave={() => setViewInfo(false)}
        >
          i
        </span>
      )}
      {props.info && viewInfo && (
        <Card className={styles.info__content}>{props.info}</Card>
      )}
      <Title size={28} color={"white"}>
        {props.children}
      </Title>
      <Text color={"white"} className={styles.card__desc}>
        {props.desc}
      </Text>
    </Card>
  );
};

export { BlueCard, BlueCardContainer };
