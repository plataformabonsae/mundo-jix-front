import React from "react";
import { useParams } from "react-router-dom";

import { Challenge } from "containers/private/Challenge";
import { Projects } from "containers/private/Projects";

import { TabFlat } from "components/Tabs";
import { SubHeader } from "components/Header";

const Judges = (props) => {
  const { action, id } = useParams();
  const type = window.localStorage.getItem("usertype");

  const router = (action) => {
    if (action === "projetos") {
      return <Projects />;
    } else if (action === "forum") {
      return "forum";
    } else {
      return <Challenge />;
    }
  };

  return (
    <>
      <SubHeader>
        <TabFlat to={`/${type}/desafio/${id}`} color={"white"}>
          Início
        </TabFlat>
        <TabFlat to={`/${type}/projetos/${id}`} color={"white"}>
          Projetos
        </TabFlat>
        {type === "mentor" && (
          <TabFlat to={`/${type}/forum/${id}`} color={"white"}>
            Forum
          </TabFlat>
        )}
      </SubHeader>
      {router(action)}
    </>
  );
};

export { Judges };
