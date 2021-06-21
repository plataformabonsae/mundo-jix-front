import React from "react";
import parse from "html-react-parser";

import { Card } from "components/Card";
import { Title } from "components/Text";

import { BASEURL } from "utils/api";

import defaultImage from "assets/components/MainImage/image.png";

import styles from "./styles.module.sass";

const Resume = (props) => {
  const { data } = props;

  return (
    <section className={styles.resume}>
      <Card className={styles.card} style={{ padding: 0 }} border noShadow>
        <img
          src={data.file ? BASEURL + data.file : defaultImage}
          alt={data?.name}
        />
        <div className={styles.content}>
          {/* <Text className={styles.status}>{"Em desenvolvimento"}</Text> */}
          <Title className={styles.title}>{data?.name}</Title>
          <div className={styles.forcefont}>
            {data?.resume ? parse(data?.resume) : ""}
          </div>
        </div>
      </Card>
    </section>
  );
};

export { Resume };
