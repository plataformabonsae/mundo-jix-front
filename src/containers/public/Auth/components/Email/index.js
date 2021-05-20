import React from "react";
import {
  Link,
  // useLocation,
  useHistory,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { InputGroup, Input, Checkbox } from "components/Inputs";
import Button from "components/Button";
import Copyright from "components/Copyright";
import { Logo } from "components/Logo";

import {
  login,
  // logout
} from "services/login";

// import history from "utils/history";

// import Typography from 'utils/styles/Typography.module.sass'

import styles from "./styles.module.sass";

const Email = ({ title, desc, type }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const { error, loading } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const req = dispatch(login(type, data));
    await req
      .then((res) => history.push("/dashboard"))
      .catch((err) => console.log(err, "erro"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.login}>
      <Button
        style={{ position: "absolute", top: 24, left: 12 }}
        type="transparent"
        to={`/auth/${type}/login`}
      >
        Voltar
      </Button>

      <div className={styles.content}>
        <Logo title={title} desc={desc} />

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
            type="password"
            ref={register({ required: true })}
            name="password"
            errors={errors}
            errorMessage="Digite uma senha"
            placeholder="Digite sua senha"
          >
            senha
          </Input>
        </InputGroup>

        {error ? (
          <div className={styles.error}>Usuário ou senha incorretos</div>
        ) : null}

        <div className={styles.sub}>
          <Checkbox type="checkbox" placeholder="Digite sua senha">
            Lembrar-me
          </Checkbox>
          <span className={styles.subSpan}>
            Esqueceu sua senha?
            <Link to={`/auth/${type}/recuperar`}>Clique aqui</Link>
          </span>
        </div>

        <Button disabled={loading} type="primary" Tag={`button`}>
          Entrar
        </Button>

        <div className={styles.subSpan} style={{ marginTop: 32 }}>
          Não possui uma conta?
          <Link to={`/auth/${type}/signup`}>Cadastre-se</Link>
        </div>
      </div>

      <Copyright />
    </form>
  );
};

export default Email;
