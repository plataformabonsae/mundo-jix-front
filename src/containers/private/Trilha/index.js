import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs";
import { Banner } from "components/Banner";
import { Loading } from "components/Loading";

import { Header } from "./components/Header";
import { TrilhaItem } from "components/TrilhaItem";

import styles from "./styles.module.sass";

import { normal, premium } from "services/trail";

const Trilha = (props) => {
  const dispatch = useDispatch();
  const { data: trail, loading } = useSelector((state) => state.trail);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data } = useSelector((state) => state.challenge);
  const { type, id, trail_type, trail_id } = useParams();
  // const [activeTab, setActiveTab] = useState("normal");

  useEffect(() => {
    trail_type === "normal" && dispatch(normal(usertype, { challenge_id: id }));
    trail_type === "premium" &&
      dispatch(premium(usertype, { challenge_id: id }));
  }, [dispatch, usertype, id, trail_type]);

  return (
    <section className={styles.trilha}>
      <Header data={data.challenge} />
      <header className={styles.header}>
        <div className={styles.header__links}>
          <TabFlat to={`/meus-desafios/${type}/${id}/trilha/normal`}>
            Normal
          </TabFlat>
          <TabFlat to={`/meus-desafios/${type}/${id}/trilha/premium`}>
            Premium
          </TabFlat>
        </div>
        <section className={styles.trilha__list}>
          {loading ? (
            <Loading />
          ) : (
            <>
              {trail_type === "premium" && (
                <Banner
                  full
                  title={"Maecenas dolor suspendisse mi bibendum."}
                  button={"Comprar"}
                />
              )}
              {trail?.map((item, index) => (
                <TrilhaItem
                  to={`/meus-desafios/${type}/${id}/trilha/${trail_type}/${item.id}`}
                  // locked={data.?user}
                  item={item}
                  trailType={item.type}
                  key={item.id}
                  video={item.video}
                  file={item.material}
                  question={item.question}
                />
              ))}
            </>
          )}
        </section>
        {/* {trail_type === "premium" && (
          <section className={styles.trilha__list}>
            <Banner
              full
              title={"Maecenas dolor suspendisse mi bibendum."}
              button={"Comprar"}
            />
            <TrilhaItem index={1}  video />
            <TrilhaItem index={2} locked file />
            <TrilhaItem index={3} locked question />
          </section>
        )} */}
      </header>
    </section>
  );
};

export { Trilha };
