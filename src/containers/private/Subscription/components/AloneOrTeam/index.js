import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTransition, animated, useTrail } from "@react-spring/web";

import { BlueCard, BlueCardContainer } from "components/BlueCard";
import { Loading } from "components/Loading";
import { transformToNestObject } from "react-hook-form";

// import styles from "./styles.module.sass";

const Trail = ({ start, children }) => {
  const items = React.Children.toArray(children);

  const trail = useTrail(items.length, {
    from: { y: 200, opacity: 0 },
    enter: { y: 0, opacity: 1, delay: 700 },
    leave: { y: -200, opacity: 0 },
  });
  return trail.map(({ style }, index) => (
    <animated.div>
      <div style={style}>{items[index]}</div>
    </animated.div>
  ));
};

const AloneOrTeam = (props) => {
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  const [items, setItems] = useState([]);
  const transitions = useTransition(items, {
    from: (item) => ({ y: item.y, opacity: 0 }),
    enter: (item) => async (next) => {
      // await next({ });
      await next({ y: 0, delay: item.delay, opacity: 1 });
    },
    leave: (item) => ({ y: item.y, opacity: 0 }),
  });

  // Fetch
  useEffect(() => {
    window.localStorage.removeItem("current_team");
  }, [dispatch, usertype]);

  useEffect(() => {
    setItems(() => [
      {
        y: 100,
        delay: 300,
        type: "individual",
      },
      {
        y: 200,
        delay: 450,
        type: "group",
      },
    ]);
  }, []);

  return (
    <BlueCardContainer style={{ height: "100%" }}>
      {props.loading && (
        <Loading
          style={{
            position: "absolute",
            left: "50%",
            right: "50%",
            zIndex: 2,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      <>
        {!!items.length &&
          transitions(
            (style, item) =>
              item && (
                <animated.div style={style}>
                  <BlueCard
                    onClick={
                      item.type === "individual"
                        ? () => props.handleAloneDialog()
                        : () => props.handleStep("2")
                    }
                    desc={
                      item.type === "individual"
                        ? "Você será redirecionado para o desafio e participará de forma individual."
                        : "Você terá a possibilidade de participar de uma equipe existente ou criar sua própria equipe."
                    }
                    disabled={
                      item.type === "individual"
                        ? null
                        : props.currentChallenge?.challenge_type ===
                          "in_company"
                    }
                  >
                    {item.type === "individual"
                      ? "Individualmente"
                      : "Em equipe"}
                  </BlueCard>
                </animated.div>
              )
          )}
      </>
    </BlueCardContainer>
  );
};

export { AloneOrTeam };
