import React, { useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import { Card } from "components/Card";
import { Title } from "components/Text";

import { Challenge } from "containers/private/Challenge";

import close from "assets/components/Modal/close.svg";

import styles from "./styles.module.sass";

const ModalPage = (props) => {
  const location = useLocation();
  const history = useHistory();

  const { type } = useParams();

  const handleClose = () => {
    const where = location.pathname.replace(/modal.*$/, "");
    history.push(props.close || where.slice(0, -1));
  };

  // console.log(new RegExp("[^|]*$"));

  return (
    <>
      <section className={styles.modal}>
        <Card border className={styles.card}>
          <section className={styles.title}>
            <Title style={{ textTransform: "capitalize" }}>
              {type === "desafio" ? "desafio" : props?.title}
            </Title>
            <span
              onClick={() =>
                props.handleClose ? props.handleClose() : handleClose()
              }
              className={styles.close}
            >
              <img src={close} alt="Fechar modal" />
            </span>
          </section>
          <Card noShadow className={styles.content}>
            {type === "desafio" && <Challenge isModal />}
            {props.children}
          </Card>
        </Card>
        <div className={styles.shadow}></div>
      </section>
    </>
  );
};

export { ModalPage };
