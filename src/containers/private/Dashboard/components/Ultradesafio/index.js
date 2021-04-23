import React from "react";

import { Card } from "components/Card";
import { Title } from "components/Text";
import { Chip } from "components/Chip";

import styles from "./styles.module.sass";

// TODO

const Ultradesafio = () => {
  return (
    <Card border gray style={{ gridArea: "insignia", marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          Ultradesafio
        </Title>
      </header>

      <article className={styles.items}>
        <Chip empresa={"ultradesafio"} data={`abertos`} currentValue={0} />
        <Chip empresa={"ultradesafio"} data={`cadastrados`} currentValue={0} />
        <Chip empresa={"ultradesafio"} data={`finalizados`} currentValue={0} />
      </article>
    </Card>
  );
};

export { Ultradesafio };
