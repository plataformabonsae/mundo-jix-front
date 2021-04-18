import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card } from "components/Card";
import Button from "components/Button";
import { Title, Text } from "components/Text";
import { Filter } from "components/Filter";

import styles from "./styles.module.sass";
import * as colors from "utils/styles/Colors";
import "swiper/swiper.scss";

// TODO

const RecommendedChallenges = () => {
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
                  <Card key={item.id} border noShadow>
                    <Text
                      color={colors.MEDIUM_GRAY}
                      size={12}
                      weight="bold"
                      style={{
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.challenge_type === "in_company"
                        ? "In Company"
                        : item.challenge_type}
                    </Text>
                    <Title size={18} style={{ margin: "12px 0" }}>
                      {item.name}
                    </Title>
                    <Text>{item.description}</Text>
                    <hr style={{ opacity: 0.5, margin: "12px 0" }} />
                    <Text
                      color={colors.LIGHT_BLACK}
                      size={16}
                      style={{ margin: "12px 0 6px" }}
                    >
                      Pontos
                    </Text>
                    <Text size={14}>
                      {item.badge_points ? item.badge_points : "Sem pontos"}
                    </Text>
                    <Text
                      color={colors.LIGHT_BLACK}
                      size={16}
                      style={{ margin: "12px 0 6px" }}
                    >
                      Skill desenvolvida
                    </Text>
                    <Text size={14}>
                      {item.grade ? item.grade : "Sem skill"}
                    </Text>
                    <Text
                      color={colors.LIGHT_BLACK}
                      size={16}
                      style={{ margin: "12px 0 6px" }}
                    >
                      Insígnias
                    </Text>
                    <Text size={14}>
                      {item.grade ? item.grade : "Sem insígnia"}
                    </Text>
                    <hr style={{ opacity: 0.5, margin: "12px 0" }} />
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        style={{ color: colors.BLUE_1, fontSize: 14 }}
                        arrow
                        transparent
                      >
                        Ver desafio
                      </Button>
                    </div>
                  </Card>
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
