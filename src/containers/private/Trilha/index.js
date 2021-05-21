import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs";
import { Banner } from "components/Banner";

import { Header } from "./components/Header";
import { TrilhaItem } from "./components/TrilhaItem";

import styles from "./styles.module.sass";

const Trilha = (props) => {
  const [activeTab, setActiveTab] = useState("normal");

  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  const { data, loading } = useSelector((state) => state.challenge);

  return (
    <section className={styles.trilha}>
      <Header data={data.challenge} />
      <header className={styles.header}>
        <div className={styles.header__links}>
          <TabFlat
            active={activeTab === "normal"}
            Tag="span"
            onClick={() => handleTabs("normal")}
          >
            Normal
          </TabFlat>
          <TabFlat
            active={activeTab === "premium"}
            Tag="span"
            onClick={() => handleTabs("premium")}
          >
            Premium
          </TabFlat>
        </div>
        {activeTab === "normal" && (
          <section className={styles.trilha__list}>
            <TrilhaItem index={1} video watched />
            <TrilhaItem index={2} file />
            <TrilhaItem index={3} question />
          </section>
        )}
        {activeTab === "premium" && (
          <section className={styles.trilha__list}>
            <Banner
              full
              title={"Maecenas dolor suspendisse mi bibendum."}
              button={"Comprar"}
            />
            <TrilhaItem index={1} locked video />
            <TrilhaItem index={2} locked file />
            <TrilhaItem index={3} locked question />
          </section>
        )}
      </header>
    </section>
  );
};

export { Trilha };
