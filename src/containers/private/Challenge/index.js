import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Project } from "containers/private/Project";

import { MainImage } from "components/MainImage";
import { ProfileCard } from "components/ProfileCard";
import { Loading } from "components/Loading";
import { Title } from "components/Text";
import { TabFlat } from "components/Tabs";
import { SubHeader } from "components/Header";

import { Presentation } from "./components/Presentation";
import { Downloads } from "./components/Downloads";
import { Infos } from "./components/Infos";

import { all, get } from "services/challenges";

import styles from "./styles.module.sass";

const Challenge = (props) => {
  const [currentChallenge, setCurrentChallenge] = useState();
  const [buttonContent, setButtonContent] = useState();
  const [owned, setOwned] = useState(false);
  // const isCard = useRef();
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data, loading } = useSelector((state) => state.challenge);
  const challenges = useSelector((state) => state.challenges);

  const { type, id, page } = useParams();

  // Fetch specific
  useEffect(() => {
    dispatch(get(usertype, { challenge_id: id }))
      .then((res) => {
        setOwned(true);
        console.log("then");
      })
      .catch((err) => {
        setOwned(false);
        console.log("catch");
      });
  }, [dispatch, setOwned, usertype, id]);

  // Fetch all
  useEffect(() => {
    dispatch(all(usertype));
  }, [dispatch, usertype]);

  useEffect(() => {
    const data = challenges.data;
    // console.log(data)
    data &&
      setCurrentChallenge(
        [...data].filter((item) => item.id === parseInt(id))[0]
      );
  }, [challenges?.data, id]);

  useEffect(() => {
    console.log(currentChallenge);
  }, [currentChallenge]);

  const handleClickToSubscribe = (props) => {
    setButtonContent(true);
  };

  const handleCloseBackdrop = (e) => {
    // setButtonContent(false);
    console.log("try close backdrop");
  };
  return (
    <>
      {owned && data && (
        <SubHeader>
          <TabFlat to={`/meus-desafios/${type}/${id}/inicio`} color={"white"}>
            Início
          </TabFlat>
          <TabFlat to={`/meus-desafios/${type}/${id}/projeto`} color={"white"}>
            Projeto
          </TabFlat>
          <TabFlat to={`/meus-desafios/${type}/${id}/trilha`} color={"white"}>
            Trilha
          </TabFlat>
          <TabFlat to={`/meus-desafios/${type}/${id}/forum`} color={"white"}>
            Fórum
          </TabFlat>
        </SubHeader>
      )}
      {owned && data && (page === "inicio" || !page) && (
        <section
          className={`${styles.challenge} ${
            buttonContent && styles.hasbackdrop
          }`}
          onClick={() => handleCloseBackdrop()}
        >
          <MainImage data={data.challenge} />
          <Presentation
            handleClickToSubscribe={handleClickToSubscribe}
            data={data.challenge}
            buttonContent={buttonContent}
            isModal={props.isModal}
          />
          <Downloads
            data={data.challenge.materials || ""}
            isModal={props.isModal}
          />
          {!props.isModal && (
            <Infos data={data.challenge} isModal={props.isModal} />
          )}
          {!props.isModal && (
            <div className={styles.section}>
              <Title size={24}>Equipe</Title>
              <div className={styles.container}>
                <ProfileCard keeper></ProfileCard>
                <ProfileCard></ProfileCard>
                <ProfileCard></ProfileCard>
              </div>
            </div>
          )}
          {data?.mentors && !!(data.mentors.length > 0) && (
            <div
              className={
                props.isModal ? styles.section : styles.section__border
              }
              style={{ textAlign: props.isModal ? "left" : "auto" }}
            >
              <Title size={24}>Mentores</Title>
              <div className={styles.container}>
                {data?.mentors?.map((item, index) => (
                  <ProfileCard data={item} key={item.id} small />
                ))}
              </div>
            </div>
          )}
          {data?.judges && !!(data.judges.length > 0) && (
            <div
              className={
                props.isModal ? styles.section : styles.section__border
              }
              style={{ textAlign: props.isModal ? "left" : "auto" }}
            >
              <Title size={24}>Jurados</Title>
              <div className={styles.container}>
                {data?.judges?.map((item, index) => (
                  <ProfileCard data={item} key={item.id} small />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
      {!owned && currentChallenge && (
        <section
          className={`${styles.challenge} ${
            buttonContent && styles.hasbackdrop
          }`}
          onClick={() => handleCloseBackdrop()}
        >
          <MainImage data={currentChallenge} />
          <Presentation
            handleClickToSubscribe={handleClickToSubscribe}
            data={currentChallenge}
            buttonContent={buttonContent}
            isModal={props.isModal}
          />
          {/* data.challenge.materials */}
          {/* <Downloads data={data.challenge.materials || ''} isModal={props.isModal} /> */}
          {!props.isModal && (
            <Infos data={currentChallenge} isModal={props.isModal} />
          )}
          {!props.isModal && (
            <div className={styles.section}>
              <Title size={24}>Equipe</Title>
              <div className={styles.container}>
                <ProfileCard keeper></ProfileCard>
                <ProfileCard></ProfileCard>
                <ProfileCard></ProfileCard>
              </div>
            </div>
          )}
          {currentChallenge?.mentors &&
            !!(currentChallenge.mentors.length > 0) && (
              <div
                className={
                  props.isModal ? styles.section : styles.section__border
                }
                style={{ textAlign: props.isModal ? "left" : "auto" }}
              >
                <Title size={24}>Mentores</Title>
                <div className={styles.container}>
                  {currentChallenge?.mentors?.map((item, index) => (
                    <ProfileCard data={item} key={item.id} small />
                  ))}
                </div>
              </div>
            )}
          {currentChallenge?.judges && !!(currentChallenge.judges.length > 0) && (
            <div
              className={
                props.isModal ? styles.section : styles.section__border
              }
              style={{ textAlign: props.isModal ? "left" : "auto" }}
            >
              <Title size={24}>Jurados</Title>
              <div className={styles.container}>
                {currentChallenge?.judges?.map((item, index) => (
                  <ProfileCard data={item} key={item.id} small />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
      {page === "projeto" && <Project data={data} />}
      {loading && <Loading />}
    </>
  );
};

export { Challenge };
