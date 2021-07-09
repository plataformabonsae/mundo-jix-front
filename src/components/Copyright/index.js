import React from "react";

import styles from "./styles.module.sass";

const Copyright = ({ color, style }) => {
  const now = new Date();
  const year = now.getFullYear();
  return (
    <span style={{ color: color, ...style }} className={styles.copyright}>
      Copyright © {year} - Todos os direitos reservados
    </span>
  );
};

export default Copyright;
