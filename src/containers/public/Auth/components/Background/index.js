import React, { useEffect } from "react";
import { useSpring, useChain, animated } from "react-spring";

import styles from "./styles.module.sass";
import Typography from "utils/styles/Typography.module.sass";

const Background = ({ position, title, text, backgroundImage }) => {
  //   const style = useSpring({=

  //   const bgAnimApi = useSpringRef();
  const bgAnim = useSpring({
    // ref: bgAnimApi,
    to: [{ opacity: 1 }],
    from: {
      opacity: 0,
    },
  });
  //   const textAnimApi = useSpringRef();
  const textAnim = useSpring({
    // ref: textAnimApi,
    to: [{ opacity: 1 }],
    from: {
      opacity: 0,
    },
  });
  useChain([bgAnim, textAnim], [0, 500]);

  useEffect(() => {}, [backgroundImage]);

  if (position !== "full") {
    return (
      <animated.section
        style={{
          ...bgAnim,
          backgroundImage: backgroundImage && `url(${backgroundImage})`,
        }}
        className={position === "right" ? styles.right : styles.left}
      >
        <animated.article style={textAnim} className={styles.wrapper}>
          <h1 className={styles.title && Typography.TITLE_24}>{title}</h1>
          <p className={styles.text && Typography.BODY_16}>{text}</p>
        </animated.article>
      </animated.section>
    );
  }
};

export default Background;
