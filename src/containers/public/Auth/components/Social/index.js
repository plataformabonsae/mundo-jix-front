import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Helmet } from "react-helmet";
// import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { FacebookLogin } from "react-facebook-login-component";
// import { LinkedIn } from "react-linkedin-login-oauth2";

import { TabBox, TabBoxContent, TabBoxWrapper } from "components/Tabs";
import Button from "components/Button";
import Copyright from "components/Copyright";
import { Logo } from "components/Logo";
import { Loading } from "components/Loading";
import queryString from "query-string";

// import { removeLastPath } from "utils/etc";

// import Typography from 'utils/styles/Typography.module.sass'

import styles from "./styles.module.sass";

import { tokenFetchExternal } from "services/token";
import { newuser } from "services/auth";
import { linkedin } from "services/social";
import {
  loginExternal,
  // logout
} from "services/auth";

const Social = ({ title, desc, type }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [linkedinSettings, setlinkedinSettings] = useState({});
  const [linkedinCallBack, setLinkedinCallback] = useState({});
  const { loading } = useSelector((state) => state.token);

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
                  password: response.password,
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
        dispatch(loginExternal(type, { email: data.email, password: data.id }))
          .then((res) => history.push("/dashboard"))
          .catch((err) => console.log(err));
      // history.push(`/dashboard`);
    });
  };

  const responseGoogle = async (data) => {
    const res = dispatch(tokenFetchExternal(type, { email: data?.Et?.ou }));
    await res.then((response) => {
      console.log(response);
      response?.data?.message === "User Not Found!" &&
        dispatch(
          newuser(type, {
            email: data?.Et?.ou,
            name: data?.Et?.Ue,
            password: data?.Aa,
            confirm_password: data?.Aa,
            is_mentor: 0,
            is_judge: 0,
            last_name: "Escreva seu sobrenome",
            // cpf: "000.000.000,
          })
        ).then(() => history.push(`/join/${type}/terms`));
      response?.data?.message === "Your Account was successfully Logged!" &&
        dispatch(
          loginExternal(type, { email: data?.Et?.ou, password: data?.Aa })
        )
          .then((res) => history.push("/dashboard"))
          // .then((res) => console.log(res))
          .catch((err) => console.log(err));
      // history.push(`/dashboard`);
    });
  };

  // const responseLinkedin = (data) => console.log(data);

  return (
    <section className={styles.login}>
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
      <div className={styles.content}>
        <Logo title={title} desc={desc} />

        <TabBoxWrapper>
          <TabBox
            Tag={Link}
            to="/auth/talento/login"
            active={type === "talento" ? true : false}
          >
            Talento
          </TabBox>

          <TabBox
            Tag={Link}
            to="/auth/empresa/email"
            active={type === "empresa" ? true : false}
          >
            Empresa
          </TabBox>

          <TabBoxContent
            style={{ position: "relative", background: "#fbfbfb" }}
          >
            {loading && (
              <div className={styles.loading}>
                <Loading />
              </div>
            )}
            <div className={styles.buttons}>
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
                onFailure={responseGoogle}
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
                Entrar com Facebook
              </Button>
              <Button
                Tag="a"
                href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&redirect_uri=${linkedinSettings.redirect_uri}&state=foobar&scope=r_liteprofile%20r_emailaddress`}
                type="linkedin"
              >
                Entrar com Linkedin
              </Button>

              <Button Tag={Link} to={`/auth/${type}/email`} type="email">
                Entrar com E-mail
              </Button>
            </div>
          </TabBoxContent>
        </TabBoxWrapper>

        <div className={styles.subSpan} style={{ marginTop: 32 }}>
          Não possui uma conta?
          <Link to={`/auth/${type}/signup`}>Cadastre-se</Link>
        </div>
      </div>

      <Copyright />
    </section>
  );
};

export default Social;
