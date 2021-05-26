import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { TabFlat } from "components/Tabs";
import { SubHeader } from "components/Header";
// import { Layout } from "components/Layout";
import { InfoProfile } from "components/InfoProfile";

// import styles from './styles.module.sass'

const Profile = () => {
  const { data: usertype } = useSelector((state) => state.usertype);

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

      <section style={{ margin: "0 24px" }}>
        <InfoProfile type={usertype} noShadow hasPassword dontRedirect />
      </section>
    </>
  );
};

export { Profile };
