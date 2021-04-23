import React from "react";
// import Slider from "@farbenmeer/react-spring-slider"

import { Card } from "components/Card";
import Button from "components/Button";
import { Title, Text } from "components/Text";
import { Filter } from "components/Filter";

import star from "assets/components/Card/star.svg";
import check from "assets/components/Card/check.svg";

import styles from "./styles.module.sass";
import * as colors from "utils/styles/Colors";

// TODO

const DesafiosCadastrados = () => {
  return (
    <Card border gray style={{ gridArea: "insignia", marginBottom: 24 }}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "12px 0" }}>
          Desafios cadastrados
        </Title>
        <div className="filters">
          <Filter active>Todos</Filter>
          <Filter>In company</Filter>
          <Filter>Ultradesafio</Filter>
        </div>
      </header>

      <article className={styles.slider}>
        {/* <Slider
                    slidesAtOnce={2}> */}
        {/* <Card border noShadow className={styles.card}>
          <Text
            color={"white"}
            className={styles.card__header}
            size={12}
            weight="bold"
            style={{
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            In company
          </Text>
          <Title size={18} style={{ margin: "24px 0" }}>
            Nome do desafio
          </Title>
          <Text>
            Etiam et sapien a massa lacinia ultricies. Morbi posuere ultricies
            vulputate. Nulla pellentesque laoreet nunc, dictum...
          </Text>
          <hr style={{ opacity: 0.5, margin: "24px 0" }} />
          <Text size={14} color={colors.LIGHT_BLACK}>
            <img src={star} alt={"348 participantes "} />
            <b>348</b> participantes
          </Text>
          <Text size={14} color={colors.LIGHT_BLACK}>
            <img src={check} alt={"15 projetos entregues "} />
            <b>15</b> projetos entregues
          </Text>
          <hr style={{ opacity: 0.5, margin: "24px 0" }} />
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
        </Card> */}
        Sem desafios cadastrados
        {/* </Slider> */}
      </article>
    </Card>
  );
};

export { DesafiosCadastrados };
