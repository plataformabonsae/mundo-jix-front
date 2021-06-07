import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useParams,  Link } from "react-router-dom";

import { TabFlat } from "components/Tabs";
import { SubHeader } from "components/Header";
import { Title } from "components/Text";
import { InfoProfile } from "components/InfoProfile";

import styles from './styles.module.sass'

const Profile = () => {
  const { data: usertype } = useSelector((state) => state.usertype);
  let { action } = useParams();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mundo Jix - Perfil</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      {usertype === "talento" && (
        <>
          <SubHeader>
            <TabFlat to={`/perfil/pessoal`} color={"white"}>
              Pessoal
            </TabFlat>
            <TabFlat to={`/perfil/academico`} color={"white"}>
              Acadêmico
            </TabFlat>
            <TabFlat to={`/perfil/profissional`} color={"white"}>
              Profissional
            </TabFlat>
            <TabFlat to={`/perfil/insignias`} color={"white"}>
              Insígnias
            </TabFlat>
          </SubHeader>
        </>
      )}

      <section className={styles.container}>
        {action !== "insignias" && (
          <Title size={28} style={{ marginLeft: 20, marginBottom: 36 }}>
            Perfil
          </Title>
        )}
        <InfoProfile type={usertype} noShadow hasPassword dontRedirect />
        <Link to={`auth/${usertype}/logout`} style={{color: "#05B1A8"}}>Sair da conta</Link>
      </section>
    </>
  );
};

export { Profile };
