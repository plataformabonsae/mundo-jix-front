import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { TrailType } from "./components/TrailType";
import { Trail } from "./components/Trail";
import { TitleAndBack } from "components/TitleAndBack";
import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

import { get } from "services/challenges";
import { get as getTrail } from "services/createTrail";

const CreateTrail = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [savedTrails, setSavedTrails] = useState([]);
  const [trails, setTrails] = useState([]);

  const { data: usertype } = useSelector((state) => state.usertype);
  const { data } = useSelector((state) => state.challenge);
  const { trail, loading } = useSelector((state) => state.createTrail);

  const { step: stepUrl, id, type } = useParams();

  useEffect(() => {
    handleTrails(type);
  }, [type]);

  useEffect(() => {
    dispatch(get(usertype, { challenge_id: id }));
  }, [dispatch, usertype, id, stepUrl]);

  useEffect(() => {
    dispatch(getTrail(usertype, { challenge_id: id }));
  }, [dispatch, usertype, id, stepUrl]);

  useEffect(() => {
    setSavedTrails(trail?.trail?.trails.sort((a, b) => a.order - b.order));
  }, [trail, loading]);

  const handleTrails = (trail) => {
    setTrails((prev) => [...prev, { type: trail }]);
  };

  return (
    <section className={styles.wrapper}>
      <TitleAndBack
        backText={"Voltar"}
        to={`/meus-desafios/${trail?.trail?.challenge_type}/${trail?.trail?.id}`}
      />
      <div className={styles.title__container}>
        <Title size={28} className={styles.title}>
          {stepUrl === "trilha" &&
            "Qual tipo de conteúdo você deseja adicionar?"}
          {stepUrl === "trilha-livre" && "Trilha Livre"}
        </Title>
      </div>

      {stepUrl === "trilha" && <TrailType handleTrails={handleTrails} />}

      {stepUrl === "trilha-livre" && (
        <Trail
          handleTrails={handleTrails}
          setTrails={setTrails}
          savedTrails={savedTrails}
          trails={trails}
        />
      )}
    </section>
  );
};

export { CreateTrail };
