import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { useParams, useHistory, useLocation } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import { AloneOrTeam } from "./components/AloneOrTeam";

import { TeamFormation } from "./components/TeamFormation";
import { TeamSearch } from "./components/TeamSearch";
import { Invites } from "./components/Invites";

import { TitleAndBack } from "components/TitleAndBack";
import { Title } from "components/Text";
import { Input, InputGroup, InputFile } from "components/Inputs";
import { Dialog } from "components/Dialog";
// import { BlueCard, BlueCardContainer } from "components/BlueCard";
import Button from "components/Button";

import { all, subscribe } from "services/challenges";
import { invite } from "services/team";

import styles from "./styles.module.sass";
import "react-toastify/dist/ReactToastify.css";

const Subscription = (props) => {
  const { data: usertype } = useSelector((state) => state.usertype);
  const subscribed = useSelector((state) => state.subscribeChallenge);
  const { data } = useSelector((state) => state.challenges);
  const { control, register, errors, handleSubmit } = useForm();
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
  const { fields, append } = useFieldArray({
    control,
    name: "invites", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id, step } = useParams();
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [aloneDialog, setAloneDialog] = useState(false);
  const [newTeamDialog, setNewTeamDialog] = useState(false);
  // const [newTeamData, setNewTeamData] = useState(false);

  // Fetch
  useEffect(() => {
    dispatch(all(usertype));
    append({ value: "3" }); // temporary
    // console.log(fields)
  }, [dispatch, usertype, append]);

  // choose the right challenge data
  useEffect(() => {
    if (data)
      setCurrentChallenge(
        () => [...data].filter((challenge) => challenge.id === parseInt(id))[0]
      );
  }, [data, id]);

  // keep the team id stored
  useEffect(() => {
    subscribed?.data?.data?.id &&
      window.localStorage.setItem("current_team", subscribed.data.data.id);
  }, [subscribed?.data?.data?.id]);

  const handleAloneDialog = (props) => {
    setAloneDialog((prev) => !prev);
  };

  const handleStep = (props) => {
    const url = location.pathname;
    const removeCurrentStep = url.split("/");
    removeCurrentStep.pop();
    history.push(removeCurrentStep.join("/") + "/" + props);
  };

  const handleAloneOrTeam = () => {};

  const handleNewTeamDialog = (props) => {
    setNewTeamDialog((prev) => !prev);
  };

  const handleAppendInvite = (ids) => {
    console.log(ids.map((item) => `${item}`));
    dispatch(
      invite(usertype, {
        team_id: window.localStorage.getItem("current_team"),
        user_id: ids.toString(),
      })
    )
      .then((res) => console.log(res, "enviado"))
      .then(() =>
        toast.success("Os convites foram enviados", {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      )
      .then(() =>
        history.push(
          `/meus-desafios/${currentChallenge?.challenge_type}/${currentChallenge?.id}`
        )
      )
      .catch((err) => console.log(err));
  };

  const onSubmit = async (data) => {
    console.log(data);
    const req = dispatch(subscribe(usertype, data));
    await req
      .then(() =>
        data.team?.invites?.length
          ? handleStep("convidar")
          : history.push(
              `/meus-desafios/${currentChallenge?.challenge_type}/${currentChallenge?.id}`
            )
      )
      .catch((error) => {
        toast.error("Algum erro ocorreu ao criar entrar no desafio", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(error);
      })
      .then((res) => {
        toast.success("Inscrito com sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(res);
      });
  };

  return (
    <section className={styles.wrapper}>
      {!(step === "convidar") && (
        <TitleAndBack
          data={currentChallenge}
          to={
            (step === "1" && `/desafios/${currentChallenge?.challenge_type}`) ||
            (step === "2" &&
              `/desafios/${currentChallenge?.challenge_type}/inscricao/${currentChallenge?.id}/1`)
          }
        />
      )}
      <div className={styles.title__container}>
        <Title size={28} className={styles.title}>
          {step === "1" && "Como será sua participação?"}
          {step === "2" && "Como será sua participação?"}
          {step === "equipes" && "Em que equipe você quer participar?"}
          {step === "convidar" && "Quem você quer convidar para sua equipe?"}
        </Title>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          name="challenge_id"
          value={id}
          ref={register({ required: true })}
        />
        {step === "1" && (
          <>
            <AloneOrTeam
              handleStep={handleStep}
              handleSelection={handleAloneOrTeam}
              handleAloneDialog={handleAloneDialog}
            />
            {aloneDialog && (
              <Dialog
                title={"Tem certeza?"}
                desc={
                  "Não será possível participar de uma equipe após confirmar esta opção."
                }
              >
                <Button
                  style={{ marginRight: 12 }}
                  Tag="button"
                  type="gray"
                  onClick={() => handleAloneDialog()}
                >
                  Cancelar
                </Button>
                <Button submit Tag="button" type={"tertiary"}>
                  Confirmar
                </Button>
              </Dialog>
            )}
          </>
        )}
        {step === "2" && (
          <>
            <TeamFormation
              handleStep={handleStep}
              handleSelection={handleAloneOrTeam}
              handleNewTeamDialog={handleNewTeamDialog}
            />
            {newTeamDialog && (
              <Dialog
                header={"Criar uma equipe"}
                handleClose={handleNewTeamDialog}
              >
                {fields.map((field, index) => {
                  // console.log(field);
                  return (
                    <input
                      type="hidden"
                      key={field.id} // important to include key with field's id
                      defaultValue={field.value} // make sure to include defaultValue
                      ref={register()}
                      name={`team[invites][${index}]`}
                    />
                  );
                })}
                {/* <input
                  type="hidden"
                  name="team[invites][1]"
                  value={3}
                  ref={register({ required: true })}
                /> */}
                <InputGroup>
                  <Input
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage={"Digite o nome da equipe para continuar"}
                    placeholder={"Digite o nome da equipe"}
                    name={"team[name]"}
                  >
                    Nome do time
                  </Input>
                </InputGroup>
                <InputGroup>
                  <InputFile
                  // ref={register({required: true})}
                  // errors={errors}
                  // name={'team[name]'}
                  >
                    Capa da equipe
                  </InputFile>
                </InputGroup>
                <Button
                  Tag="button"
                  type="gray"
                  style={{ marginRight: 12 }}
                  onClick={() => handleNewTeamDialog()}
                >
                  Cancelar
                </Button>
                <Button
                  // disabled={!(newTeamData?.team?.name?.length > 3)}
                  submit
                  Tag="button"
                  type={"tertiary"}
                  // onClick={() =>
                  //   newTeamData?.team?.name?.length > 3 &&
                  //   handleStep("convidar")
                  // }
                >
                  Confirmar
                </Button>
              </Dialog>
            )}
          </>
        )}
        {step === "equipes" && (
          <>
            <TeamSearch />
          </>
        )}
        {step === "convidar" && (
          <>
            <Invites
              handleAppendInvite={handleAppendInvite}
              usertype={usertype}
              id={window.localStorage.getItem("current_team")}
            />
          </>
        )}
        <ToastContainer />
      </form>
    </section>
  );
};

export { Subscription };
