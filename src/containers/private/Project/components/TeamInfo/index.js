import React from "react";

import { Title, Text } from "components/Text";
import { Card } from "components/Card";

import styles from "./styles.module.sass";

const TeamInfo = (props) => {
  const { data } = props;

  return (
    <article className={styles.teaminfo}>
      <section className={styles.team}>
        <Card className={styles.image} border>
          <img src={data?.image_team || "data:null"} alt={data?.name} />
        </Card>
        <div className={styles.content}>
          <Title className={styles.title}>{data?.name}</Title>
          <Text size={16} className={styles.names}>
            Nome Sobrenome, Nome Sobrenome, Nome Sobrenome, Nome Sobrenome, Nome
            Sobrenome
          </Text>
        </div>
      </section>
    </article>
  );
};

export { TeamInfo };
