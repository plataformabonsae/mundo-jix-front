import React from "react";

import { Title, Text } from "components/Text";
import Button from "components/Button";

import styles from "./styles.module.sass";

const Banner = ({ title, desc, to, button, full, Tag, onClick }) => (
  <section className={styles.banner}>
    {full ? (
      <>
        <Title size={36} color={"white"}>
          {title}
        </Title>
        <Text color={"white"} style={{ margin: "12px 0" }}>
          {desc}
        </Text>
        {!!button && (
          <Button
            onClick={() => (onClick ? onClick() : null)}
            Tag={Tag}
            to={to ? to : null}
            type={"green"}
          >
            {button}
          </Button>
        )}
      </>
    ) : (
      <article className={styles.content}>
        <Title size={36} color={"white"}>
          {title}
        </Title>
        <Text color={"white"} style={{ margin: "12px 0" }}>
          {desc}
        </Text>
        {!!button && (
          <Button
            onClick={() => onClick()}
            Tag={Tag}
            to={to ? to : null}
            type={"green"}
          >
            {button}
          </Button>
        )}
      </article>
    )}
  </section>
);

export { Banner };
