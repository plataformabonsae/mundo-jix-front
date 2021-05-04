import React from "react";

import { Card } from "components/Card";
import { Text, Title } from "components/Text";

import defaultImage from "assets/components/MainImage/image.png";

import styles from "./styles.module.sass";

const Resume = (props) => {
  const { data } = props;

  return (
    <section className={styles.resume}>
      <Card className={styles.card} style={{ padding: 0 }} border noShadow>
        <img src={data?.image || defaultImage} alt={data?.name} />
        <div className={styles.content}>
          <Title className={styles.title}>{data?.name}</Title>
          <Text>{data?.description}</Text>
        </div>
      </Card>
    </section>
  );
};

export { Resume };
