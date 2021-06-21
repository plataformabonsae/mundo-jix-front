import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { SpaceBackground } from "components/SpaceBackground";
import { Card } from "components/Card";
import { Dialog } from "components/Dialog";
import { Loading } from "components/Loading";
import { Logo } from "components/Logo";
import { Input } from "components/Inputs";
import { Text } from "components/Text";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";
import Copyright from "components/Copyright";

import styles from "./styles.module.sass";

import { login, logout } from "services/login";

const Judges = (props) => {
  const { error, loading } = useSelector((state) => state.token);
  const { type, id = 1 } = props;
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [notMentor, setNotMentor] = useState(false);

  // const onSubmit = (data) => alert(JSON.stringify(data));

  const handleIsNotMentor = () => {
    setNotMentor((prev) => !prev);
    dispatch(logout());
  };

  const onSubmit = async (data) => {
    const req = dispatch(login(type, data));
    await req
      .then((res) => {
        if (!(res.data.data.user.is_judge || res.data.data.user.is_mentor)) {
          handleIsNotMentor();
        } else {
          history.push(`/meus-desafios`);
        }
      })
      .catch((error) => console.log(error, "caiu no catch"));
  };

  return (
    <SpaceBackground>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Mundo Jix - Login {type === "mentor" ? "Mentor" : "Jurado"}
        </title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <section className={styles.wrapper}>
        <Logo
          color="white"
          title={`Boas vindas pessoa  ${
            type === "mentor" ? "mentora!" : "jurada!"
          } `}
          desc={"Preencha com seus dados os campos abaixo."}
        />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {loading && <Loading />}
          <Card className={styles.card}>
            <Input
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              name={"email"}
              type={"text"}
              errors={errors}
              validate={
                error?.data?.error === "E-mail não encontrado no sistema" &&
                "E-mail não encontrado no sistema"
              }
              placeholder="Digite o seu e-mail"
              errorMessage={"Digite um e-mail válido para continuar"}
            >
              E-mail
            </Input>
            <Input
              ref={register({ required: true })}
              validate={
                error?.data?.message === "Unauthorised." &&
                "Verifique sua senha e tente novamente"
              }
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
      {notMentor && (
        <Dialog
          handleClose={() => setNotMentor((prev) => !prev)}
          title={`Esse e-mail pertence a uma conta de talento.`}
        >
          <Text>
            Por favor, efetue digite as credenciais de
            {type === "mentor" ? " mentor" : " jurado"}.
          </Text>
          <ButtonGroup style={{ justifyContent: "center" }}>
            <Button
              // style={{ minWidth: 120 }}
              Tag={"span"}
              type={"green"}
              onClick={() => setNotMentor((prev) => !prev)}
            >
              Voltar
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </SpaceBackground>
  );
};

export { Judges };
