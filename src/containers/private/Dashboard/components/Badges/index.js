import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Chip } from "components/Chip";

import styles from "./styles.module.sass";
import "swiper/swiper.scss";

// TODO
// slide performance
// slide buttons

const Badges = () => {
  const { data } = useSelector((state) => state.dashboard);
  //empty dependency array so it only runs once at render

  return (
    <Card border gray style={{ gridArea: "insignia", marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          Insígnias
        </Title>
      </header>

      <article className={styles.slider}>
        {data?.badges && data?.badges.length > 0 ? (
          <Swiper spaceBetween={24} slidesPerView={5}>
            {data?.badges.map((item, index) => (
              <SwiperSlide>
                <Chip
                  insignia
                  title={"Top Cadastro"}
                  desc={"Complete seu cadastro."}
                  maxValue={500}
                  currentValue={125}
                  valueText={`${125}/${500}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Text>Sem insígnias cadastradas</Text>
        )}
      </article>
    </Card>
  );
};

export { Badges };
