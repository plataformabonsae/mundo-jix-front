import React, { useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { dashboardFetch } from "services/dashboard";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Chip } from "components/Chip";
import { Loading } from "components/Loading";

import styles from "./styles.module.sass";
import "swiper/swiper.scss";

// TODO
// slide performance
// slide buttons

const Badges = () => {
  const dispatch = useDispatch();

  const { data: usertype } = useSelector((state) => state.usertype);
  const { data, loading } = useSelector((state) => state.dashboard);
  //empty dependency array so it only runs once at render

  useEffect(() => {
    dispatch(dashboardFetch(usertype));
  }, [dispatch, usertype]);

  return (
    <section className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <BadgeSection title={"Minhas insígnias"} data={data} />
      )}
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
            <Chip
              key={index}
              insignia
              title={item?.title}
              desc={item?.description}
              maxValue={item?.points}
              currentValue={item?.pivot?.points}
              valueText={`${item?.pivot?.points}/${item?.points}`}
            />
          ))
        ) : (
          <Text>Sem insígnias cadastradas</Text>
        )}
      </article>
    </Card>
  );
};

export { Badges };
