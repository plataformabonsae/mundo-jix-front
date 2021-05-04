import React from "react";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

const Carousel = (props) => {
  const { data } = props;
  return (
    <section className={styles.carousel}>
      <Card border noShadow>
        <div className={styles.content}>
          <section className={styles.desc}>
            <Title>{data?.name}</Title>
            <div className={styles.desctitle}>Descrição</div>
            <Text>{data?.description}</Text>
          </section>
          <section className={styles.downloads}>
            <Title>Materiais anexados</Title>
          </section>
        </div>
      </Card>
    </section>
  );
};

export { Carousel };
