import React from "react";

import styles from "./styles.module.sass";
import * as color from "utils/styles/Colors";

const Card = ({
  Tag = "section",
  children,
  style,
  border,
  gray,
  id,
  noShadow,
  className,
  onClick,
}) => (
  <Tag
    onClick={onClick}
    className={`${styles.card} ${className ? className : ""}`}
    id={id}
    style={{
      background: gray ? "#FCFCFC" : "white",
      border: border ? `1px solid ${color.LIGHT_GRAY}` : "none",
      boxShadow: noShadow ? "none" : "",
      ...style,
    }}
  >
    {children}
  </Tag>
);

const CardTabs = ({ children }) => (
  <Card style={{ textAlign: "center", padding: 0 }}>
    <ol>{children}</ol>
  </Card>
);

export { Card, CardTabs };
