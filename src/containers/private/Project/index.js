import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import { Loading } from "components/Loading";
import { ModalPage } from "components/ModalPage";

import { ProjectEdit } from "./components/ProjectEdit";
import { Header } from "./components/Header";
// import { TeamInfo } from "./components/TeamInfo";
import { Resume } from "./components/Resume";
import { Carousel } from "./components/Carousel";

import { removeLastPath } from "utils/etc";

import { get as getProject } from "services/project";
import { project as getProjectAsMentor } from "services/projects";

import styles from "./styles.module.sass";

const Project = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, trail_type } = useParams();
  const [hasProject, setHasProject] = useState();
  const [modalEditProject, setModalEditProject] = useState(false);

  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: user } = useSelector((state) => state.user);
  const { data, loading } = useSelector((state) => state.project);
  const { current: mentorProject, loading: mentorLoading } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    setHasProject(!!mentorProject?.project || !!data?.project);
  }, [mentorProject?.project, data?.project]);

  const handleEditModal = () => {
    setModalEditProject((prev) => !prev);
  };

  return (
    <>
      {(data?.project || mentorProject?.project) &&
        (data?.challenge || mentorProject?.challenge) && (
          <section className={styles.project}>
            <Header data={data?.challenge || mentorProject?.challenge} />
            <Resume data={data?.project || mentorProject?.project} />
            <Carousel data={data || mentorProject} modal={handleEditModal} />
          </section>
        )}
      {!hasProject && (!loading || !mentorLoading) && (
        <ModalPage
          title={"Cadastrar projeto"}
          close={removeLastPath(location.pathname)}
        >
          <ProjectEdit team={data?.team?.id} user={data?.user?.id} />
          {console.log(data)}
        </ModalPage>
      )}
      {modalEditProject && data?.project && (
        <ModalPage
          title={"Editar projeto"}
          data={data?.project || data}
          handleClose={handleEditModal}
        >
          <ProjectEdit
            id={data?.project?.id}
            team={data?.team?.id}
            handleClose={handleEditModal}
            user={data?.pivot?.user_id || data?.project?.user_id}
            edit
          />
        </ModalPage>
      )}
      {loading && <Loading />}
      {mentorLoading && <Loading />}
    </>
  );
};

export { Project };
