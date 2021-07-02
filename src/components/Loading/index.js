import React from "react";
import { useSpring, animated } from "react-spring";
import { DisappearedLoading } from "react-loadingg";

import styles from "./styles.module.sass";

// import logo from "assets/logo/logo_color.png";

const Loading = (props) => {
  const animatedStyles = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });

  return (
    // <section className={ styles.wrapper }>
    <animated.div
      style={{ ...props.style, ...animatedStyles }}
      className={`${styles.loading} ${props.full ? styles.full : ""}`}
    >
      <div
        className={`${styles.content} ${
          props.full ? styles.full__content : ""
        } ${props.inline ? styles.inline__content : ""}`}
      >
        <DisappearedLoading color={props.color} size={props.size} />
        {/* Carregando ... */}
        <span className={styles.full__message}>{props.children}</span>
      </div>
    </animated.div>
    // </section>
  );
};

export { Loading };
