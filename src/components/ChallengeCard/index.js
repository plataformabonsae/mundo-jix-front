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
      {typeof props.status === "number" && (
        <header className={styles.header}>
          <Text color="white" style={{ fontSize: 16 }}>
            <span
              className={`${styles.status} ${
                !!props.status && styles.status__active
              }`}
            ></span>
            {props.status === 0 ? "Pagamento em análise" : "Ativo"}
          </Text>
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
        {props.company ? (
          <>
            <Text style={{ margin: "12px 0 6px" }} color={colors.MEDIUM_BLACK}>
              <svg
                style={{ marginRight: 6, position: "relative", top: 2 }}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M9.86898 0.932972L11.8991 5.04662C12.0403 5.33272 12.3133 5.53097 12.6291 5.57678L17.1689 6.23648C17.9641 6.35212 18.2814 7.32909 17.7062 7.88967L14.4212 11.0917C14.1929 11.3143 14.0885 11.6354 14.1426 11.9496L14.9179 16.471C15.0538 17.2629 14.2226 17.8666 13.5114 17.493L9.45109 15.3585C9.16873 15.2102 8.83119 15.2102 8.54883 15.3585L4.48851 17.493C3.77737 17.867 2.94608 17.2629 3.082 16.471L3.85734 11.9496C3.91141 11.6354 3.80703 11.3143 3.57875 11.0917L0.293764 7.88967C-0.281455 7.32872 0.0358162 6.35175 0.83106 6.23648L5.37086 5.57678C5.68663 5.53097 5.9596 5.33272 6.10077 5.04662L8.13094 0.932972C8.48613 0.212447 9.51341 0.212447 9.86898 0.932972Z"
                    fill="#ED8A19"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <b>{props.item.users_count} </b>
              participantes
            </Text>
            <Text color={colors.MEDIUM_BLACK} style={{ margin: "12px 0 6px" }}>
              <svg
                style={{ marginRight: 6, position: "relative", top: 2 }}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
                  fill="#25AE88"
                />
                <path
                  d="M13.6803 5.40039L7.92031 11.8804L4.32031 9.00039"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <b>{props.item.projects_count} </b>
              projetos entregues
            </Text>
          </>
        ) : (
          <>
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
                  {props.item.badge_points
                    ? props.item.badge_points
                    : "Sem pontos"}
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
          </>
        )}

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
