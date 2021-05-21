import React from "react";
import { Link, useParams } from "react-router-dom";

import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

import videoImage from "assets/components/Trilha/video.svg";
import questionImage from "assets/components/Trilha/question.svg";
import fileImage from "assets/components/Trilha/file.svg";
import lockedImage from "assets/components/Trilha/locked.svg";

import * as colors from "utils/styles/Colors";

const TrilhaItem = (props) => {
  const { locked, bar, file, question, video, index, watched } = props;
  const { type, id, page } = useParams();

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/meus-desafios/${type}/${id}/trilha/example`}
    >
      <section className={styles.trilhaitem}>
        <div className={styles.trilhaitem__image}>
          <Title color={colors.MEDIUM_GRAY}>0{index}</Title>
          <div className={styles.trilhaitem__image__content}>
            <img
              src={
                (locked && lockedImage) ||
                (video && videoImage) ||
                (file && fileImage) ||
                (question && questionImage)
              }
              alt={"Trilha"}
            />
            {watched && (
              <span className={styles.trilhaitem__watched}>Assistido</span>
            )}
            {bar && <div className={styles.trilhaitem__bar}></div>}
          </div>
        </div>
        <div className={styles.trilhaitem__content}>
          <Title size={16}>Aula 01: Título da trilha</Title>
          <Text size={14} style={{ margin: "6px 0" }} color={colors.LIGHT_GRAY}>
            10min 30s
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
            sapien, sit nisi cursus pretium tortor. Neque non a risus,
            parturient vel sit leo nisl. Mattis egestas commodo metus,
            ullamcorper venenatis.
          </Text>
        </div>
      </section>
    </Link>
  );
};

export { TrilhaItem };
