import React from "react";

import styles from "./styles.module.sass";

const SpaceBackground = ({ children }) => (
  <section className={styles.background}>{children}</section>
);

export { SpaceBackground };
