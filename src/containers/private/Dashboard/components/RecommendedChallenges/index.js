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

// TODO

const RecommendedChallenges = () => {
  const location = useLocation();
  const { data } = useSelector((state) => state.dashboard);
  const [challengeType, setChallengeType] = useState();
  const [activeTab, setActiveTab] = useState("todos");

  useEffect(() => {
    data?.challenges && setChallengeType(data.challenges);
  }, [data?.challenges]);

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
          Desafios recomendados
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
      </header>

      {challengeType?.length ? (
        <article className={styles.slider}>
          <Swiper observer={challengeType} spaceBetween={24} slidesPerView={2}>
            {challengeType.map((item, index) => {
              return (
                <SwiperSlide key={item.id}>
                  <ChallengeCard
                    item={item}
                    to={`${location.pathname}/modal/desafio/${item.id}`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </article>
      ) : (
        <Text style={{ padding: "12px 0" }}>Sem desafios por enquanto</Text>
      )}
    </Card>
  );
};

export { RecommendedChallenges };
