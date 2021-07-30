import React from "react";

import styles from "./styles.module.sass";

const Text = ({
  children,
  className,
  style,
  size,
  color,
  lineHeight,
  weight,
  Tag = "p",
}) => (
  <Tag
    className={`${className ? className : ""} ${styles.text}`}
    style={{
      fontSize: size ? size : 16,
      fontWeight: weight ? weight : "normal",
      lineHeight: lineHeight ? lineHeight : 1.5,
      color: color ? color : "auto",
      ...style,
    }}
  >
    {children}
  </Tag>
);

const Title = ({
  children,
  className,
  style,
  size,
  color,
  lineHeight,
  weight,
  Tag = "h6",
  onClick,
}) => (
  <Tag
    onClick={onClick}
    className={`${className ? className : ""} ${styles.title}`}
    style={{
      fontSize: size ? size : 22,
      fontWeight: weight ? weight : "bold",
      lineHeight: lineHeight ? lineHeight : 1.125,
      color: color ? color : "auto",
      ...style,
    }}
  >
    {children}
  </Tag>
);

export { Text, Title };
