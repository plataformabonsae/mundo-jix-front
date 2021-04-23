import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Input, InputGroup } from "components/Inputs";
import Button from "components/Button";
import Copyright from "components/Copyright";
import { Logo } from "components/Logo";

import { newuser } from "services/auth";
import history from "utils/history";

// import Typography from 'utils/styles/Typography.module.sass'

import styles from "./styles.module.sass";

const Email = ({ title, desc, type }) => {
  const { register, errors, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.login);
  const { error, loading } = useSelector((state) => state.token);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(newuser(type, data))
      .catch((error) => console.log(error))
      .then(() => user);
    if (user) {
      history.push(`/join/${type}/terms`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.login}>
      <div className={styles.content}>
        <Logo title={title} desc={desc} />

        <InputGroup>
          <Input
            disabled={loading}
            ref={register({ required: true })}
            type="text"
            name="name"
            errors={errors}
            errorMessage={
              type === "talento"
                ? "Digite seu nome"
                : "Digite o nome da empresa"
            }
            placeholder={
              type === "talento"
                ? "Digite seu nome"
                : "Digite o nome da empresa"
            }
          >
            nome
          </Input>
          {type === "talento" && (
            <Input
              disabled={loading}
              ref={register({ required: true })}
              type="text"
              name="last_name"
              errors={errors}
              errorMessage="Digite o seu sobrenome"
              placeholder="Digite seu sobrenome"
            >
              Sobrenome
            </Input>
          )}
        </InputGroup>

        <InputGroup>
          <Input
            disabled={loading}
            ref={register({ required: true })}
            type="email"
            name="email"
            errors={errors}
            errorMessage="Digite o seu e-mail"
            placeholder="Digite seu e-mail"
          >
            e-mail
          </Input>
        </InputGroup>

        <InputGroup>
          <Input
            disabled={loading}
            ref={register({ required: true })}
            type="password"
            name="password"
            errors={errors}
            errorMessage="Digite uma senha"
            placeholder="Digite uma senha"
          >
            Senha
          </Input>
          <Input
            disabled={loading}
            ref={register({ required: true })}
            type="password"
            name="confirm_password"
            errors={errors}
            errorMessage="Repita a senha"
            placeholder="Repita a senha"
          >
            Confirmar senha
          </Input>
        </InputGroup>

        {error ? (
          <div className={styles.error}>Este e-mail já está cadastrado</div>
        ) : null}
        {type !== "talento" ? (
          <>
            <input
              ref={register()}
              type="hidden"
              name="social_reason"
              value="l"
            />
            <input
              ref={register()}
              type="hidden"
              name="cnpj"
              value="00.000.000/0000-00"
            />
          </>
        ) : (
          <input
            ref={register()}
            type="hidden"
            name="cpf"
            value="000.000.000-00"
          />
        )}
        <input ref={register()} type="hidden" name="is_mentor" value="0" />
        <input ref={register()} type="hidden" name="is_judge" value="0" />

        <Button disabled={loading} Tag={`button`} type="primary">
          Continuar
        </Button>

        <span className={styles.or}>ou</span>

        <div className={styles.buttons}>
          <Button Tag="a" href="/" type="google">
            Cadastrar com Google
          </Button>
          <Button Tag="a" href="/" type="facebook">
            Cadastrar com Facebook
          </Button>
          <Button Tag="a" href="/" type="linkedin">
            Cadastrar com Linkedin
          </Button>
        </div>

        <div className={styles.subSpan} style={{ marginTop: 32 }}>
          Já possui uma conta?
          <Link to={`/auth/${type}/login`}>Entrar</Link>
        </div>
      </div>

      <Copyright />
    </form>
  );
};

export default Email;
