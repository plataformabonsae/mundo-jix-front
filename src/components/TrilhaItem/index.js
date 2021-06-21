import React from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import parse from "html-react-parser";

import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

import videoImage from "assets/components/Trilha/video.svg";
import questionImage from "assets/components/Trilha/question.svg";
import fileImage from "assets/components/Trilha/file.svg";
import lockedImage from "assets/components/Trilha/locked.svg";

import * as colors from "utils/styles/Colors";
// import { Item } from "containers/private/Challenge/components/Infos";

const TrilhaItem = ({ Tag = Link, ...props }) => {
  const {
    locked,
    bar,
    file,
    question,
    video,
    // index,
    watched,
    item,
    trailType,
    onClick,
  } = props;
  // const { type, id, page } = useParams();

  const normal = {
    height: 150,
    width: 230,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const small = {
    height: 90,
    width: 170,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // const order =

  return (
    <Tag onClick={onClick} style={{ textDecoration: "none" }} to={props.to}>
      <section
        className={`${styles.trilhaitem} ${
          !!props.small ? styles.trilhaitem__small : styles.trilhaitem__normal
        }`}
      >
        <div className={styles.trilhaitem__image}>
          {!props.small ? (
            <Title color={colors.MEDIUM_GRAY}>0{item.order}</Title>
          ) : (
            <Text
              className={styles.trilhaitem__number}
              color={colors.MEDIUM_GRAY}
            >
              0{item.order}
            </Text>
          )}
          <div
            className={`${styles.trilhaitem__image__content}`}
            style={props.small ? small : normal}
          >
            <img
              src={
                (locked && lockedImage) ||
                (video && videoImage) ||
                (file && fileImage) ||
                (question && questionImage)
              }
              alt={"Trilha"}
            />
            {video && (
              <YouTube
                videoId={item?.video_id}
                opts={props.small ? small : normal}
                // onReady={handleOnReady}
              />
            )}
            {watched && (
              <span className={styles.trilhaitem__watched}>Assistido</span>
            )}
            {bar && <div className={styles.trilhaitem__bar}></div>}
          </div>
        </div>
        <div className={styles.trilhaitem__content}>
          <Title size={16}>
            <span style={{ textTransform: "capitalize" }}>
              {trailType === "question" ? "questão" : trailType}
            </span>
            : {item[trailType].name}
          </Title>
          {/* {item.id} */}
          {!!item[trailType].duration && (
            <Text
              size={14}
              style={{ margin: "6px 0" }}
              color={colors.LIGHT_GRAY}
            >
              {item[trailType].duration}
            </Text>
          )}
          {!props.small && (
            <Text>
              {!!item[trailType].description &&
                parse(item[trailType].description)}
            </Text>
          )}
        </div>
      </section>
    </Tag>
  );
};

export { TrilhaItem };
