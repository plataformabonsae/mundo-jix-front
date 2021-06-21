import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
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
    <section className={styles.container}>
      <BadgeSection title={"Minhas insígnias"} data={data} />
      {/* <BadgeSection title={"Autodesafio"} />
      <BadgeSection title={"In Company"} />
      <BadgeSection title={"Ultradesafio"} /> */}
    </section>
  );
};

const BadgeSection = (props) => {
  const { data } = props;
  return (
    <Card border gray style={{ marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          {props.title}
        </Title>
      </header>

      <article className={styles.slider}>
        {data?.badges && data?.badges.length > 0 ? (
          data?.badges.map((item, index) => (
            <>
              <Chip
                insignia
                title={item?.title}
                desc={item?.description}
                maxValue={item?.points}
                currentValue={item?.pivot?.points}
                valueText={`${item?.pivot?.points}/${item?.points}`}
              />
            </>
          ))
        ) : (
          <Text>Sem insígnias cadastradas</Text>
        )}
      </article>
    </Card>
  );
};

export { Badges };
