import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "components/Inputs";
// import Button from "components/Button";

import { Header } from "./components/Header";
import { ProjectCard } from "./components/ProjectCard";

import { all } from "services/challenges";

import styles from "./styles.module.sass";

const Projects = (props) => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [projects, setProjects] = useState(null);
  const [challengeExists, setChallengeExists] = useState(true);
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data, loading } = useSelector((state) => state.challenges);

  const { id } = useParams();

  // Fetch
  useEffect(() => {
    dispatch(all(usertype));
  }, [dispatch, usertype]);

  // choose the right challenge data
  useEffect(() => {
    if (data)
      setCurrentChallenge(
        () => [...data].filter((challenge) => challenge.id === parseInt(id))[0]
      );
  }, [data, id]);

  // if empty
  useEffect(() => {
    if (currentChallenge === undefined) setChallengeExists(false);
  }, [currentChallenge]);

  useEffect(() => {
    setProjects((state) => data);
  }, [data]);

  const handleSearch = (event) => {
    setProjects((state) =>
      [...data].filter(
        (challenge) =>
          challenge.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          challenge.description
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
      )
    );
  };

  if (challengeExists) {
    return (
      <div>
        <Header data={currentChallenge} />
        <section className={styles.search}>
          <Input
            disabled={loading}
            onChange={handleSearch}
            placeholder={"Digite para pesquisar projetos"}
          >
            Pesquisar
          </Input>
        </section>
        <section className={styles.projects}>
          {projects?.length > 0
            ? projects.map((item) => <ProjectCard data={item} key={item.id} />)
            : "Sem resultados"}
        </section>
      </div>
    );
  } else {
    return "Esses desafio não tem projetos ou você não tem permissão para acessar.";
  }
};

export { Projects };
