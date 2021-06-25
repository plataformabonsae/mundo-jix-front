import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Layout } from "components/Layout";

import { Pessoal } from "./components/Pessoal";
import { Empresa } from "./components/Empresa";
import { Academico } from "./components/Academico";
import { Profissional } from "./components/Profissional";

import { Badges } from "./components/Badges";

const InfoProfile = ({
  // center,
  noShadow,
  children,
  hasPassword,
  dontRedirect,
}) => {
  let history = useHistory();
  let { action } = useParams();
  const { data: user } = useSelector((state) => state.user);
  const { data: type } = useSelector((state) => state.usertype);

  const joinType = (action, type) => {
    if (type === "talento") {
      if (action === "pessoal") {
        return (
          <Layout style={{ marginTop: 0, padding: 0, paddingBottom: 24 }}>
            <Pessoal
              hasPassword={hasPassword}
              dontRedirect={dontRedirect}
              noShadow={noShadow}
              type={type}
              action={action}
            />
          </Layout>
        );
      } else if (action === "academico") {
        return (
          <Layout style={{ marginTop: 0, padding: 0 }}>
            <Academico
              dontRedirect={dontRedirect}
              noShadow={noShadow}
              type={type}
              action={action}
            />
          </Layout>
        );
      } else if (action === "profissional") {
        return (
          <Layout style={{ marginTop: 0, padding: 0 }}>
            <Profissional
              dontRedirect={dontRedirect}
              noShadow={noShadow}
              type={type}
              action={action}
            />
          </Layout>
        );
      } else if (action === "insignias") {
        return <Badges />;
      }
    } else {
      // if (type === "empresa") {
      return (
        <Layout style={{ marginTop: 0, padding: 0 }}>
          <Empresa
            dontRedirect={dontRedirect}
            noShadow={noShadow}
            type={type}
            action={action}
          />
        </Layout>
      );
      // } else {
      // history.push("/dashboard");
      // }
    }
  };

  return (
    <>
      {children}
      {user && joinType(action, type)}
      <div style={{ height: 60 }}></div>
    </>
  );
};

export { InfoProfile };
