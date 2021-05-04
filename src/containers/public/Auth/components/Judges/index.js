import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { SpaceBackground } from "components/SpaceBackground";
import { Card } from "components/Card";
import { Logo } from "components/Logo";
import { Input } from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";
import Copyright from "components/Copyright";

import styles from "./styles.module.sass";

import { login } from "services/login";

const Judges = (props) => {
  const { type, id = 1 } = props;
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  // const onSubmit = (data) => alert(JSON.stringify(data));

  const onSubmit = async (data) => {
    const req = dispatch(login(type, data));
    await req
      .then((res) => history.push(`/${type}/desafio/${id}`))
      .catch((error) => console.log(error, "caiu no catch"));
  };

  return (
    <SpaceBackground>
      <section className={styles.wrapper}>
        <Logo
          color="white"
          title={`Boas vindas pessoa  ${
            type === "mentor" ? "mentora!" : "jurada!"
          } `}
          desc={"Preencha com seus dados os campos abaixo."}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className={styles.card}>
            <Input
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              name={"email"}
              type={"text"}
              errors={errors}
              placeholder="Digite o seu e-mail"
              errorMessage={"Digite um e-mail válido para continuar"}
            >
              E-mail
            </Input>
            <Input
              ref={register({ required: true })}
              name={"password"}
              type={"password"}
              errors={errors}
              placeholder="Digite sua senha"
              errorMessage={"Digite uma senha válida para continuar"}
            >
              Senha
            </Input>
          </Card>

          <ButtonGroup>
            <Button
              style={{ width: "100%" }}
              Tag="button"
              submit
              type="secondary"
            >
              Entrar
            </Button>
          </ButtonGroup>
        </form>

        <Copyright color="white" />
      </section>
    </SpaceBackground>
  );
};

export { Judges };
