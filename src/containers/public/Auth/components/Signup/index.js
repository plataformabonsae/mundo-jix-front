import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { PasswordChecker } from "components/PasswordChecker";
import { Input, InputGroup } from "components/Inputs";
import Button from "components/Button";
import Copyright from "components/Copyright";
import { Logo } from "components/Logo";

import { newuser, logout } from "services/auth";
import history from "utils/history";

import { Creators as UserActions } from "store/ducks/User";

// import Typography from 'utils/styles/Typography.module.sass'

import styles from "./styles.module.sass";

const Email = ({ title, desc, type }) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [allValid, setAllValid] = useState();
  const [emailError, setEmailError] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { register, errors, handleSubmit } = useForm();

  const dispatch = useDispatch();
  // const { data: user } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(UserActions.logoutSuccess());
  }, [dispatch]);

  const onSubmit = async (data) => {
    await dispatch(newuser(type, data))
      .then(() => history.push(`/join/${type}/terms`))
      .catch((error) => setEmailError(error.response.data.errors.email[0]));
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.login}>
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
            onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
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
            type="email"
            name="email"
            errors={errors}
            validate={emailError && "Este e-mail já está em uso"}
            errorMessage={errors?.email?.message}
            placeholder="Digite seu e-mail"
            onChange={(e) => {
              setEmailError(false);
              setEmail(e.target.value);
            }}
          >
            e-mail
          </Input>
        </InputGroup>

        <InputGroup style={{ position: "relative" }}>
          <div style={{ position: "relative", flex: "50% 1" }}>
            <Input
              disabled={loading}
              ref={register({
                required: {
                  value: true,
                  message: "Digite a senha",
                },
                minLength: {
                  value: 8,
                  message: "A senha precisa ter pelo menos 8 caracteres.",
                },
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                  message:
                    "A senha precisa conter 1 caractere especial, 1 letra miníscula, 1 letra maiúscula e um número.",
                },
              })}
              type="password"
              name="password"
              errors={errors}
              errorMessage={errors?.password?.message}
              placeholder="Digite a senha"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            >
              Senha
            </Input>
            {showTooltip && (
              <PasswordChecker
                password={password}
                confirmPassword={confirmPassword}
                setValid={setAllValid}
                isValid={allValid}
              />
            )}
          </div>
          <Input
            disabled={loading}
            ref={register({
              required: {
                value: true,
                message: "Repita a senha",
              },
              validate: (e) => confirmPassword === password,
            })}
            type="password"
            name="confirm_password"
            errors={errors}
            errorMessage={
              errors?.confirm_password?.message ||
              "As senhas precisam ser iguais."
            }
            onFocus={() => setShowTooltip(true)}
            placeholder="Digite a senha novamente"
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
            Confirme a senha
          </Input>
        </InputGroup>
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

        <Button
          disabled={
            loading ||
            errors?.email ||
            !allValid ||
            !name.length ||
            !lastName.length
            // !email.length
          }
          Tag={`button`}
          submit
          type="primary"
        >
          Continuar
        </Button>
        {console.log(errors)}

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
