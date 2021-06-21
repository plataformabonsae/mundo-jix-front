import React from "react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Dot } from "components/Dot";
import Button from "components/Button";
import { Search } from "components/Inputs";
import { FeedbackCard } from "components/FeedbackCard";

import * as colors from "utils/styles/Colors";

import styles from "./styles.module.sass";

const Feedbacks = (props) => {
  const { data: dashboard } = useSelector((state) => state.dashboard);
  return (
    <section className={styles.feedbacks}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "24px 0" }}>
          Feedbacks
        </Title>
        <Search />
      </header>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {dashboard?.feedbacks?.length ? (
            dashboard?.feedbacks?.map((item) => (
              <>
                <FeedbackCard
                  challengeId={item.challenge_id}
                  projectId={item.project_id}
                  data={item}
                />
              </>
            ))
          ) : (
            <Text>Sem feedbacks cadastradas</Text>
          )}
        </div>
      </div>
    </section>
  );
};

export { Feedbacks };
