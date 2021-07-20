import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { useParams, useHistory, useLocation } from "react-router-dom";
// import { useForm, useFieldArray } from "react-hook-form";

import { Type } from "./components/Type";
import { Job } from "./components/Job";
import { Avaliation } from "./components/Avaliation";
import { Challenge } from "./components/Challenge";
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

import { createChallenge as create } from "services/newChallenge";

const NewChallenge = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [hasAvaliation, setHasAvaliation] = useState(false);
  const [step, setStep] = useState("tipo");

  const [trails, setTrails] = useState([]);

  const { data: usertype } = useSelector((state) => state.usertype);

  const handleTrails = (trail) => {
    const url = location.pathname;
    const removeCurrentStep = url.split("/");
    removeCurrentStep.pop();

    step !== "trilha-livre" &&
      history.push(removeCurrentStep.join("/") + "/trilha-livre");
    setTrails((prev) => [...prev, { type: trail }]);
  };

  const handleGoToTrail = () => {
    setSuccess(false);
    const url = location.pathname;
    const removeCurrentStep = url.split("/");
    removeCurrentStep.pop();
    history.push(removeCurrentStep.join("/") + "/trilha");
  };

  const handleHasAvaliation = (data) => setHasAvaliation(data);

  const handleStep = (step, data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step);
    window.scrollTo(0, 0);
  };
  const handleGoBack = (step) => {
    if (step) {
      setStep(step);
    } else {
      history.push("/dashboard");
    }
  };

  const handleSubmit = async (step, data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    createChallengeRequest(formData);
  };

  const createChallengeRequest = async (data) => {
    console.log(data);
    const { mentors, skills, assessments, judges } = data;
    const req = dispatch(
      create(usertype, {
        ...data,
        judges: JSON.stringify(judges),
        assessments: JSON.stringify(assessments),
        mentors: JSON.stringify(mentors),
        skills: JSON.stringify(skills),
      })
    );
    await req
      .then((res) => console.log(res))
      .then((res) => {
        toast.success("Desafio criado com sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setSuccess(true);
        console.log(res);
      })
      .catch((error) => {
        toast.error("Algum erro ocorreu ao criar o desafio", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(error);
      });
  };

  return (
    <section className={styles.wrapper}>
      {/* {!(step === "convidar") && ( */}
      <TitleAndBack
        backText={"Voltar"}
        handleGoBack={handleGoBack}
        to={
          (step === "tipo" && `novo-desafio`) ||
          (step === "vaga" && `vaga`) ||
          (step === "desafio" && `desafio`) ||
          (step === "avaliacao" && `avaliacao`)
        }
      />
      {/* )} */}
      <div className={styles.title__container}>
        <Title size={28} className={styles.title}>
          {step === "tipo" && "Qual tipo de desafio você deseja criar?"}
          {step === "job" &&
            `Cadastro de Desafio ${
              formData?.challenge_type === "in_company"
                ? "In Company"
                : "Ultradesafio"
            }`}
          {step === "desafio" &&
            `Cadastro de Desafio ${
              formData?.challenge_type === "in_company"
                ? "In Company"
                : "Ultradesafio"
            }`}
          {step === "avaliação" &&
            `Cadastro de Desafio ${
              formData?.challenge_type === "in_company"
                ? "In Company"
                : "Ultradesafio"
            }`}
          {step === "trilha" && "Qual tipo de conteúdo você deseja adicionar?"}
          {step === "trilha-livre" && "Trilha Livre"}
        </Title>
      </div>
      {/* <form noValidate onSubmit={handleSubmit(onSubmit)}> */}
      {(step === "job" || step === "desafio" || step === "avaliacao") && (
        <Layout style={{ marginTop: 0 }}>
          <Steps>
            {!(formData.challenge_type === "ultradesafio") && (
              <Step
                active={step === "job"}
                // onClick={() => handleStep("job")}
                number={1}
              >
                Vaga
              </Step>
            )}
            <Step
              active={step === "desafio"}
              // onClick={() => handleStep("desafio")}
              number={formData.challenge_type === "ultradesafio" ? 1 : 2}
            >
              Desafio
            </Step>
            {hasAvaliation && (
              <Step
                active={step === "avaliacao"}
                // onClick={() => handleStep("avaliacao")}
                number={formData.challenge_type === "ultradesafio" ? 2 : 3}
              >
                Avaliação
              </Step>
            )}
          </Steps>
        </Layout>
      )}
      {step === "tipo" && (
        <>
          <Type handleStep={handleStep} />
        </>
      )}
      {step === "job" && (
        <Layout style={{ marginTop: 0, padding: 24 }}>
          <Job handleGoBack={handleGoBack} handleStep={handleStep} />
        </Layout>
      )}

      {step === "desafio" && (
        <Layout style={{ marginTop: 0, padding: 24 }}>
          <Challenge
            handleHasAvaliation={handleHasAvaliation}
            hasAvaliation={hasAvaliation}
            handleGoBack={handleGoBack}
            handleStep={handleStep}
            handleSubmit={handleSubmit}
          />
        </Layout>
      )}

      {step === "avaliacao" && (
        <Layout style={{ marginTop: 0, padding: 24 }}>
          <Avaliation
            handleGoBack={handleGoBack}
            handleStep={handleStep}
            handleSubmit={handleSubmit}
          />
        </Layout>
      )}
      {success && (
        <Dialog title={`Desafio criado.`}>
          <Text>
            Percorremos um longo caminho. Agora o próximo passo é criar uma
            trilha para o desafio.
          </Text>
          <ButtonGroup style={{ justifyContent: "center" }}>
            <Button
              // style={{ minWidth: 120 }}
              Tag={"span"}
              type={"green"}
              onClick={() => handleGoToTrail()}
            >
              Vamos nessa
            </Button>
          </ButtonGroup>
        </Dialog>
      )}

      {step === "trilha" && <TrailType handleTrails={handleTrails} />}

      {step === "trilha-livre" && (
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

export { NewChallenge };
