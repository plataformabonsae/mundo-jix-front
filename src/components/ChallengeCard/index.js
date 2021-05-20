import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { Card } from "components/Card";
import Button from "components/Button";
import { MainImage } from "components/MainImage";
import { Title, Text } from "components/Text";

import * as colors from "utils/styles/Colors";

import cool from "assets/components/Challenge/cool.svg";

import styles from "./styles.module.sass";

const ChallengeCard = (props) => {
  return (
    <Card key={props.item.id} border noShadow>
      {props.canSubscribe && (
        <header className={styles.header}>
          <Title color="white" style={{ weight: "bold", fontSize: 16 }}>
            {props.item.name}
          </Title>
          <div className={styles.header__buttons}>
            {/* <Button type={`outlineWhite`}>Favoritar</Button> */}
            <Button
              // to={`/desafios/${props.item.challenge_type}/${props.item.id}/inscricao`}
              to={
                !props.subscribed
                  ? props.to
                  : `/meus-desafios/${props.item.challenge_type}/${props.item.id}`
              }
              style={{ marginLeft: 12 }}
              type={!props.subscribed ? `green` : `outlineWhite`}
            >
              {!props.subscribed ? (
                "Participar"
              ) : (
                <>
                  <img
                    className={styles.cool}
                    src={cool}
                    alt="Participando do desafio"
                  />
                  Participando
                </>
              )}
            </Button>
          </div>
        </header>
      )}
      <div style={{ margin: -20 }}>
        <MainImage noName data={props.item} logoPosition={`right`} />
      </div>
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
      <div>{parse(props.item.resume)}</div>
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
        {!props.noButton && (
          <Button
            style={{ color: colors.BLUE_1, fontSize: 14 }}
            arrow
            transparent
            Tag={Link}
            to={props.to}
          >
            Ver desafio
          </Button>
        )}
      </div>
    </Card>
  );
};

export { ChallengeCard };
