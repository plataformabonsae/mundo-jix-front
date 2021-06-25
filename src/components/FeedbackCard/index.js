import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
import { Title, Text } from "components/Text";
// import { Dot } from "components/Dot";
import Button from "components/Button";
import { InputGroup, Textarea } from "components/Inputs";
import { comment, getOne, create, get, reset } from "services/feedbacks";

import { ModalPage } from "components/ModalPage";

import profile from "assets/logo/JixProfile.png";

import * as colors from "utils/styles/Colors";

import styles from "./styles.module.sass";
import { BASEURL } from "utils/api";
// import { Item } from "containers/private/Challenge/components/Infos";

const FeedbackCard = (props) => {
  const { data, challengeId, projectId } = props;
  const [modal, setModal] = useState(false);

  const handleModal = () => setModal((prev) => !prev);

  return (
    <>
      <Card noShadow>
        <header className={styles.header}>
          <Title size={16}>
            {/* <Dot color={colors.ERROR} />  */}
            {data?.mentor?.name} {data?.mentor?.last_name}
          </Title>
          <Text size={14} color={colors.MEDIUM_GRAY}>
            {data.created_at}
          </Text>
        </header>
        <Text size={14} color={colors.MEDIUM_GRAY}>
          {data?.challenge?.name}
        </Text>
        <Text className={styles.feedback} size={14} style={{ marginTop: 12 }}>
          {data?.feedback?.substring(0, 200)}...
        </Text>
        <Button
          Tag="button"
          onClick={() => handleModal()}
          style={{
            color: colors.DARK_GRAY,
            paddingLeft: 0,
            fontSize: 14,
          }}
          transparent
        >
          {props.buttonText || "Visualizar"}
        </Button>
      </Card>
      {modal && (
        <Modal
          handleModal={handleModal}
          data={data}
          challengeId={challengeId}
          projectId={projectId}
        />
      )}
    </>
  );
};

const Modal = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { data, challengeId, projectId } = props;
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: user } = useSelector((state) => state.user);
  const { current: feedback, loading } = useSelector(
    (state) => state.feedbacks
  );
  // const { data: usertype } = useSelector(state => state.usertype)

  useEffect(() => {
    dispatch(
      getOne(usertype, { challenge_id: challengeId, feedback_id: data.id })
    );
    return dispatch(reset());
  }, [data?.id, usertype, challengeId, dispatch]);

  const onSubmit = async (data) => {
    console.log(challengeId, projectId, data.feedback_id);
    Promise.all([
      dispatch(comment(usertype, data)),
      dispatch(
        getOne(usertype, {
          challenge_id: challengeId,
          feedback_id: data.feedback_id,
        })
      ),
    ])
      .then((res) => {
        toast.success("Comentário enviado", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(res);
      })
      .catch((error) => {
        toast.error("Algum erro ocorreu ao enviar o comentário", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(error);
      });
  };

  return (
    <ModalPage title={"Feedback"} handleClose={props.handleModal}>
      {loading && <Loading />}
      <article className={styles.modal}>
        <Card>
          <header className={styles.header}>
            <Title size={16}>
              {data.mentor.name} {data?.mentor?.last_name}
            </Title>
            <Text size={14} color={colors.MEDIUM_GRAY}>
              {data.created_at}
            </Text>
          </header>
          <Text size={14} color={colors.MEDIUM_GRAY}>
            {data?.challenge?.name}
          </Text>
          <Text size={14} style={{ marginTop: 12 }}>
            {data?.feedback}
          </Text>
        </Card>
        <div className={styles.comments}>
          {loading && <Loading />}
          {!!feedback?.feedback?.feedbackposts?.length &&
            feedback.feedback.feedbackposts.map((item) => (
              <Comment data={item} />
            ))}
        </div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            ref={register()}
            name={"challenge_id"}
            value={challengeId}
          />
          <input
            type="hidden"
            ref={register()}
            name={"project_id"}
            value={projectId}
          />
          <input
            type="hidden"
            ref={register()}
            name={"feedback_id"}
            value={data.id}
          />
          <input
            type="hidden"
            ref={register()}
            name={"user_id"}
            value={user?.user?.id}
          />
          <InputGroup>
            <label className={styles.label}>
              <Title size={18}>Comente o feedback</Title>
              <Textarea
                // disabled={loading}
                ref={register()}
                name="feedback_post"
                // onChange={handleCountChar}
                // errors={errors}
                rows="7"
                errorMessage="Descreva sua solução"
                placeholder="Descreva sua solução"
              />
            </label>
          </InputGroup>
          <div style={{ textAlign: "right" }}>
            <Button submit Tag="button" type={"green"}>
              Enviar
            </Button>
          </div>
        </form>
      </article>
    </ModalPage>
  );
};

const Comment = (props) => (
  <article className={styles.comment}>
    <img
      src={props.data?.user?.file ? BASEURL + props.data?.user?.file : profile}
      alt="imagem"
    />
    <div className={styles.comment__content}>
      <header className={styles.header}>
        <Title size={16}>
          {props.data?.user?.name} {props.data?.user?.last_name}
        </Title>
        <Text size={14} color={colors.MEDIUM_GRAY}>
          {props.data?.created_at}
        </Text>
      </header>
      <Text size={14}>{props.data?.feedback_post}</Text>
    </div>
  </article>
);

const CreateFeedback = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { challengeId, projectId } = props;
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.feedbacks);
  // const { data: usertype } = useSelector(state => state.usertype)

  const onSubmit = async (data) => {
    console.log(challengeId, projectId);
    await dispatch(create(usertype, data))
      .then((res) => {
        toast.success("Feedback enviado", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(res);
      })
      .then(() => props.handleModal())
      .catch((error) => {
        toast.error("Algum erro ocorreu ao enviar o feedback", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(error);
      });
    dispatch(
      get(usertype, { challenge_id: challengeId, project_id: projectId })
    );
  };

  return (
    <ModalPage title={"Feedback"} handleClose={props.handleModal}>
      {loading && <Loading />}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          ref={register()}
          name={"challenge_id"}
          value={challengeId}
        />
        <input
          type="hidden"
          ref={register()}
          name={"project_id"}
          value={projectId}
        />
        <input
          type="hidden"
          ref={register()}
          name={"mentor_id"}
          value={user?.user?.id}
        />
        <InputGroup>
          <label className={styles.label}>
            <Title size={18}>Comente o feedback</Title>
            <Textarea
              // disabled={loading}
              ref={register()}
              name="feedback"
              // onChange={handleCountChar}
              // errors={errors}
              rows="7"
              errorMessage="Descreva sua solução"
              placeholder="Descreva sua solução"
            />
          </label>
        </InputGroup>
        <div style={{ textAlign: "right" }}>
          <Button submit Tag="button" type={"green"}>
            Enviar
          </Button>
        </div>
      </form>
    </ModalPage>
  );
};

export { FeedbackCard, CreateFeedback };
