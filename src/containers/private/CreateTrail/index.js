import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { useParams, useHistory, useLocation } from "react-router-dom";
// import { useForm, useFieldArray } from "react-hook-form";

import { TrailType } from "./components/TrailType";
import { Trail } from "./components/Trail";
// import { Avaliation } from "./components/Avaliation";

import { Steps, Step } from "components/Steps";
import { Layout } from "components/Layout";
import { ButtonGroup } from "components/ButtonGroup";
import Button from "components/Button";
import { TitleAndBack } from "components/TitleAndBack";
import { Title, Text } from "components/Text";
import { Dialog } from "components/Dialog";

import styles from "./styles.module.sass";

import { get } from "services/challenges";

const CreateTrail = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [trails, setTrails] = useState([]);

  const { data: usertype } = useSelector((state) => state.usertype);
  const { data } = useSelector((state) => state.challenge);

  const { step: stepUrl, id, type } = useParams();

  useEffect(() => {
    handleTrails(type);
  }, [type]);

  useEffect(() => {
    dispatch(get(usertype, { challenge_id: id }));
    console.log(stepUrl);
  }, [dispatch, usertype, id, stepUrl]);

  const handleTrails = (trail) => {
    setTrails((prev) => [...prev, { type: trail }]);
  };

  return (
    <section className={styles.wrapper}>
      {/* {!(step === "convidar") && ( */}
      <TitleAndBack
        backText={"Voltar"}
        to={`/meus-desafios/${data?.challenge.challenge_type}/${data?.challenge.id}`}
      />
      {/* )} */}
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
          trails={trails}
        />
      )}

      <ToastContainer />
      {/* </form> */}
    </section>
  );
};

export { CreateTrail };
