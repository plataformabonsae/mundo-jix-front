import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Chip } from "components/Chip";
import { Filter } from "components/Filter";

import styles from "./styles.module.sass";

// TODO

const MyChallenges = () => {
  const { data } = useSelector((state) => state.dashboard);
  return (
    <Card border gray style={{ gridArea: "insignia", marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          Meus desafios
        </Title>
        {data?.my_challenges && data?.my_challenges.lenght > 0 && (
          <div className={styles.filters}>
            <Filter active>Todos</Filter>
            <Filter>Autodesafio</Filter>
            <Filter>In company</Filter>
            <Filter>Ultradesafio</Filter>
          </div>
        )}
      </header>

      <article className={styles.slider}>
        {data?.my_challenges && data?.my_challenges.lenght > 0 ? (
          <Swiper spaceBetween={24} slidesPerView={3}>
            {data?.my_challenges.map((item, index) => {
              <SwiperSlide>
                <Chip
                  meusDesafios
                  title={`Nome do desafio`}
                  desc={"Autodesafio"}
                  maxValue={100}
                  currentValue={100}
                />
              </SwiperSlide>;
            })}
          </Swiper>
        ) : (
          <Text>Se inscreva em um desafio para ver seu progresso</Text>
        )}
      </article>
    </Card>
  );
};

export { MyChallenges };
