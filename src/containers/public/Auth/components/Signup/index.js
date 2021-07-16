import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { FacebookLogin } from "react-facebook-login-component";
// import { LinkedIn } from "react-linkedin-login-oauth2";

import { PasswordChecker } from "components/PasswordChecker";
import { Input, InputGroup } from "components/Inputs";
import Button from "components/Button";
import Copyright from "components/Copyright";
import { Logo } from "components/Logo";
import { Loading } from "components/Loading";

import { newuser } from "services/auth";
import { tokenFetchExternal } from "services/token";
import { linkedin } from "services/social";
import {
  loginExternal,
  // logout
} from "services/auth";
import queryString from "query-string";
// import history from "utils/history";

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

  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  // const { data: user } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.token);
  const [linkedinSettings, setlinkedinSettings] = useState({});
  const [linkedinCallBack, setLinkedinCallback] = useState({});
  // const { loading } = useSelector((state) => state.token);

  useEffect(() => {
    setlinkedinSettings({
      redirect_uri: `${process.env.REACT_APP_URL}/auth/talento/login`,
    });
  }, [type]);

  useEffect(() => {
    setLinkedinCallback(queryString.parse(location.search));
  }, [location]);

  useEffect(() => {
    if (linkedinCallBack?.code) {
      const req = linkedin(linkedinCallBack, linkedinSettings.redirect_uri);
      req.then((response) => {
        console.log(response, "social linkedin promise response");
        const res = dispatch(
          tokenFetchExternal(type, { email: response.email })
        );
        res
          .then((responseApi) => {
            responseApi?.data?.message === "User Not Found!" &&
              dispatch(
                newuser(type, {
                  email: response.email,
                  name: response.name,
                  password: response.id,
                  confirm_password: response.id,
                  is_mentor: 0,
                  is_judge: 0,
                  last_name: response.last_name,
                  cpf: "000.000.000",
                })
              ).then(() => history.push(`/join/${type}/terms`));
            responseApi?.data?.message ===
              "Your Account was successfully Logged!" &&
              dispatch(
                loginExternal(type, {
                  email: response.email,
                  // password: response.password,
                })
              )
                .then((res) => history.push("/dashboard"))
                .catch((err) => console.log(err));
          })
          .catch((response) => console.log(response));
      });
    }
  }, [linkedinCallBack, linkedinSettings, dispatch, history, type]);

  const responseFacebook = async (data) => {
    const res = dispatch(tokenFetchExternal(type, { email: data.email }));
    await res.then((response) => {
      response?.data?.message === "User Not Found!" &&
        dispatch(
          newuser(type, {
            email: data.email,
            name: data.name,
            password: data.id,
            confirm_password: data.id,
            is_mentor: 0,
            is_judge: 0,
            last_name: "Escreva seu sobrenome",
            // cpf: "000.000.000,
          })
        ).then(() => history.push(`/join/${type}/terms`));
      response?.data?.message === "Your Account was successfully Logged!" &&
        dispatch(loginExternal(type, { email: data.email }))
          .then((res) => history.push("/dashboard"))
          .catch((err) => console.log(err));
      // history.push(`/dashboard`);
    });
  };

  const responseFailure = (data) => {
    console.log(data);
  };

  const responseGoogle = async (data) => {
    console.log(data, "google");
    const res = dispatch(
      tokenFetchExternal(type, { email: data?.profileObj?.email })
    );
    await res.then((response) => {
      console.log(response);
      response?.data?.message === "User Not Found!" &&
        dispatch(
          newuser(type, {
            email: data?.profileObj?.email,
            name: data?.profileObj?.givenName,
            password: data?.profileObj?.googleId,
            confirm_password: data?.profileObj?.googleId,
            is_mentor: 0,
            is_judge: 0,
            last_name: "Sobrenome",
            // cpf: "000.000.000,
          })
        ).then(() => history.push(`/join/${type}/terms`));
      response?.data?.message === "Your Account was successfully Logged!" &&
        dispatch(loginExternal(type, { email: data?.profileObj?.email }))
          .then((res) => history.push("/dashboard"))
          // .then((res) => console.log(res))
          .catch((err) => console.log(err));
      // history.push(`/dashboard`);
    });
  };

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
        <style>
          {`
        .button__facebook {
          position: absolute;
          background: red;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: transparent;
          border: none;
          width: 100%;
          z-index: 3;
          cursor: pointer;
        }
        `}
        </style>
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
            onKeyUp={(e) => setConfirmPassword(e.target.value)}
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
              value="_"
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
            type === "talento"
              ? !lastName.length
              : false
            // !email.length
          }
          Tag={`button`}
          submit
          type="primary"
        >
          Continuar
        </Button>

        {type === "talento" && (
          <>
            <span className={styles.or}>ou</span>

            <div className={styles.buttons}>
              {loading && (
                <div className={styles.loading}>
                  <Loading />
                </div>
              )}
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    Tag="button"
                    type="google"
                  >
                    Entrar com Google
                  </Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseFailure}
                cookiePolicy={"single_host_origin"}
              />
              <Button
                style={{ position: "relative", cursor: "pointer" }}
                Tag="span"
                type="facebook"
              >
                <FacebookLogin
                  socialId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                  language="pt_BR"
                  scope="public_profile,email"
                  responseHandler={responseFacebook}
                  xfbml={true}
                  fields="id,email,name"
                  version="v2.5"
                  className={"button__facebook"}
                  buttonText=""
                />
                Cadastrar com Facebook
              </Button>
              <Button
                Tag="a"
                href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&redirect_uri=${linkedinSettings.redirect_uri}&state=foobar&scope=r_liteprofile%20r_emailaddress`}
                type="linkedin"
              >
                Cadastrar com Linkedin
              </Button>
            </div>
          </>
        )}

        <div className={styles.subSpan} style={{ marginTop: 32 }}>
          Já possui uma conta?
          <Link to={`/auth/${type}/login`}>Entrar</Link>
        </div>
      </div>

      {/* <div style={{ height: "100%", display: "flex", alignItems: "flex-end" }}> */}
      {/* <Copyright style={{ display: "block" }} /> */}
      {/* </div> */}
    </form>
  );
};

export default Email;
