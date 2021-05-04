import React from "react";

import { Title, Text } from "components/Text";

import pdf from "assets/components/Download/pdf.svg";
import styles from "./styles.module.sass";

const File = (props) => {
  return (
    <div className={styles.file}>
      <div className={styles.icon}>
        <img src={pdf} alt={props.name || "Arquivo para download"} />
      </div>
      <div className={styles.info}>
        <Title size={16}>{props.name || "Nome do arquivo"}</Title>
        <Text className={styles.formart} size={12}>
          PDF
        </Text>
      </div>
    </div>
  );
};

const Downloads = (props) => {
  return (
    <section className={styles.section}>
      <Title>Materiais</Title>
      <section className={styles.wrapper}>
        <File />
        <File />
      </section>
    </section>
  );
};

export { Downloads, File };
