import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Layout } from "components/Layout";

import { Pessoal } from "./components/Pessoal";
import { Academico } from "./components/Academico";
import { Profissional } from "./components/Profissional";

import { Badges } from "./components/Badges";

const InfoProfile = ({
  center,
  noShadow,
  children,
  hasPassword,
  type,
  dontRedirect,
}) => {
  let history = useHistory();
  let { action } = useParams();
  const { data: user, loading } = useSelector((state) => state.user);

  const joinType = (action, type) => {
    if (action === "pessoal") {
      return (
        <Layout>
          <Pessoal
            hasPassword
            dontRedirect
            noShadow={noShadow}
            type={type}
            action={action}
          />
        </Layout>
      );
    } else if (action === "academico") {
      return (
        <Layout>
          <Academico
            dontRedirect
            noShadow={noShadow}
            type={type}
            action={action}
          />
        </Layout>
      );
    } else if (action === "profissional") {
      return (
        <Layout>
          <Profissional
            dontRedirect
            noShadow={noShadow}
            type={type}
            action={action}
          />
        </Layout>
      );
    } else if (action === "insignias") {
      return <Badges />;
    } else {
      if (type === "empresa") {
        return (
          <Layout>
            <Pessoal
              dontRedirect
              noShadow={noShadow}
              type={type}
              action={action}
            />
          </Layout>
        );
      } else {
        history.push("/404");
      }
    }
  };

  return (
    <>
      {children}
      {user && joinType(action, type)}
    </>
  );
};

export { InfoProfile };
