import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.sass";

const TabBox = ({
  Tag = "button",
  children,
  href = "/",
  onClick,
  active,
  to,
}) => (
  <Tag
    to={to}
    href={href}
    onClick={onClick}
    className={` ${styles.tab__rounded} ${
      active ? styles.tab__rounded__active : ""
    } `}
  >
    {children}
  </Tag>
);

const TabBoxContent = ({ children }) => {
  return <section className={styles.content}>{children}</section>;
};

const TabBoxWrapper = ({ children }) => (
  <section className={styles.wrapper}>{children}</section>
);

const TabFlat = ({
  children,
  to,
  Tag = NavLink,
  color = "black",
  ...props
}) => (
  <Tag
    {...props}
    activeClassName={styles.tab__flat__active}
    className={`${styles.tab__flat} ${color && styles[color]} ${
      props.active ? styles.tab__flat__active : ""
    }`}
    to={to ? to : "/"}
  >
    {children}
  </Tag>
);

export { TabBox, TabBoxContent, TabFlat, TabBoxWrapper };
