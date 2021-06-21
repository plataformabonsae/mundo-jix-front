import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BlueCard, BlueCardContainer } from "components/BlueCard";

import { searchTeam } from "services/team";

// import styles from "./styles.module.sass";

const TeamFormation = (props) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.team);
  const { usertype } = useSelector((state) => state.usertype);
  const { id } = useParams();

  useEffect(() => {
    dispatch(searchTeam(usertype, { challenge_id: id }));
    console.log(usertype, { challenge_id: id });
  }, [dispatch, usertype, id]);

  return (
    <BlueCardContainer style={{ height: "100%" }}>
      <BlueCard
        style={{
          opacity: error ? 0.4 : 1,
          cursor: error ? "not-allowed" : "pointer",
        }}
        onClick={() => (!error ? props.handleStep("equipes") : null)}
        info={
          "Guardião é o administrador da equipe e o único que pode convidar membros e enviar o projeto de uma equipe."
        }
        desc={
          "Ao selecionar uma equipe para participar, você deve aguardar pela confirmação do Guardião desta equipe."
        }
      >
        Participar de uma equipe
      </BlueCard>
      <BlueCard
        onClick={() => props.handleNewTeamDialog()}
        desc={
          "Ao criar uma equipe, você será o Guardião dela. O único que poderá convidar membros e enviar o projeto para avaliação no Desafio."
        }
      >
        Criar uma equipe
      </BlueCard>
    </BlueCardContainer>
  );
};

export { TeamFormation };
