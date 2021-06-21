import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Chip } from "components/Chip";

import { WindowSize } from "utils/etc";

import styles from "./styles.module.sass";
import "swiper/swiper.scss";

// TODO
// slide performance
// slide buttons

const Badges = () => {
  const { width } = WindowSize();
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
          <Swiper
            observer={width}
            spaceBetween={24}
            slidesPerView={(width > 1366 && 5) || (width > 762 && 3) || 1}
          >
            {data?.badges.map((item, index) => (
              <SwiperSlide>
                <Chip
                  insignia
                  title={item?.title}
                  desc={item?.description}
                  maxValue={item?.points}
                  currentValue={item?.pivot?.points}
                  valueText={`${item?.pivot?.points}/${item?.points}`}
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
