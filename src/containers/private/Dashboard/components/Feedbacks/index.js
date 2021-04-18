import React from "react";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Dot } from "components/Dot";
import Button from "components/Button";
import { Search } from "components/Inputs";

import * as colors from "utils/styles/Colors";

import styles from "./styles.module.sass";

const Feedbacks = () => {
  return (
    <section className={styles.feedbacks}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "24px 0" }}>
          Feedbacks
        </Title>
        <Search />
      </header>

      <div style={{ overflow: "auto", height: "100%", position: "absolute" }}>
        {false ? (
          <>
            <Card noShadow>
              <header className={styles.header}>
                <Title size={16}>
                  <Dot color={colors.ERROR} /> Mentor tal
                </Title>
                <Text size={14} color={colors.MEDIUM_GRAY}>
                  03 / Dez
                </Text>
              </header>
              <Text size={14} color={colors.MEDIUM_GRAY}>
                Nome da empresa >> Nome do desafio{" "}
              </Text>
              <Text size={14} style={{ marginTop: 12 }}>
                Etiam et sapien a massa lacinia ultricies. Morbi posuere
                ultricies vulputate. Nulla pellentesque laoreet nunc, dictum...
              </Text>
              <Button
                style={{
                  color: colors.DARK_GRAY,
                  paddingLeft: 0,
                  fontSize: 14,
                }}
                transparent
              >
                Ler mais
              </Button>
            </Card>
          </>
        ) : (
          <Text>Sem feedbacks cadastradas</Text>
        )}
      </div>
    </section>
  );
};

export { Feedbacks };
