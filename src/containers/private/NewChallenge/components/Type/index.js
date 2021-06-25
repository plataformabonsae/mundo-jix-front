import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BlueCard, BlueCardContainer } from "components/BlueCard";

// import styles from "./styles.module.sass";

const Type = (props) => {
  return (
    <BlueCardContainer style={{ height: "100%" }}>
      <BlueCard
        onClick={() =>
          props.handleStep("job", { challenge_type: "in_company" })
        }
      >
        In company
      </BlueCard>
      <BlueCard
        onClick={() =>
          props.handleStep("job", { challenge_type: "ultradesafio" })
        }
      >
        Ultradesafio
      </BlueCard>
    </BlueCardContainer>
  );
};

export { Type };
