import React from "react";

import styles from "./styles.module.sass";

const Steps = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

const Step = (props) => {
  return (
    <div className={`${styles.step}`} onClick={props.onClick}>
      <div style={{ textAlign: "center" }}>
        <div className={`${styles.number} ${props.active && styles.active}`}>
          {props.number}
        </div>
        <div className={styles.desc}>{props.children}</div>
      </div>
    </div>
  );
};

export { Steps, Step };
