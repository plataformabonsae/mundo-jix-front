import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import {
  request,
  // logout
} from "services/recover";

import styles from "./styles.module.sass";

import { Card } from "components/Card";
import { Input } from "components/Inputs";
import { ButtonGroup } from "components/ButtonGroup";
import { SpaceBackground } from "components/SpaceBackground";
import Copyright from "components/Copyright";
import { Logo } from "components/Logo";
import Button from "components/Button";

const Recover = ({ type, action }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [success, setSuccess] = useState(false);
  const { error, loading } = useSelector((state) => state.recover);
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const req = dispatch(request(type, data));
    await req
      .then((res) => {
        // setSuccess(true);
        // history.push(location.pah)
        toast.success("Código enviado para o e-mail", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
        toast.error(error.response.data.error, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <SpaceBackground>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mundo Jix - Recuperar senha</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <section className={styles.wrapper}>
        <Logo
          color="white"
          title={`Recuperar senha`}
          desc={`${"Digite seu e-mail e copie o código que enviamos."}`}
        />

        <form
          noValidate
          style={{ padding: "0 15px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card className={styles.card}>
            <Input
              disabled={loading}
              ref={register({
                required: {
                  value: true,
                  message: "Digite o seu e-mail",
                },
                pattern: {
                  value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                  message: "Digite um e-mail válido",
                },
              })}
              name={"email"}
              type={"text"}
              errors={errors}
              placeholder="Digite o seu e-mail"
              errorMessage={errors?.email?.message}
            >
              E-mail
            </Input>
          </Card>

          <ButtonGroup>
            <Button to={`/auth/${type}/email`} type={"outlineWhite"}>
              Voltar a login
            </Button>
            <Button Tag="button" submit type="secondary">
              Enviar
            </Button>
          </ButtonGroup>
        </form>

        <Copyright color="white" />
      </section>
    </SpaceBackground>
  );
};

export { Recover };
