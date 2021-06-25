import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { useParams, useHistory, useLocation } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

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

import { create } from "services/newChallenge";

const NewChallenge = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [hasAvaliation, setHasAvaliation] = useState(false);

  const [trails, setTrails] = useState([]);

  const { data: usertype } = useSelector((state) => state.usertype);

  const { step } = useParams();

  useState(() => {
    console.log(trails, "trails");
  }, [trails]);

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
    const url = location.pathname;
    const removeCurrentStep = url.split("/");
    removeCurrentStep.pop();
    history.push(removeCurrentStep.join("/") + "/" + step);
    setFormData((prev) => ({ ...prev, ...data }));
  };
  const handleGoBack = (step) => {
    if (step) {
      const url = location.pathname;
      const removeCurrentStep = url.split("/");
      removeCurrentStep.pop();
      history.push(removeCurrentStep.join("/") + "/" + step);
    } else {
      history.push("/dashboard");
    }
  };

  const handleSubmit = async (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setSuccess(true);
    const req = dispatch(create(usertype, formData));
    await req
      .then((res) => console.log(res))
      .then((res) => {
        toast.success("Desafio criado com sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
        to={
          (step === "tipo" && `/novo-desafio`) ||
          (step === "vaga" && `/novo-desafio/vaga`) ||
          (step === "desafio" && `/novo-desafio/desafio`) ||
          (step === "avaliacao" && `/novo-desafio/avaliacao`)
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
            <Step
              active={step === "job"}
              // onClick={() => handleStep("job")}
              number={1}
            >
              Vaga
            </Step>
            <Step
              active={step === "desafio"}
              // onClick={() => handleStep("desafio")}
              number={2}
            >
              Desafio
            </Step>
            {hasAvaliation && (
              <Step
                active={step === "avaliacao"}
                // onClick={() => handleStep("avaliacao")}
                number={3}
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
          <Avaliation handleGoBack={handleGoBack} handleSubmit={handleSubmit} />
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
