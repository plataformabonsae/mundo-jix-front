import React from "react";
import { useSpring, animated } from "react-spring";
import { useParams, useLocation, useHistory } from "react-router-dom";

import { Card } from "components/Card";
import { Title } from "components/Text";

import { Challenge } from "containers/private/Challenge";

import close from "assets/components/Modal/close.svg";

import styles from "./styles.module.sass";

const ModalPage = (props) => {
  const location = useLocation();
  const history = useHistory();

  const animatedStyles = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });

  const { type } = useParams();

  const handleClose = () => {
    const where = location.pathname.replace(/modal.*$/, "");
    history.push(props.close || where.slice(0, -1));
  };

  // console.log(new RegExp("[^|]*$"));

  return (
    <>
      <animated.section className={styles.modal} style={animatedStyles}>
        <Card id="ModalPage" border className={styles.card}>
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
      </animated.section>
    </>
  );
};

export { ModalPage };
