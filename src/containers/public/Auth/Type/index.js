import React from "react";

import { Wrapper, Card } from "../components/Layout";
import Background from "../components/Background";
import Email from "../components/Email";
import Social from "../components/Social";
import Signup from "../components/Signup";

import content from "utils/content/login.json";

const Type = ({ action, type }) => {
  const authAction = (request) => {
    if (request === "email") {
      return (
        <Email
          type={type}
          title={`Boas vindas ${content?.[type].name}!`}
          desc="Preencha com seus dados os campos abaixo."
        />
      );
    }
    if (action === "login") {
      return <Social type={type} title={`Entrar na sua conta`} />;
    }
    if (action === "signup") {
      return (
        <Signup
          type={type}
          title={`Criar uma conta`}
          desc={`Boas vindas ${content?.[type].name}!`}
        />
      );
    }
  };

  return (
    <Wrapper background={`${action !== "signup" ? "left" : "right"}`}>
      {action !== "signup" ? (
        <>
          <Background
            position={`${action !== "signup" ? "left" : "right"}`}
            title={`${content?.[type].name}`}
            text={`${content?.[type].desc}`}
          />
          <Card>{authAction(action)}</Card>
        </>
      ) : (
        <>
          <Card>{authAction(action)}</Card>
          <Background
            position={`${action !== "signup" ? "left" : "right"}`}
            title={`${content?.[type].name}`}
            text={`${content?.[type].desc}`}
          />
        </>
      )}
    </Wrapper>
  );
};

export default Type;
