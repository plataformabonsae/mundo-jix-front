import React, { useState } from "react";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import { Dot } from "components/Dot";
import Button from "components/Button";
import {
  // Input,
  InputGroup,
  // InputFile,
  Textarea,
  // AddGroup,
  // RemoveGroup,
  // SelectInput,
} from "components/Inputs";

import { ModalPage } from "components/ModalPage";

import profile from "assets/logo/JixProfile.png";

import * as colors from "utils/styles/Colors";

import styles from "./styles.module.sass";

const FeedbackCard = (props) => {
  const [modal, setModal] = useState(false);

  const handleModal = () => setModal((prev) => !prev);
  return (
    <>
      <Card noShadow>
        <header className={styles.header}>
          <Title size={16}>
            <Dot color={colors.ERROR} /> Mentor tal
          </Title>
          <Text size={14} color={colors.MEDIUM_GRAY}>
            03 / Dez
          </Text>
        </header>
        <Text size={14} color={colors.MEDIUM_GRAY}>
          Nome da empresa {`>>`} Nome do desafio{" "}
        </Text>
        <Text size={14} style={{ marginTop: 12 }}>
          Etiam et sapien a massa lacinia ultricies. Morbi posuere ultricies
          vulputate. Nulla pellentesque laoreet nunc, dictum...
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
        <ModalPage title={"Feedback"} handleClose={handleModal}>
          <article className={styles.modal}>
            <Card>
              <header className={styles.header}>
                <Title size={16}>Mentor tal</Title>
                <Text size={14} color={colors.MEDIUM_GRAY}>
                  03 / Dez
                </Text>
              </header>
              <Text size={14} color={colors.MEDIUM_GRAY}>
                Nome da empresa {`>>`} Nome do desafio{" "}
              </Text>
              <Text size={14} style={{ marginTop: 12 }}>
                Etiam et sapien a massa lacinia ultricies. Morbi posuere
                ultricies vulputate. Nulla pellentesque laoreet nunc,
                dictumultricies vulputate. Nulla pellentesque laoreet nunc,
                dictumultricies vulputate. Nulla pellentesque laoreet nunc,
                dictumultricies vulputate. Nulla pellentesque laoreet nunc,
                dictumultricies vulputate. Nulla pellentesque laoreet nunc,
                dictumultricies vulputate. Nulla pellentesque laoreet nunc,
                dictumultricies vulputate. Nulla pellentesque laoreet nunc,
                dictum.
              </Text>
            </Card>
            <div className={styles.comments}>
              <Comment />
              <Comment />
              <Comment />
            </div>
            <InputGroup>
              <label className={styles.label}>
                <Title size={18}>Comente o feedback</Title>
                <Textarea
                  // disabled={loading}
                  // ref={register({ required: true })}
                  name="description"
                  // onChange={handleCountChar}
                  // errors={errors}
                  rows="7"
                  errorMessage="Descreva sua solução"
                  placeholder="Descreva sua solução"
                />
              </label>
            </InputGroup>
            <div style={{ textAlign: "right" }}>
              <Button Tag="span" type={"green"}>
                Enviar
              </Button>
            </div>
          </article>
        </ModalPage>
      )}
    </>
  );
};

const Comment = (props) => (
  <article className={styles.comment}>
    <img src={profile} alt="imagem" />
    <div className={styles.comment__content}>
      <header className={styles.header}>
        <Title size={16}>Pessoa tal</Title>
        <Text size={14} color={colors.MEDIUM_GRAY}>
          03 / Dez
        </Text>
      </header>
      <Text size={14}>
        Etiam et sapien a massa lacinia ultricies. Morbi posuere ultricies
        vulputate. Nulla pellentesque laoreet nunc, dictumultricies vulputate.
        Nulla pellentesque laoreet nunc, dictumultricies vulputate.
      </Text>
    </div>
  </article>
);

export { FeedbackCard };
