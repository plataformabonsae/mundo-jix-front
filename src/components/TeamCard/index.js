import React from "react";

import { Card } from "components/Card";
import Button from "components/Button";
import { Title, Text } from "components/Text";
// import { ProfileCard } from "components/ProfileCard";

import shield from "assets/icons/shield.svg";

// import { BASEURL } from "utils/api";

import styles from "./styles.module.sass";

const TeamCard = (props) => {
  const { data } = props;
  // console.log(data);
  return (
    <Card className={styles.card} noShadow border>
      <Title>{data.name}</Title>
      <Text style={{ margin: "12px 0" }}>
        <strong>{data.users.length}/5</strong> participantes
      </Text>
      <div className={styles.guardian}>
        <img src={shield} alt="Guardião" />
        Guardião:{" "}
        {data.users.filter((item) => item.pivot.is_guardian === 1)[0]?.name}
      </div>
      <div className={styles.button}>
        <Button
          Tag={"span"}
          type={"green"}
          disabled={data.users.length === 4}
          onClick={() => data.users.length < 4 && props.handleClick(data)}
        >
          Solicitar participação
        </Button>
      </div>
    </Card>
  );
};

export { TeamCard };
