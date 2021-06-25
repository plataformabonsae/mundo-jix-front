import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BlueCard, BlueCardContainer } from "components/BlueCard";

// import styles from "./styles.module.sass";

const TrailType = (props) => {
  return (
    <BlueCardContainer type={3} style={{ height: "100%" }}>
      <BlueCard onClick={() => props.handleTrails("video")}>Videoaula</BlueCard>
      <BlueCard onClick={() => props.handleTrails("material")}>
        Material
      </BlueCard>
      <BlueCard onClick={() => props.handleTrails("question")}>
        Questão
      </BlueCard>
    </BlueCardContainer>
  );
};

export { TrailType };
