import React from "react";
// import { useHistory } from "react-router-dom";

import { Logo } from "components/Logo";
import Copyright from "components/Copyright";

import Background from "../components/Background";
import { Layout } from "components/Layout";
import { Recover } from "../components/Recover";

const Type = ({ action, type }) => {
  // let history = useHistory()

  return (
    <Background>
      <Layout center>
        <Logo
          color="white"
          title={`${action === "recover" ? "Recuperar senha" : ""}`}
          desc={`${
            action === "recover"
              ? "Digite seu e-mail e enviaremos uma senha provisória."
              : ""
          }`}
        />

        <Recover action={action} type={type} />

        <Copyright color="white" />
      </Layout>
    </Background>
  );
};

export default Type;
