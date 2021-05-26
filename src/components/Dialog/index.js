import React from "react";
import {
  useSpring,
  // useSprings,
  // useTransition,
  animated,
  // useChain,
  // config,
} from "react-spring";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";

import close from "assets/components/Modal/close.svg";

import styles from "./styles.module.sass";

const Dialog = (props) => {
  const animatedStyles = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });
  // console.log(new RegExp("[^|]*$"));

  return (
    <>
      <animated.section style={animatedStyles} className={styles.modal}>
        <Card
          Tag={animated.section}
          border
          className={`${styles.card} ${
            props.className ? props.className : null
          }`}
          style={{ ...props.style }}
        >
          {props.header && (
            <div className={styles.header}>
              <Title style={{ textTransform: "capitalize" }}>
                {props.header}
              </Title>
              {props.handleClose && (
                // <section className={styles.title}>
                //   <Title size={28}>{props.title}</Title>
                <span
                  onClick={() => props.handleClose()}
                  className={styles.close}
                >
                  <img src={close} alt="Fechar modal" />
                </span>
                // </section>
              )}
            </div>
          )}
          <Title size={28}>{props.title}</Title>
          {/* {props.handleClose && (
            // <section className={styles.title}>
            //   <Title size={28}>{props.title}</Title>
              // <span onClick={props.handleClose} className={styles.close}>
              //   <img src={close} alt="Fechar modal" />
              // </span>
            // </section>
          )} */}
          <Text className={styles.desc}>{props.desc}</Text>
          {props.children}
        </Card>
        <div className={styles.shadow}></div>
      </animated.section>
    </>
  );
};

export { Dialog };
