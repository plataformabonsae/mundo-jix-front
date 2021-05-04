import React from "react";
import { Link } from "react-router-dom";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

const ProjectCard = (props) => {
  const { data } = props;
  return (
    <Card border noShadow className={styles.card}>
      <Link to={`/projeto/${data.id}`} style={{ textDecoration: "none" }}>
        <header className={styles.header}>
          <Text size={18} color="white">
            {data?.name || "..."}
          </Text>
        </header>
        <section className={styles.content}>
          <Title>{data?.name || "..."}</Title>
          <Text>{data?.description || "..."}</Text>
        </section>
        <section className={styles.team}>
          <Card className={styles.image} border>
            <img src={data?.image_team || "data:null"} alt={data?.name} />
          </Card>
          <Text size={14} className={styles.names}>
            Nome Sobrenome, Nome Sobrenome, Nome Sobrenome, Nome Sobrenome, Nome
            Sobrenome
          </Text>
        </section>
      </Link>
    </Card>
  );
};

export { ProjectCard };
