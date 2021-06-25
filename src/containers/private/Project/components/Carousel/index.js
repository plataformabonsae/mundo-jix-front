import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import YouTube from "react-youtube";
import { toast } from "react-toastify";

import { Card } from "components/Card";
import { ProfileCard } from "components/ProfileCard";
import { Dialog } from "components/Dialog";
import { FeedbackCard, CreateFeedback } from "components/FeedbackCard";
import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs";
import Button from "components/Button";
import { WindowSize } from "utils/etc";

import profileDefault from "assets/logo/JixProfile.png";
import guardia from "assets/components/ProfileCard/guardia.svg";
import material from "assets/components/Project/material.svg";
import link from "assets/icons/link-black.svg";

import chrevron from "assets/components/Project/chevron.svg";

import * as colors from "utils/styles/Colors";

import { BASEURL } from "utils/api";

import { get } from "services/project";
import { kick, leave, transfer } from "services/team";
import { get as getFeedbacks } from "services/feedbacks";

import styles from "./styles.module.sass";

SwiperCore.use([Navigation]);

const Carousel = (props) => {
  const { width } = WindowSize();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("meu-projeto");
  const [modalFeedback, setModalFeedback] = useState(false);
  const { data: feedbacks } = useSelector((state) => state.feedbacks);
  const { data: user } = useSelector((state) => state.user);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data } = props;
  const { type, id } = useParams();

  useEffect(() => {
    dispatch(
      getFeedbacks(usertype, {
        challenge_id: id,
        project_id: data?.project?.id,
      })
    );
  }, [data?.project?.id, id, dispatch, usertype]);

  const opts = {
    height: "460",
    width: "100%'",
  };
  const small = {
    height: "190",
    width: "100%'",
  };

  const isKeeper = props.keeper !== user?.user?.id;

  const handleOnReady = () => {
    // console.log("onready yt video");
  };

  const handleModalFeedback = () => {
    setModalFeedback((prev) => !prev);
  };

  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className={styles.carousel}>
      <header className={styles.header}>
        <div className={styles.header__links}>
          <TabFlat
            active={activeTab === "meu-projeto"}
            Tag="span"
            onClick={() => handleTabs("meu-projeto")}
          >
            {user?.user?.is_mentor || user?.user?.is_judge
              ? "Projeto"
              : "Meu projeto"}
          </TabFlat>
          {data?.team && (
            <TabFlat
              active={activeTab === "equipe"}
              Tag="span"
              onClick={() => handleTabs("equipe")}
            >
              Equipe
            </TabFlat>
          )}

          <TabFlat
            active={activeTab === "feedbacks"}
            Tag="span"
            onClick={() => handleTabs("feedbacks")}
          >
            Feedback
          </TabFlat>
          {!user?.user?.is_mentor && (
            <TabFlat
              active={activeTab === "avaliacao"}
              Tag="span"
              onClick={() => handleTabs("avaliacao")}
            >
              Avaliação
            </TabFlat>
          )}
        </div>
        {(user?.user?.is_mentor || user?.user?.is_judge) &&
        activeTab === "feedbacks" ? (
          <Button
            Tag="span"
            type={"tertiary"}
            onClick={() => handleModalFeedback()}
          >
            Enviar feedback
          </Button>
        ) : null}
        {user?.user?.is_mentor || user?.user?.is_judge || usertype === "empresa"
          ? null
          : activeTab === "meu-projeto" &&
            (isKeeper || !data?.team) && (
              <Button
                Tag="span"
                type={"tertiary"}
                onClick={() => props.modal()}
              >
                Editar projeto
              </Button>
            )}
        {user?.user?.is_mentor ||
        user?.user?.is_judge ||
        data?.guardian?.id !== user?.user?.id
          ? null
          : activeTab === "equipe" && (
              <>
                {data?.teammates?.length < 4 ? (
                  <Button
                    type={"tertiary"}
                    to={`/desafios/${type}/inscricao/${id}/convidar`}
                  >
                    Convidar participante
                  </Button>
                ) : (
                  <Text>Seu time está completo</Text>
                )}
              </>
            )}
      </header>
      {activeTab === "meu-projeto" && (
        <Card border noShadow>
          <div className={styles.videos}>
            <style>
              {`
              .swiper-button-next {
                position: absolute;
                text-align: center;
                z-index: 2;
                width: 50px;
                bottom: 0;
                top: 0;
                right: 0;
                background: rgb(228, 229, 231);
                cursor: pointer;
              }

              .swiper-button-next::before {
                content: '';
                display: inline-block;
                position: absolute;
                z-index: 3;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                transform: translate(-50%, -50%);
                background-image: url(${chrevron});
                background-repeat: no-repeat;
                object-fit: cover;
              }
              
              .swiper-button-prev {
                position: absolute;
                z-index: 2;
                text-align: center;
                width: 50px;
                bottom: 0;
                top: 0;
                left: 0;
                background: rgb(228, 229, 231);
                cursor: pointer;
              }

              .swiper-button-prev::before {
                content: '';
                display: inline-block;
                position: absolute;
                z-index: 3;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                transform: translate(-50%, -50%) rotate(180deg);
                background-image: url(${chrevron});
                background-repeat: no-repeat;
                object-fit: cover;
              }
              `}
            </style>
            {data?.project?.videos?.length ? (
              <Swiper
                navigation
                observer={activeTab}
                spaceBetween={0}
                slidesPerView={1}
              >
                {data?.project?.videos?.map(
                  (item) =>
                    item.link && (
                      <SwiperSlide key={item.id}>
                        <div style={{ padding: "0 50px" }}>
                          <YouTube
                            videoId={item.link.split("v=")[1]}
                            opts={width > 762 ? opts : small}
                            onReady={handleOnReady}
                          />
                        </div>
                      </SwiperSlide>
                    )
                )}
              </Swiper>
            ) : (
              <>Sem pitch cadastrado</>
            )}
          </div>
          <div className={styles.content}>
            <section className={styles.desc}>
              <Title className={styles.title} size={18}>
                {data?.project?.name}
              </Title>
              <div className={styles.desc__title}>Descrição</div>
              <div className={styles.forcefont}>
                {data?.project?.description &&
                  parse(data?.project?.description)}
              </div>
            </section>
            <section className={styles.downloads}>
              <Title size={18}>Materiais anexados</Title>
              <div className={styles.downloads__wrapper}>
                {data?.project?.materials?.length > 0 &&
                  data?.project?.materials.map((item) => (
                    <a
                      href={BASEURL + item.file}
                      rel="noreferrer"
                      target={"_blank"}
                      className={styles.downloads__material}
                    >
                      <img src={material} alt="Download de material" />
                      {item.filename}
                    </a>
                  ))}
                {data?.project?.materials?.length === 0 &&
                  "Sem materiais cadastrados"}
              </div>
              <Title style={{ marginTop: 32 }} size={18}>
                Links anexados
              </Title>
              <div className={styles.downloads__wrapper}>
                {data?.project?.links?.length > 0 &&
                  data?.project?.links.map((item) => (
                    <a
                      href={item.link}
                      rel="noreferrer"
                      target={"_blank"}
                      className={styles.downloads__material}
                    >
                      <img src={link} alt="Link" />
                      {item.link}
                    </a>
                  ))}
                {data?.project?.links?.length === 0 && "Sem links cadastrados"}
              </div>
            </section>
          </div>
        </Card>
      )}
      {activeTab === "equipe" && (
        <section className={styles.equipe}>
          <Card noShadow border>
            <Title style={{ marginBottom: 32 }}>Time {data?.team?.name}</Title>
            {!!data?.guardian && (
              <TeamIntegrant
                teamId={data?.team?.id}
                challengeId={data?.challenge?.id}
                key={data.guardian.id}
                data={data.guardian}
                keeper={data.guardian}
              />
            )}
            {!!data?.teammates &&
              [...data?.teammates].map((item) => (
                <TeamIntegrant
                  // accepted={item.pivot.is_effected}
                  challengeId={data?.challenge?.id}
                  accepted={true}
                  teamId={data?.team?.id}
                  key={item.id}
                  data={item}
                />
              ))}
            {data?.team?.users?.map((item) => (
              <TeamIntegrant
                // accepted={item.pivot.is_effected}
                challengeId={data?.challenge?.id}
                accepted={true}
                teamId={data?.team?.id}
                key={item.id}
                data={item}
              />
            ))}
            {/* data?.teammates?.map((item) => console.log(item, "otros"))} */}
          </Card>
        </section>
      )}
      {activeTab === "feedbacks" && (
        <section className={styles.feedbacks}>
          {/* {console.log(feedbacks.challenge.id)} */}
          {feedbacks?.feedbacks?.map((item) => (
            <FeedbackCard
              challengeId={feedbacks?.challenge?.id}
              projectId={feedbacks?.project?.id}
              key={item.id}
              data={item}
              buttonText={"Visualizar"}
            />
          ))}
          {feedbacks?.feedbacks?.length === 0 && "Sem feedbacks ainda"}
        </section>
      )}
      {activeTab === "avaliacao" && (
        <section className={styles.avaliacao}>
          <Card noShadow border>
            <section className={styles.avaliacao__content}>
              <section className={styles.avaliacao__grades}>
                <Title
                  size={16}
                  style={{
                    textAlign: "center",
                    marginBottom: 24,
                    textTransform: "uppercase",
                  }}
                >
                  Notas
                </Title>
                <Card className={styles.avaliacao__card} noShadow border>
                  <Title>Materia</Title>
                  <Title>6</Title>
                </Card>
                <Card className={styles.avaliacao__card} noShadow border>
                  <Title>Materia</Title>
                  <Title>6</Title>
                </Card>
                <Card className={styles.avaliacao__card} noShadow border>
                  <Title>Materia</Title>
                  <Title>6</Title>
                </Card>
                <Card className={styles.avaliacao__card} noShadow border>
                  <Title>Materia</Title>
                  <Title>6</Title>
                </Card>
                <Card className={styles.avaliacao__card} noShadow border>
                  <Title>Materia</Title>
                  <Title>6</Title>
                </Card>
              </section>
              <section className={styles.avaliacao__total}>
                <Title
                  size={16}
                  style={{
                    textAlign: "center",
                    marginBottom: 24,
                    textTransform: "uppercase",
                  }}
                >
                  Média
                </Title>
                <Title
                  style={{ textAlign: "center", marginBottom: 24 }}
                  size={180}
                >
                  6
                </Title>
                <Title
                  size={16}
                  style={{
                    color: colors.MEDIUM_GRAY,
                    textAlign: "center",
                    marginBottom: 24,
                  }}
                >
                  Feedback
                </Title>
                <Text>
                  Etiam et sapien a massa lacinia ultricies. Morbi posuere
                  ultricies vulputate. Nulla pellentesque laoreet nunc, dictum.
                  Etiam et sapien a massa lacinia ultricies. Morbi posuere
                  ultricies vulputate. Nulla pellentesque laoreet nunc, dictum.
                  Morbi posuere ultricies vulputate. Nulla pellentesque laoreet
                  nunc, dictum.
                </Text>
              </section>
            </section>
          </Card>
        </section>
      )}
      {modalFeedback && (
        <CreateFeedback
          handleModal={handleModalFeedback}
          challengeId={data?.challenge?.id}
          projectId={data?.project?.id}
        />
      )}
    </section>
  );
};

