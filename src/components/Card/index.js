import React from "react";

import styles from "./styles.module.sass";
import * as color from "utils/styles/Colors";

const Card = ({
  children,
  style,
  border,
  gray,
  noShadow,
  className,
  onClick,
}) => (
  <section
    onClick={onClick}
    className={`${styles.card} ${className ? className : ""}`}
    style={{
      background: gray ? "#FCFCFC" : "white",
      border: border ? `1px solid ${color.LIGHT_GRAY}` : "none",
      boxShadow: noShadow ? "none" : "",
      ...style,
    }}
  >
    {children}
  </section>
);

const CardTabs = ({ children }) => (
  <Card style={{ textAlign: "center", padding: 0 }}>
    <ol>{children}</ol>
  </Card>
);

export { Card, CardTabs };
