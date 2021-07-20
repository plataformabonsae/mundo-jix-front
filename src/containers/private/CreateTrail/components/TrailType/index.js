import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BlueCard, BlueCardContainer } from "components/BlueCard";

// import styles from "./styles.module.sass";

const TrailType = (props) => {
  const { id } = useParams();
  return (
    <BlueCardContainer type={3} style={{ height: "100%" }}>
      <Link
        to={`/editar-trilha/trilha-livre/${id}/video`}
        style={{ textDecoration: "none" }}
      >
        <BlueCard>Videoaula</BlueCard>
      </Link>
      <Link
        to={`/editar-trilha/trilha-livre/${id}/material`}
        style={{ textDecoration: "none" }}
      >
        <BlueCard>Material</BlueCard>
      </Link>
      <Link
        to={`/editar-trilha/trilha-livre/${id}/question`}
        style={{ textDecoration: "none" }}
      >
        <BlueCard>Questão</BlueCard>
      </Link>
    </BlueCardContainer>
  );
};

export { TrailType };
