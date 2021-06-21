import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BlueCard, BlueCardContainer } from "components/BlueCard";

// import styles from "./styles.module.sass";

const AloneOrTeam = (props) => {
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  // Fetch
  useEffect(() => {
    window.localStorage.removeItem("current_team");
  }, [dispatch, usertype]);

  return (
    <BlueCardContainer style={{ height: "100%" }}>
      <BlueCard
        onClick={() => props.handleStep("2")}
        desc={
          "Você terá a possibilidade de participar de uma equipe existente ou criar sua própria equipe."
        }
      >
        Em equipe
      </BlueCard>
      <BlueCard
        onClick={() => props.handleAloneDialog()}
        desc={
          "Você será redirecionado para o desafio e participará de forma individual."
        }
      >
        Individualmente
      </BlueCard>
    </BlueCardContainer>
  );
};

export { AloneOrTeam };
