import React from "react";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

import profile from "assets/logo/JixProfile.png";

import { BASEURL } from "utils/api";

import profileDefault from "assets/components/ProfileCard/default.png";
import guardia from "assets/components/ProfileCard/guardia.svg";

const ProfileCard = (props) => {
  const { data } = props;
  return (
    <Card
      border
      noShadow={!props.small && true}
      className={styles.card}
      style={!props.small && { paddingTop: 42, marginTop: 30 }}
    >
      {!props.small ? (
        <>
          <div className={styles.image}>
            <img src={props.img || profileDefault} alt={props.name} />
            {props.keeper && (
              <img className={styles.keeper} src={guardia} alt="Guardiã(o)" />
            )}
          </div>
          <Title size={18}>{props.name || "Nome e Sobrenome"}</Title>
          <Text>{props.desc || "(Guardiã e Dev FullStack)"}</Text>
          <div className={styles.section}>
            <Title size={12} className={styles.title}>
              Skills
            </Title>
            <Text>
              {props.skills || "skillum • skilldois • skilltrês • skillquatro"}
            </Text>
          </div>
          <div className={styles.section}>
            <Title size={12} className={styles.title}>
              Biografia
            </Title>
            <Text style={{ textAlign: "justify" }}>
              {props.bio ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at vulputate tempus proin. Ultricies nibh feugiat sed duis. Adipiscing turpis donec dictum commodo."}
            </Text>
          </div>
        </>
      ) : (
        <>
          <div className={styles.imagename}>
            <img
              src={data.file ? BASEURL + data.file : profile}
              alt={data.name}
            />
            <Title size={16}>{data.name || "Nome e Sobrenome"}</Title>
          </div>
          <Text style={{ textAlign: "justify" }}>
            {data.bio ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at vulputate tempus proin. Ultricies nibh feugiat sed duis. Adipiscing turpis donec dictum commodo."}
          </Text>
        </>
      )}
    </Card>
  );
};

export { ProfileCard };
