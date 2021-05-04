import React from "react";
// import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card } from "components/Card";
import { Title } from "components/Text";

// import { Challenge } from "containers/private/Challenge";

import styles from "./styles.module.sass";

const ModalPage = (props) => {
  const { type } = useParams();

  return (
    <>
      <Card border className={styles.modal}>
        <section className={styles.title}>
          <Title>{type}</Title>
        </section>
        <Card border noShadow className={styles.content}>
          modal
        </Card>
      </Card>
      <div className={styles.shadow}></div>
    </>
  );
};

export { ModalPage };
