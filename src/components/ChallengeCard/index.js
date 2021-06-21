import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { Card } from "components/Card";
import Button from "components/Button";
import { MainImage } from "components/MainImage";
import { Title, Text } from "components/Text";

import * as colors from "utils/styles/Colors";

import cool from "assets/components/Challenge/cool.svg";
import deadline from "assets/components/Card/deadline.svg";

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
      {!props.noImage && (
        <div style={{ margin: -20 }}>
          <MainImage noName data={props.item} logoPosition={`right`} />
        </div>
      )}
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
      <div style={{ position: "relative" }}>
        <hr style={{ opacity: 0.5, margin: "24px 0" }} />
        {props.item.deadline && (
          <span className={styles.deadline}>
            <img src={deadline} alt={"deadline"} />
            <div className={styles.deadline__content}>
              <div className={styles.deadline__title}>Encerra em</div>
              <div className={styles.deadline__data}>{props.item.deadline}</div>
            </div>
          </span>
        )}
        {props.item.badge_points && (
          <>
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
          </>
        )}
        {props.item.skills && (
          <>
            <Text
              color={colors.LIGHT_BLACK}
              size={16}
              style={{ margin: "12px 0 6px" }}
            >
              Skill desenvolvida
            </Text>
            <Text size={14}>
              {props.item.skills?.map(
                (item, index) => `${!!index ? " -" : ""} ${item.title}`
              )}
            </Text>
          </>
        )}
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
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          {!props.noButton && (
            <>
              <hr style={{ opacity: 0.5, margin: "12px 0" }} />
              <Button
                style={{ color: colors.BLUE_1, fontSize: 14 }}
                arrow
                transparent
                Tag={Link}
                to={props.to}
              >
                Ver desafio
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export { ChallengeCard };
