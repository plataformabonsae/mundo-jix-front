import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from "react-router-dom";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Filter } from "components/Filter";
import { ChallengeCard } from "components/ChallengeCard";

import styles from "./styles.module.sass";
import "swiper/swiper.scss";

import { WindowSize } from "utils/etc";

// TODO

const DesafiosCadastrados = () => {
  const { width } = WindowSize();
  const location = useLocation();
  const { data } = useSelector((state) => state.dashboard);
  const [challengeType, setChallengeType] = useState();
  const [activeTab, setActiveTab] = useState("todos");

  useEffect(() => {
    data?.challenges && setChallengeType(data.challenges);
  }, [data?.challenges]);

  useEffect(() => {
    console.log(width);
  }, [width]);

  const handleFilter = (filterTo) => {
    const challenges = data?.challenges;
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
          Desafios cadastrados
        </Title>
        {data?.challenges && (
          <div className="filters">
            <Filter
              active={activeTab === "todos"}
              onClick={() => handleFilter("todos")}
            >
              Todos
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
      </header>

      {challengeType?.length ? (
        <article className={styles.slider}>
          <Swiper
            observer={challengeType}
            spaceBetween={24}
            slidesPerView={width > 762 ? 2 : 1}
          >
            {challengeType.map((item, index) => {
              return (
                <SwiperSlide key={item.id}>
                  <ChallengeCard
                    // canSubscribe
                    // noButton
                    company
                    status={item.payed_for}
                    item={item}
                    key={item.id}
                    to={`/meus-desafios/${item.challenge_type}/${item.id}`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </article>
      ) : (
        <Text style={{ padding: "12px 0" }}>
          Sem novo desafios por enquanto
        </Text>
      )}
    </Card>
  );
};

export { DesafiosCadastrados };
