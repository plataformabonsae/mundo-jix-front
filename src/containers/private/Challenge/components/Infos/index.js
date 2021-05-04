import React from "react";

import { Title, Text } from "components/Text";

import calendar from "assets/components/Infos/calendar.svg";
import insignia from "assets/components/Infos/insignia.svg";
import person from "assets/components/Infos/person.svg";
import points from "assets/components/Infos/points.svg";
import award from "assets/components/Infos/award.svg";

import styles from "./styles.module.sass";

const Item = (props) => {
  const icon = (type) => {
    if (type === "calendar") return calendar;
    else if (type === "insignia") return insignia;
    else if (type === "skill") return person;
    else if (type === "points") return points;
    else if (type === "award") return award;
  };

  const text = (type) => {
    if (type === "calendar") return "PRAZO FINAL";
    else if (type === "insignia") return "INSÍGNIA";
    else if (type === "skill") return "SKILL NECESSÁRIA";
    else if (type === "points") return "PONTUAÇÃO";
    else if (type === "award") return "PRÊMIO";
  };

  return (
    <section className={styles.item}>
      <div className={styles.image}>
        <img src={icon(props.type)} alt={props.name} />
      </div>
      <Title>{props.title || text(props.type)}</Title>
      <Text>{props.desc || "..."}</Text>
    </section>
  );
};

const Infos = (props) => {
  const { data } = props;
  return (
    <section className={styles.infos}>
      <Item type="calendar" desc={data?.deadline} />
      <Item type="points" desc={data?.price} />
      <Item type="insignia" desc={data?.prize} />
      <Item type="skill" />
    </section>
  );
};

export { Infos, Item };
