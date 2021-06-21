import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import YouTube from "react-youtube";
import parse from "html-react-parser";

import { Loading } from "components/Loading";
import { Dialog } from "components/Dialog";
import Button from "components/Button";

import right from "assets/components/Trail/right.svg";
import wrong from "assets/components/Trail/wrong.svg";

import { question, answer } from "services/trail";

import { Title, Text } from "components/Text";
// import { TrilhaItem } from "./components/TrilhaItem";

import styles from "./styles.module.sass";

const Question = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const { current, loading } = useSelector((state) => state.trail);
  const { data: usertype } = useSelector((state) => state.usertype);
  const [response, setResponse] = useState();
  const [choice, setChoice] = useState();
  const [comment, setComment] = useState();
  const [dialog, setDialog] = useState(false);
  // const { type, id, trail_type, trail_id } = useParams();

  useEffect(() => {
    dispatch(
      question(usertype, { id: item.id, type: item.type === "normal" ? 0 : 1 })
    );
  }, [dispatch, usertype, item]);

  useEffect(() => {
    props.previewData(current);
  }, [current, props]);

  const handleSetAnswer = (answer_id) => setChoice(answer_id);

  const handleSendAnswer = (answer_id) =>
    dispatch(answer(usertype, { id: item.id, answer_id })).then((res) => {
      setResponse(res.data.data.result);
      setComment(res.data.data.option.comment);
      console.log(res);
      setDialog(true);
    });

  const handleDialog = () => setDialog((prev) => !prev);

  const opts = {
    height: "100%",
    width: "100%'",
  };

  return (
    <>
      {loading && <Loading />}
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Title size={18}>{current?.question?.name}</Title>
          <Text style={{ marginTop: 12 }}>
            {current?.question?.description}
          </Text>
          <div className={styles.options}>
            {current?.question?.options.map((item, index) => (
              <div
                className={styles.option}
                onClick={() => handleSetAnswer(item.id)}
              >
                <span
                  className={`${styles.number} ${
                    choice === item.id && styles.number__checked
                  }`}
                >
                  {item.number || item.letter}
                </span>
                <Text>{item.description}</Text>
              </div>
            ))}
          </div>
          <Button
            Tag="span"
            type="green"
            disabled={!choice}
            onClick={() => handleSendAnswer(choice)}
          >
            Enviar
          </Button>
        </div>
        {dialog && (
          <Dialog header={"Resultado"} handleClose={handleDialog}>
            <img src={response ? right : wrong} alt="" />
            <Title style={{ marginTop: 32 }}>
              Resposta {response ? "correta" : "incorreta"}!
            </Title>
            <Text style={{ marginBottom: 32, marginTop: 16 }}>
              {!!comment && parse(comment)}
            </Text>
            <Button type="secondary" Tag="span" onClick={() => handleDialog()}>
              Finalizar
            </Button>
          </Dialog>
        )}
      </div>
    </>
  );
};

export { Question };
