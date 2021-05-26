import React from "react";
import { Helmet } from "react-helmet";

import { Wrapper, Card } from "../components/Layout";
import Background from "../components/Background";
import Email from "../components/Email";
import Social from "../components/Social";
import Signup from "../components/Signup";

import content from "utils/content/login.json";
import bgCompany from "assets/auth/left-business.png";
import bgTalent from "assets/auth/left.png";

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Mundo Jix - Login {type === "empresa" ? "empresa" : "talento"}
        </title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      {action !== "signup" ? (
        <>
          <Background
            position={`${action !== "signup" ? "left" : "right"}`}
            backgroundImage={
              (action === "login" && type === "empresa") ||
              (action === "email" && type === "empresa")
                ? bgCompany
                : bgTalent
            }
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
