import React from "react";
import { Link } from "react-router-dom";

import { Title, Text } from "components/Text";

import { BASEURL } from "utils/api";

import pdf from "assets/components/Download/pdf.svg";
import styles from "./styles.module.sass";

const File = (props) => {
  const { data } = props;
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={BASEURL + data.file}
      className={styles.file}
    >
      <div className={styles.icon}>
        <img src={pdf} alt={data.name || "Arquivo para download"} />
      </div>
      <div className={styles.info}>
        <Title size={16}>{data.name || "Nome do arquivo"}</Title>
        <Text style={{ textTransform: "uppercase" }} size={12}>
          {data.fileextension}
        </Text>
      </div>
    </a>
  );
};

const Downloads = (props) => {
  const { data } = props;
  return (
    <section className={styles.section}>
      <Title>Materiais</Title>
      <section className={styles.wrapper}>
        {data?.map((item) => (
          <File data={item} />
        ))}
      </section>
    </section>
  );
};

export { Downloads, File };
