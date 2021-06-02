import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import { request, change } from "services/recover";

import styles from "./styles.module.sass";

import { Card } from "components/Card";
import { PasswordChecker } from "components/PasswordChecker";
import { Input, InputGroup } from "components/Inputs";
import { ButtonGroup } from "components/ButtonGroup";
import { SpaceBackground } from "components/SpaceBackground";
import Copyright from "components/Copyright";
import { Logo } from "components/Logo";
import Button from "components/Button";

const Recover = ({ type, action }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const {
    data: recover,
    error,
    loading,
  } = useSelector((state) => state.recover);
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const req = dispatch(request(type, data));
    await req
      .then((res) => {
        // setSuccess(true);
        // history.push(location.pah)
        // console.log(res);
        toast.success("Código enviado para o e-mail", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        // console.log(error);
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

        {recover?.status === 200 ? (
          <ChangePassword email={email} type={type} />
        ) : (
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
                onKeyUp={(e) => setEmail(e.target.value)}
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
        )}

        <Copyright color="white" />
      </section>
    </SpaceBackground>
  );
};

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data, loading } = useSelector((state) => state.user);
  const { register, errors, handleSubmit } = useForm();

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    return () => {
      setPassword();
      setConfirmPassword();
    };
  }, []);

  const onSubmit = async (data) => {
    const { email, password, confirm_password, pin } = data;
    await dispatch(
      change(usertype, {
        email,
        pin,
        password,
        confirm_password,
      })
    )
      .then(() => {
        toast.success("Senha atualizada com sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Pin inválido", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        // console.log(error);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <InputGroup style={{ position: "relative" }}>
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
            defaultValue={props.email}
            placeholder="Digite o seu e-mail"
            errorMessage={errors?.email?.message}
          >
            E-mail
          </Input>
          <Input
            disabled={loading}
            ref={register({
              required: {
                value: true,
                message: "Digite o Pin recebido por e-mail",
              },
              minLength: {
                value: 6,
                message: "O pin precisa ter pelo menos 6 dígitos.",
              },
            })}
            name={"pin"}
            type={"text"}
            errors={errors}
            placeholder="Digite o pin"
            errorMessage={errors?.pin?.message}
          >
            Pin
          </Input>
        </InputGroup>
        <InputGroup style={{ position: "relative" }}>
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
            errorMessage={
              errors?.password?.type === "pattern"
                ? "paternet"
                : errors?.password?.message
            }
            placeholder="Digite a senha"
            onKeyUp={(e) => setPassword(e.target.value)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            Senha
          </Input>
          {showTooltip && (
            <PasswordChecker
              style={{ left: "50%" }}
              password={password}
              confirmPassword={confirmPassword}
              setValid={setAllValid}
              isValid={allValid}
            />
          )}
        </InputGroup>
        <InputGroup>
          <Input
            autocomplete="off"
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
            errorMessage={errors?.confirm_password?.message}
            placeholder="Digite a senha novamente"
            onKeyUp={(e) => setConfirmPassword(e.target.value)}
          >
            Confirme a senha
          </Input>
        </InputGroup>
      </Card>
      <ButtonGroup>
        <Button to={`/auth/${props.type}/email`} type={"outlineWhite"}>
          Voltar a login
        </Button>
        <Button
          submit
          disabled={loading || !allValid}
          Tag="button"
          type="green"
        >
          Atualizar senha
        </Button>
      </ButtonGroup>
    </form>
  );
};

export { Recover };
