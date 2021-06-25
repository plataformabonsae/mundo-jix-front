import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Title } from "components/Text";
import { SubHeader } from "components/Header";
import { TabFlat } from "components/Tabs";
import { ChallengeCard } from "components/ChallengeCard";
import { Loading } from "components/Loading";

import styles from "./styles.module.sass";
import { my } from "services/challenges";

const MyChallenges = (props) => {
  const dispatch = useDispatch();
  // const location = useLocation();
  const { type } = useParams();
  const [autodesafio, setAutodesafio] = useState([]);
  const [inCompany, setInCompany] = useState([]);
  const [ultradesafio, setUltradesafio] = useState([]);
  const { data, loading } = useSelector((state) => state.myChallenges);
  const { data: usertype } = useSelector((state) => state.usertype);

  useEffect(() => {
    dispatch(my(usertype));
  }, [dispatch, usertype]);

  useEffect(() => {
    if (data) {
      const autodesafio = [...data].filter(
        (item) => item.challenge_type === "autodesafio"
      );
      const in_company = [...data].filter(
        (item) => item.challenge_type === "in_company"
      );
      const ultradesafio = [...data].filter(
        (item) => item.challenge_type === "ultradesafio"
      );
      setAutodesafio((prev) => autodesafio);
      setInCompany((prev) => in_company);
      setUltradesafio((prev) => ultradesafio);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mundo Jix - Meus desafios</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <SubHeader>
        {usertype !== "empresa" && (
          <TabFlat to={`/meus-desafios/autodesafio`} color={"white"}>
            Autodesafio
          </TabFlat>
        )}
        <TabFlat to={`/meus-desafios/in_company`} color={"white"}>
          In company
        </TabFlat>
        <TabFlat to={`/meus-desafios/ultradesafio`} color={"white"}>
          Ultradesafio
        </TabFlat>
      </SubHeader>
      <section className={styles.container}>
        <Title className={styles.title}>Meus Desafios</Title>
        <section className={styles.content}>
          {loading && !data && <Loading />}
          {type === "autodesafio" &&
            !!autodesafio.length &&
            autodesafio?.map((item, index) => (
              <ChallengeCard
                // canSubscribe
                // noButton
                item={item}
                key={item.id}
                to={`/meus-desafios/${item.challenge_type}/${item.id}`}
              />
            ))}
          {type === "autodesafio" && !autodesafio?.length && !loading && (
            <>Sem Autodesafios cadastrados.</>
          )}

          {type === "in_company" &&
            !!inCompany.length &&
            inCompany?.map((item, index) => (
              <ChallengeCard
                // canSubscribe
                // noButton
                item={item}
                key={item.id}
                to={`/meus-desafios/${item.challenge_type}/${item.id}`}
              />
            ))}
          {type === "in_company" && !inCompany.length && !loading && (
            <>Sem desafios In Company cadastrados</>
          )}

          {type === "ultradesafio" &&
            !!ultradesafio.length &&
            ultradesafio?.map((item, index) => (
              <ChallengeCard
                // canSubscribe
                // noButton
                item={item}
                key={item.id}
                to={`/meus-desafios/${item.challenge_type}/${item.id}`}
              />
            ))}
          {type === "ultradesafio" && !ultradesafio.length && !loading && (
            <>Sem Ultradesafios cadastrados</>
          )}
        </section>
      </section>
    </>
  );
};

export { MyChallenges };
