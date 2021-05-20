import React, { useState } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import parse from "html-react-parser";

import { Card } from "components/Card";
// import { ButtonGroup } from "components/ButtonGroup";
import Button from "components/Button";
import { Title, Text } from "components/Text";

import person from "assets/components/Challenge/person.svg";
import insignia from "assets/components/Challenge/insignia.svg";
import points from "assets/components/Challenge/points.svg";
import prize from "assets/components/Challenge/prize.svg";
import date from "assets/components/Challenge/date.svg";

import styles from "./styles.module.sass";

// TODO
// insignia
// date
// skills

const Presentation = (props) => {
  const { data, handleClickToSubscribe, buttonContent, refCard } = props;

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const small = {
    height: "180",
    width: "320",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handleOnReady = () => {
    // console.log("onready yt video");
  };

  return (
    <>
      <section className={styles.wrapper}>
        <Card className={styles.card} border noShadow>
          {props.isModal ? (
            <>
              <Title size={14} className={styles.title__modal}>
                Resumo
              </Title>
            </>
          ) : (
            <>
              <div className={styles.title__wrapper}>
                <Title size={18} className={styles.title}>
                  {data?.name || "..."}
                </Title>
                {!props.isModal && (
                  <Text size={14} className={styles.tag}>
                    {data?.challenge_type.replace("_", " ") || "..."}
                  </Text>
                )}
              </div>
              <div>
                Por <a href="#">Nome da Marca</a>
              </div>
            </>
          )}
          <div className={styles.content}>
            {data?.description && parse(data?.resume)}
          </div>
          {props.isModal && (
            <>
              <ul className={styles.resume__list}>
                {date?.insignia && (
                  <li className={styles.resume__list__item}>
                    <img src={insignia} alt={"Insígnia"} />
                  </li>
                )}
                {data?.badge_points && (
                  <li className={styles.resume__list__item}>
                    <img src={points} alt={"Pontos"} /> {data?.badge_points}{" "}
                    ponto
                    {data?.badge_points.length < 1 ? "" : "s"}
                  </li>
                )}
                {data?.prize && (
                  <li className={styles.resume__list__item}>
                    <img src={prize} alt={"Prêmio"} /> {data?.prize}
                  </li>
                )}
                {data?.deadline && (
                  <li className={styles.resume__list__item}>
                    <img src={date} alt={"Prazo"} /> {data?.deadline}
                  </li>
                )}
                {date?.skills && (
                  <li className={styles.resume__list__item}>
                    <img src={person} alt={"Skills"} />
                  </li>
                )}
              </ul>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {!buttonContent && <Button type={"outline"}>Favoritar</Button>}
                <Button
                  Tag={buttonContent ? Link : "button"}
                  to={`${
                    buttonContent
                      ? `/desafios/${data?.challenge_type}/inscricao/${data?.id}/1`
                      : null
                  }`}
                  type={buttonContent ? "green" : "secondary"}
                  style={{ marginLeft: 12 }}
                  onClick={() => handleClickToSubscribe()}
                >
                  {buttonContent ? "Vamo nessa!" : "Participar"}
                </Button>
              </div>
            </>
          )}
        </Card>
        {!props.isModal && (
          <YouTube
            videoId={data?.video_id}
            opts={opts}
            onReady={handleOnReady}
          />
        )}
      </section>
      {props.isModal && (
        <>
          <section className={styles.wrapper} style={{ alignItems: "center" }}>
            <Card noShadow>
              <Title size={16}>{data?.name || "..."}</Title>
              <div className={styles.content}>
                {data?.description && parse(data?.description)}
              </div>
            </Card>
            <YouTube
              videoId={data?.video_id}
              opts={small}
              onReady={handleOnReady}
            />
          </section>
          <section>
            {/* <Card noShadow> */}
            <ul className={styles.info}>
              {data?.deadline && (
                <li className={styles.info__list}>
                  <img src={date} alt={`Prazo`} /> Prazo:{" "}
                  <span style={{ fontWeight: "normal" }}>{data?.deadline}</span>
                </li>
              )}
              {data?.insignia && (
                <li className={styles.info__list}>
                  <img src={insignia} alt={`Prazo`} /> Prazo:{" "}
                  <span style={{ fontWeight: "normal" }}>{data?.insignia}</span>
                </li>
              )}
              {data?.badge_points && (
                <li className={styles.info__list}>
                  <img src={date} alt={`Prazo`} /> Ponto
                  {data?.badge_points.length < 1 ? "" : "s"}:{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {data?.badge_points}
                  </span>
                </li>
              )}
              {data?.skills && (
                <li className={styles.info__list}>
                  <img src={person} alt={`Skills`} /> Skills:{" "}
                  <span style={{ fontWeight: "normal" }}>{data?.skills}</span>
                </li>
              )}
              {data?.prize && (
                <li className={styles.info__list}>
                  <img src={prize} alt={`Prêmio`} /> Prêmio:{" "}
                  <span style={{ fontWeight: "normal" }}>{data?.prize}</span>
                </li>
              )}
            </ul>
            {/* </Card> */}
          </section>
        </>
      )}
    </>
  );
};

export { Presentation };
