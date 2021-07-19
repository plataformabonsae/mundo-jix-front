import React from "react";
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

import { WindowSize } from "utils/etc";

// TODO
// insignia
// date
// skills

const Presentation = (props) => {
  const { data, handleClickToSubscribe, buttonContent, payed_for } = props;
  const { width } = WindowSize();

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const small = {
    height: "260",
    width: "100%",
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 24,
                }}
              >
                <Button
                  Tag={buttonContent || payed_for ? Link : "button"}
                  to={`${
                    buttonContent || payed_for
                      ? `/desafios/${data?.challenge_type}/inscricao/${data?.id}/1`
                      : null
                  }`}
                  type={buttonContent || payed_for ? "green" : "secondary"}
                  style={{ marginLeft: 12 }}
                  onClick={() => handleClickToSubscribe()}
                >
                  {buttonContent || payed_for ? "Vamo nessa!" : "Participar"}
                </Button>
              </div>
            </>
          )}
        </Card>
        {!props.isModal && (
          <YouTube
            videoId={data?.video_id}
            opts={width > 768 ? opts : small}
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
            <div>
              <YouTube
                videoId={data?.video_id}
                opts={small}
                onReady={handleOnReady}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export { Presentation };
