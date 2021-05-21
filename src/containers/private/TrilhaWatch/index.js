import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs";
import { SubHeader } from "components/Header";

// import { Header } from "./components/Header";
// import { TrilhaItem } from "./components/TrilhaItem";

import styles from "./styles.module.sass";

const TrilhaWatch = (props) => {
  const [activeTab, setActiveTab] = useState("normal");

  const { type, id, page } = useParams();

  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  const { data, loading } = useSelector((state) => state.challenge);

  return (
    <>
      <SubHeader>
        <TabFlat to={`/meus-desafios/${type}/${id}/inicio`} color={"white"}>
          Início
        </TabFlat>
        <TabFlat to={`/meus-desafios/${type}/${id}/projeto`} color={"white"}>
          Projeto
        </TabFlat>
        <TabFlat to={`/meus-desafios/${type}/${id}/trilha`} color={"white"}>
          Trilha
        </TabFlat>
        <TabFlat to={`/meus-desafios/${type}/${id}/forum`} color={"white"}>
          Fórum
        </TabFlat>
      </SubHeader>
      <section className={styles.trilhawatch}>
        <section className={styles.trilhawatch__player}>
          <div className={styles.trilhawatch__content}></div>
          <div className={styles.trilhawatch__selector}>
            <Title>Nome do desafio</Title>
            <Text size={12}>2/5</Text>
            <div lassName={styles.trilhawatch__preview}>
              <Text>1</Text>
              <div lassName={styles.trilhawatch__preview__image}></div>
              <Title size={14}>Aula 01: Título do vídeo</Title>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export { TrilhaWatch };
