import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MainImage } from "components/MainImage";

import { ProfileCard } from "components/ProfileCard";
import { Title } from "components/Text";

import { Presentation } from "./components/Presentation";
import { Downloads } from "./components/Downloads";
import { Infos } from "./components/Infos";

import { all } from "services/challenges";

import styles from "./styles.module.sass";

const Challenge = (props) => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challengeExists, setChallengeExists] = useState(true);
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data } = useSelector((state) => state.challenges);

  const { id } = useParams();

  // Fetch
  useEffect(() => {
    dispatch(all(usertype));
  }, [dispatch, usertype]);

  // choose the right challenge data
  useEffect(() => {
    if (data)
      setCurrentChallenge(
        () => [...data].filter((challenge) => challenge.id === parseInt(id))[0]
      );
  }, [data, id]);

  // if empty
  useEffect(() => {
    if (currentChallenge === undefined) setChallengeExists(false);
  }, [currentChallenge]);

  if (challengeExists) {
    return (
      <section className={styles.challenge}>
        <MainImage data={currentChallenge} />
        <Presentation data={currentChallenge} />
        <Downloads data={currentChallenge} />
        <Infos data={currentChallenge} />
        <div className={styles.section}>
          <Title size={24}>Equipe</Title>
          <div className={styles.container}>
            <ProfileCard keeper></ProfileCard>
            <ProfileCard></ProfileCard>
            <ProfileCard></ProfileCard>
          </div>
        </div>
        <div className={styles.section__border}>
          <Title size={24}>Mentores</Title>
          <div className={styles.container}>
            <ProfileCard small></ProfileCard>
            <ProfileCard small></ProfileCard>
            <ProfileCard small></ProfileCard>
          </div>
        </div>
        <div className={styles.section__border}>
          <Title size={24}>Jurados</Title>
          <div className={styles.container}>
            <ProfileCard small></ProfileCard>
            <ProfileCard small></ProfileCard>
            <ProfileCard small></ProfileCard>
          </div>
        </div>
      </section>
    );
  } else {
    return "Esse desafio não existe ou você não tem permissão para acessar.";
  }
};

export { Challenge };
