import React from "react";

import { BlueCard, BlueCardContainer } from "components/BlueCard";

// import styles from "./styles.module.sass";

const TeamFormation = (props) => {
  return (
    <BlueCardContainer style={{ height: "100%" }}>
      <BlueCard
        style={{opacity: .3, cursor: 'not-allowed'}}
        // onClick={() => props.handleStep("equipes")}
        info={
          "Guardião é o administrador da equipe e o único que pode convidar membros e enviar o projeto de uma equipe."
        }
        desc={
          "Ao selecionar uma equipe para participar, você deve aguardar pela confirmação do Guardião desta equipe.."
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
