import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Title } from "components/Text";
import { SubHeader } from "components/Header";
import { TabFlat } from "components/Tabs";
import { ChallengeCard } from "components/ChallengeCard";

import styles from "./styles.module.sass";
import { all } from "services/challenges";

const Challenges = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, loading } = useSelector((state) => state.challenges);

  useEffect(() => {
    dispatch(all());
  }, [dispatch]);

  return (
    <>
      <SubHeader>
        <TabFlat to={`/desafios/autodesafio`} color={"white"}>
          Autodesafio
        </TabFlat>
        <TabFlat to={`/desafios/in-company`} color={"white"}>
          In company
        </TabFlat>
        <TabFlat to={`/desafios/ultradesafio`} color={"white"}>
          Ultradesafio
        </TabFlat>
      </SubHeader>
      <section className={styles.container}>
        <Title className={styles.title}>Desafios</Title>
        <section className={styles.content}>
          {loading && !data
            ? "carregando"
            : data?.map((item, index) => (
                <ChallengeCard
                  item={item}
                  key={item.id}
                  to={`${location.pathname}/modal/desafio/${item.id}`}
                />
              ))}
        </section>
      </section>
    </>
  );
};

export { Challenges };
