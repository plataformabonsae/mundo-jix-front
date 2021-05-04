import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.sass";

const Home = (props) => {
  return (
    <section className={styles.temp}>
      <Link className={styles.link} to="/auth/talento/login">
        Talento
      </Link>
      <Link className={styles.link} to="/auth/empresa/login">
        Empresa
      </Link>
      <Link className={styles.link} to="/auth/mentor/login">
        Mentor
      </Link>
      <Link className={styles.link} to="/auth/jurado/login">
        Jurado
      </Link>
    </section>
  );
};

export { Home };
