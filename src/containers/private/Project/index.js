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

import { get } from "services/project";

import styles from "./styles.module.sass";

const Project = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [hasProject, setHasProject] = useState();
  const [modalEditProject, setModalEditProject] = useState(false);

  const { data: usertype } = useSelector((state) => state.usertype);
  const { data, loading } = useSelector((state) => state.project);

  // Fetch specific
  useEffect(() => {
    dispatch(get(usertype, { challenge_id: id }))
      .then((res) => {
        console.log(res);
        (res.data.data.project || res.data.data.challenge_id) &&
          setHasProject(true);
      })
      .catch((err) => {
        setHasProject(false);
      });
  }, [dispatch, usertype, id]);

  // useEffect(() => {
  //   !hasProject && history.push(`${location.pathname}/modal/cadastro`);
  // }, [hasProject, history, location]);

  const handleEditModal = () => {
    setModalEditProject((prev) => !prev);
  };

  return (
    <>
      {hasProject && data && (
        <section className={styles.project}>
          <Header data={data.challenge} />
          <Resume data={data.project || data} />
          <Carousel data={data.project || data} modal={handleEditModal} />
        </section>
      )}
      {!hasProject && !loading && (
        <ModalPage
          title={"cadastrar projeto"}
          close={removeLastPath(location.pathname)}
        >
          <ProjectEdit />
        </ModalPage>
      )}
      {modalEditProject && (
        <ModalPage
          title={"Editar projeto"}
          data={data?.project || data}
          handleClose={handleEditModal}
        >
          <ProjectEdit edit />
        </ModalPage>
      )}
      {loading && <Loading />}
    </>
  );

  // if (owned && data) {
  //   return (
  //     <section className={styles.project}>
  //       <Link className={styles.goback} to={location.pathname.slice(0, -1)}>
  //         Voltar
  //       </Link>
  //       <Header data={current} />
  //       <TeamInfo data={current} />
  //       <Resume data={current} />
  //       <Carousel data={current} />
  //     </section>
  //   );
  // } else {
  //   <Loading />;
  // }
};

export { Project };
