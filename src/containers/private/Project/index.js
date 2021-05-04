import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

// import { Text, Title } from "components/Text";

import { Header } from "./components/Header";
import { TeamInfo } from "./components/TeamInfo";
import { Resume } from "./components/Resume";
import { Carousel } from "./components/Carousel";

import { all } from "services/challenges";

import styles from "./styles.module.sass";

const Project = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [current, setCurrent] = useState(null);
  const { data } = useSelector((state) => state.challenges);

  useState(() => {
    dispatch(all());
  }, [dispatch]);

  useEffect(() => {
    if (data)
      setCurrent(
        (prev) =>
          [...data].filter((item) => parseInt(item.id) === parseInt(id))[0]
      );
  }, [current, id, data]);

  if (!current) {
    return "...";
  } else {
    return (
      <section className={styles.project}>
        <Link className={styles.goback} to={`/projetos/${id}`}>
          Voltar
        </Link>
        <Header data={current} />
        <TeamInfo data={current} />
        <Resume data={current} />
        <Carousel />
      </section>
    );
  }
};

export { Project };
