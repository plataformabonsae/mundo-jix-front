import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
// import { removeLastPath } from "utils/etc";

import { validationSchema } from "utils/etc";

import { Job } from "./components/Job";
import { Avaliation } from "./components/Avaliation";
import { Challenge } from "./components/Challenge";

import { Text, Title } from "components/Text";
import { Layout } from "components/Layout";
import { Steps, Step } from "components/Steps";

// import { sanitize } from "utils/etc";

import styles from "./styles.module.sass";

const fileSchema = yup.object().shape({
  materials_1: yup
    .mixed()
    .test(
      "",
      "O arquivo deve ter até 8MB",
      (value) => !value.length || value[0].size <= 8000000
    ),
});

const ChallengeEdit = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: usertype } = useSelector((state) => state.usertype);

  const [trails, setTrails] = useState([]);
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState("job");

  const handleStep = (step, data) => {
    setStep(step);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <>
      <Steps>
        <Step
          active={step === "job"}
          onClick={() => handleStep("job")}
          number={1}
        >
          Vaga
        </Step>
        <Step
          active={step === "desafio"}
          onClick={() => handleStep("desafio")}
          number={2}
        >
          Desafio
        </Step>
        <Step
          active={step === "avaliacao"}
          onClick={() => handleStep("avaliacao")}
          number={3}
        >
          Avaliação
        </Step>
      </Steps>
      {step === "job" && (
        <Job handleGoBack={handleStep} handleStep={handleStep} />
      )}

      {step === "desafio" && (
        <Challenge handleGoBack={handleStep} handleStep={handleStep} />
      )}

      {step === "avaliacao" && (
        <Avaliation handleGoBack={handleStep} handleSubmit={handleStep} />
      )}
    </>
  );
};

export { ChallengeEdit };