const TeamIntegrant = (props) => {
  const { data, accepted, challengeId } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [kickIntegrant, setKickIntegrant] = useState(false);
  const [leaveIntegrant, setLeaveIntegrant] = useState(false);
  const [transferIntegrant, setTransferIntegrant] = useState(false);
  const { data: user } = useSelector((state) => state.user);
  const { data: project, loading } = useSelector((state) => state.project);
  const { data: usertype } = useSelector((state) => state.usertype);

  const handleModal = () => {
    setModal((prev) => !prev);
    setKickIntegrant(false);
    setLeaveIntegrant(false);
    setTransferIntegrant(false);
  };

  const handleTransfer = async () => {
    const fetch = dispatch(
      transfer(usertype, { team_id: props.teamId, user_id: data.id })
    );
    const update = dispatch(get(usertype, { challenge_id: challengeId }));
    fetch
      .then(() => update)
      .then((res) => {
        toast.success(`${data.name} agora é guardião`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(res);
      })
      .then(() => handleModal())
      .catch((error) => {
        toast.error("Algum erro ocorreu ao expulsar", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const handleKick = () => {
    const fetch = dispatch(
      kick(usertype, { team_id: props.teamId, user_id: data.id })
    );
    const update = dispatch(get(usertype, { challenge_id: challengeId }));
    fetch
      .then(() => update)
      .then((res) => {
        toast.success("Usuário expulso com sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(res);
      })
      .then(() => handleModal())
      .catch((error) => {
        toast.error("Algum erro ocorreu ao expulsar", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(error);
      });
  };

  const handleLeave = () => {
    const fetch = dispatch(
      leave(usertype, { team_id: props.teamId, user_id: data.id })
    );
    const update = dispatch(get(usertype, { challenge_id: challengeId }));
    fetch
      .then(() => update)
      .then((res) => {
        toast.success("Saiu da equipe com sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(res);
      })
      .then(() => handleModal())
      .then(() => history.push("/dashboard"))
      .catch((error) => {
        toast.error("Algum erro ocorreu ao sair da equipe", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(error);
      });
  };

  const iAmKepper = project?.guardian?.id === user?.user?.id;
  const isMe = data.id === user?.user?.id;

  return (
    <>
      <Card
        border
        noShadow
        className={styles.integrant}
        style={{ opacity: !props.keeper && !accepted && 0.4 }}
      >
        <div className={styles.integrant__content}>
          <div className={styles.integrant__image}>
            <img
              className={styles.integrant__image__profile}
              src={data?.file !== null ? BASEURL + data?.file : profileDefault}
              alt={"Integrante do time"}
            />
            {props.keeper && (
              <img
                className={styles.integrant__image__keeper}
                src={guardia}
                alt={"Integrante do time"}
              />
            )}
          </div>
          <div>
            <Title size={16}>
              {data?.name} {!!data?.last_name && data?.last_name}
            </Title>
            <Text size={14}>
              {data?.skills?.map(
                (item, index) => `${!!index ? " •" : ""} ${item.title}`
              )}
            </Text>
          </div>
        </div>
        {(props.keeper || !!accepted) && (
          <Button
            onClick={() => handleModal()}
            Tag={"button"}
            style={{ background: "transparent" }}
            type={"transparent"}
          >
            Ver mais
          </Button>
        )}
      </Card>
      {modal && (
        <Dialog header={"Informações do integrante"} handleClose={handleModal}>
          {!kickIntegrant && !leaveIntegrant && !transferIntegrant && (
            <>
              <div style={{ overflow: "initial" }}>
                <ProfileCard keeper={props.keeper} data={data} border={false} />
              </div>
              {isMe && !props.keeper && (
                <div className={styles.integrant__buttons}>
                  <span
                    onClick={() => setLeaveIntegrant(data)}
                    className={styles.integrant__button}
                    style={{ fontSize: 12, color: colors.ERROR }}
                  >
                    Sair da equipe
                  </span>
                </div>
              )}
              {isMe && props.keeper && (
                <>
                  <Text size={14}>
                    Você precisa escolher outro integrante para ser guardião
                    antes de sair da equipe.
                  </Text>
                  <div className={styles.integrant__buttons}>
                    <span
                      className={styles.integrant__button}
                      style={{
                        fontSize: 12,
                        color: colors.ERROR,
                        opacity: 0.4,
                        cursor: "default",
                      }}
                    >
                      Sair da equipe
                    </span>
                  </div>
                </>
              )}
            </>
          )}
          {kickIntegrant && (
            <>
              <Title>Confirmação</Title>
              <Text style={{ margin: "12px 0" }}>
                Tem certeza que deseja expulsar {data?.name} da equipe?
              </Text>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  style={{ minWidth: 100 }}
                  type={"secondary"}
                  Tag={"span"}
                  onClick={() => handleModal()}
                >
                  Cancelar
                </Button>
                <Button
                  style={{ minWidth: 100 }}
                  type={"green"}
                  Tag={"span"}
                  onClick={() => handleKick(data)}
                >
                  Expulsar
                </Button>
              </div>
            </>
          )}
          {leaveIntegrant && (
            <>
              <Title>Confirmação</Title>
              <Text style={{ margin: "12px 0" }}>
                Tem certeza que sair da equipe?
              </Text>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  style={{ minWidth: 100 }}
                  type={"secondary"}
                  Tag={"span"}
                  onClick={() => handleModal()}
                >
                  Cancelar
                </Button>
                <Button
                  style={{ minWidth: 100 }}
                  type={"green"}
                  Tag={"span"}
                  onClick={() => handleLeave(data)}
                >
                  Sair
                </Button>
              </div>
            </>
          )}
          {transferIntegrant && (
            <>
              <Title>Confirmação</Title>
              <Text style={{ margin: "12px 0" }}>
                Tem certeza que deseja transferir o guardião para {data?.name}?
              </Text>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  style={{ minWidth: 100 }}
                  type={"secondary"}
                  Tag={"span"}
                  onClick={() => handleModal()}
                >
                  Cancelar
                </Button>
                <Button
                  style={{ minWidth: 100 }}
                  type={"green"}
                  Tag={"span"}
                  onClick={() => handleTransfer(data)}
                >
                  Transferir
                </Button>
              </div>
            </>
          )}
          {!kickIntegrant &&
            !leaveIntegrant &&
            !transferIntegrant &&
            !isMe &&
            iAmKepper && (
              <div className={styles.integrant__buttons}>
                <span
                  className={styles.integrant__button}
                  style={{ fontSize: 12, color: colors.LIGHT_BLACK }}
                  onClick={() => setTransferIntegrant((prev) => !prev)}
                >
                  Tornar Guardião
                </span>
                <span
                  onClick={() => {
                    setKickIntegrant((prev) => !prev);
                  }}
                  className={styles.integrant__button}
                  style={{ fontSize: 12, color: colors.ERROR }}
                >
                  Excluir participante
                </span>
              </div>
            )}
        </Dialog>
      )}
    </>
  );
};
export { Carousel };
