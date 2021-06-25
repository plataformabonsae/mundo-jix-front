import React from "react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title } from "components/Text";
import { Chip } from "components/Chip";

import styles from "./styles.module.sass";

// TODO

const InCompany = () => {
  const { data: dashboard } = useSelector((state) => state.dashboard);
  const inCompany = dashboard?.in_company_numbers;
  return (
    <Card border gray style={{ gridArea: "insignia", marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          In company
        </Title>
      </header>

      <article className={styles.items}>
        <Chip
          empresa={"incompany"}
          data={`abertos`}
          currentValue={inCompany?.open}
        />
        <Chip
          empresa={"incompany"}
          data={`cadastrados`}
          currentValue={inCompany?.created}
        />
        <Chip
          empresa={"incompany"}
          data={`finalizados`}
          currentValue={inCompany?.finished}
        />
      </article>
    </Card>
  );
};

export { InCompany };
