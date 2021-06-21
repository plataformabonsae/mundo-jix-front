import React from "react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title } from "components/Text";
import { Chip } from "components/Chip";

import styles from "./styles.module.sass";

// TODO

const Challenges = () => {
  const { data: dashboard } = useSelector((state) => state.dashboard);
  return (
    <Card border gray style={{ gridArea: "insignia", marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          Desafios finalizados
        </Title>
      </header>

      <article className={styles.items}>
        <Chip
          desafio={"autodesafio"}
          title={`Autodesafios`}
          currentValue={dashboard?.finished_challenges?.autodesafio}
        />
        <Chip
          desafio={"incompany"}
          title={"In company"}
          currentValue={dashboard?.finished_challenges?.in_company}
        />
        <Chip
          desafio={"ultradesafio"}
          title={"Ultradesafio"}
          currentValue={dashboard?.finished_challenges?.ultradesafio}
        />
      </article>
    </Card>
  );
};

export { Challenges };
