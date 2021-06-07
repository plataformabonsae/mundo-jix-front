import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
import { Title, Text } from "components/Text";
import { Chip } from "components/Chip";
import { Filter } from "components/Filter";

import styles from "./styles.module.sass";

import { WindowSize } from 'utils/etc'

// TODO

const MyChallenges = () => {
  const { width } = WindowSize()
  const { data, loading } = useSelector((state) => state.dashboard);
  const [challengeType, setChallengeType] = useState();
  const [activeTab, setActiveTab] = useState("todos");

  useEffect(() => {
    data?.my_challenges && setChallengeType(data.my_challenges);
  }, [data?.my_challenges]);

  const handleFilter = (filterTo) => {
    const challenges = data?.my_challenges;
    setActiveTab(filterTo);
    if (filterTo !== "todos") {
      setChallengeType(() =>
        challenges.filter((item) => item.challenge_type === filterTo)
      );
    } else {
      setChallengeType(challenges);
    }
  };
  return (
    <Card border gray style={{ gridArea: "insignia", marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          Meus desafios
        </Title>
        {data?.my_challenges && data?.my_challenges.length > 0 && (
          <div className={styles.filters}>
            <Filter
              active={activeTab === "todos"}
              onClick={() => handleFilter("todos")}
            >
              Todos
            </Filter>
            <Filter
              active={activeTab === "autodesafio"}
              onClick={() => handleFilter("autodesafio")}
            >
              Autodesafio
            </Filter>
            <Filter
              active={activeTab === "in_company"}
              onClick={() => handleFilter("in_company")}
            >
              In company
            </Filter>
            <Filter
              active={activeTab === "ultradesafio"}
              onClick={() => handleFilter("ultradesafio")}
            >
              Ultradesafio
            </Filter>
          </div>
        )}
        <Link className={styles.all} to={`/meus-desafios`}>
          Ver todos
        </Link>
      </header>

      <article className={styles.slider}>
        {challengeType && challengeType.length > 0 ? (
          <Swiper observer={challengeType} spaceBetween={24} slidesPerView={width > 762 ? 3 : 1}>
            {challengeType.map((item, index) => (
              <SwiperSlide>
                <Chip
                  key={item.id}
                  item={item}
                  meusDesafios
                  title={`Nome do desafio`}
                  desc={"Autodesafio"}
                  maxValue={100}
                  currentValue={0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Text>Se inscreva em um desafio para ver seu progresso</Text>
          // <Loading />
        )}
        {loading && <Loading />}
      </article>
    </Card>
  );
};

export { MyChallenges };
