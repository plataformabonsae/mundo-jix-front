import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Dot } from "components/Dot";
import Button from "components/Button";
import { Search, Input } from "components/Inputs";
import { FeedbackCard } from "components/FeedbackCard";

import * as colors from "utils/styles/Colors";

import styles from "./styles.module.sass";

const Feedbacks = (props) => {
  const { data: dashboard } = useSelector((state) => state.dashboard);
  const [searchToggle, setSearchToggle] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    dashboard?.feedbacks?.original?.data &&
      setFeedbacks([...dashboard?.feedbacks?.original?.data]);
  }, [dashboard?.feedbacks]);

  const handleSearchButton = () => setSearchToggle((prev) => !prev);
  const handleSearch = (e) =>
    setFeedbacks((state) =>
      [...dashboard?.feedbacks?.original?.data].filter(
        (feedback) =>
          feedback.challenge
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          feedback.mentor.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          feedback.feedback.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

  return (
    <section className={styles.feedbacks}>
      <header className={styles.header}>
        <Title size={18} style={{ margin: "24px 0" }}>
          Feedbacks
        </Title>
        <Search onClick={handleSearchButton} />
      </header>
      {searchToggle && (
        <Input
          onChange={handleSearch}
          placeholder="Digite para procurar feedback"
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {feedbacks?.length ? (
            feedbacks?.map((item, index) => (
              <>
                <FeedbackCard
                  key={index}
                  challengeId={item.challenge_id}
                  projectId={item.project_id}
                  data={item}
                />
              </>
            ))
          ) : (
            <Text>Sem feedbacks</Text>
          )}
        </div>
      </div>
    </section>
  );
};

export { Feedbacks };
