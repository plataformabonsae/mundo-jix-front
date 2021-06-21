import React from "react";

import { Text, Title } from "components/Text";
import Button from "components/Button";

import logo from "assets/logo/logo_color.png";

import styles from "./styles.module.sass";

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={logo} alt="Mundo Jix" />
        <Title style={{ marginTop: 12 }}>Página não encontrada</Title>
        <Text style={{ margin: "12px 0" }}>
          Não conseguimos encontrar a página que está procurando
        </Text>
        <Button Tag={"a"} type={"primary"} href="/auth/talento/login">
          Voltar
        </Button>
      </div>
    </div>
  );
};

export { NotFound };
