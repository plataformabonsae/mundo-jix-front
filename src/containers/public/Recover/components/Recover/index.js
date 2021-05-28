import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.sass";

import {
  request,
  // logout
} from "services/recover";

import { Card } from "components/Card";
import { Input } from "components/Inputs";
import { ButtonGroup } from "components/ButtonGroup";
import Button from "components/Button";

const Recover = ({ type }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const { error } = useSelector((state) => state.recover);
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const req = dispatch(request(type, data));
    await req
      .then((res) => {
        setSuccess(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export { Recover };
