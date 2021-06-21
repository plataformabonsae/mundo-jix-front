import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "components/Inputs";
// import Button from "components/Button";

import { TitleAndBack } from "components/TitleAndBack";

import { ProjectCard } from "./components/ProjectCard";

import { projects as allProjects } from "services/projects";

import styles from "./styles.module.sass";

const Projects = (props) => {
  const [projects, setProjects] = useState(null);
  const [challengeExists, setChallengeExists] = useState(true);
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: challenge } = useSelector((state) => state.challenge);
  const { data: projectsStore, loading } = useSelector(
    (state) => state.projects
  );

  const { id, type } = useParams();

  // Fetch
  useEffect(() => {
    dispatch(allProjects(usertype, { challenge_id: id }));
  }, [dispatch, usertype, id]);

  useEffect(() => {
    setProjects((state) => projectsStore?.projects);
  }, [projectsStore]);

  const handleSearch = (event) => {
    setProjects((state) =>
      [...state].filter(
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
        <TitleAndBack data={challenge?.challenge} noBack />
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
            ? projects.map((item) => (
                <ProjectCard
                  to={`/meus-desafios/${type}/${id}/projeto/${item.id}`}
                  data={item}
                  key={item.id}
                />
              ))
            : "Sem resultados"}
        </section>
      </div>
    );
  } else {
    return "Esses desafio não tem projetos ou você não tem permissão para acessar.";
  }
};

export { Projects };
