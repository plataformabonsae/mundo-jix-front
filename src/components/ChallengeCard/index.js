import React from "react";
import { Link } from "react-router-dom";

import { Card } from "components/Card";
import Button from "components/Button";
import { Title, Text } from "components/Text";

import * as colors from "utils/styles/Colors";
// import styles from "./styles.module.sass";

const ChallengeCard = (props) => {
  return (
    <Card key={props.item.id} border noShadow>
      <Text
        color={colors.MEDIUM_GRAY}
        size={12}
        weight="bold"
        style={{
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {props.item.challenge_type === "in_company"
          ? "In Company"
          : props.item.challenge_type}
      </Text>
      <Title size={18} style={{ margin: "12px 0" }}>
        {props.item.name}
      </Title>
      <Text>{props.item.description}</Text>
      <hr style={{ opacity: 0.5, margin: "12px 0" }} />
      <Text
        color={colors.LIGHT_BLACK}
        size={16}
        style={{ margin: "12px 0 6px" }}
      >
        Pontos
      </Text>
      <Text size={14}>
        {props.item.badge_points ? props.item.badge_points : "Sem pontos"}
      </Text>
      <Text
        color={colors.LIGHT_BLACK}
        size={16}
        style={{ margin: "12px 0 6px" }}
      >
        Skill desenvolvida
      </Text>
      <Text size={14}>{props.item.grade ? props.item.grade : "Sem skill"}</Text>
      <Text
        color={colors.LIGHT_BLACK}
        size={16}
        style={{ margin: "12px 0 6px" }}
      >
        Insígnias
      </Text>
      <Text size={14}>
        {props.item.grade ? props.item.grade : "Sem insígnia"}
      </Text>
      <hr style={{ opacity: 0.5, margin: "12px 0" }} />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Button
          style={{ color: colors.BLUE_1, fontSize: 14 }}
          arrow
          transparent
          Tag={Link}
          to={props.to}
        >
          Ver desafio
        </Button>
      </div>
    </Card>
  );
};

export { ChallengeCard };
