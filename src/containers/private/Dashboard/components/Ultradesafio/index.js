import React from "react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title } from "components/Text";
import { Chip } from "components/Chip";

import styles from "./styles.module.sass";

// TODO

const Ultradesafio = () => {
  const { data: dashboard } = useSelector((state) => state.dashboard);
  const ultradesafio = dashboard?.ultra_numbers;
  return (
    <Card border gray style={{ gridArea: "insignia", marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          Ultradesafio
        </Title>
      </header>

      <article className={styles.items}>
        <Chip
          empresa={"ultradesafio"}
          data={`abertos`}
          currentValue={ultradesafio?.open}
        />
        <Chip
          empresa={"ultradesafio"}
          data={`cadastrados`}
          currentValue={ultradesafio?.created}
        />
        <Chip
          empresa={"ultradesafio"}
          data={`finalizados`}
          currentValue={ultradesafio?.finished}
        />
      </article>
    </Card>
  );
};

export { Ultradesafio };
