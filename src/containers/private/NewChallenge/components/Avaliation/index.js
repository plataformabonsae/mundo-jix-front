import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
import { Title, Text } from "components/Text";
import { InputGroup, Input, AddGroup, RemoveGroup } from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import "react-toastify/dist/ReactToastify.css";

const Avaliation = ({
  noShadow = true,
  handleStep,
  handleGoBack,
  handleSubmit: handleSubmitData,
}) => {
  const [assessments, setAssessments] = useState([]);
  const [judges, setJudges] = useState([]);
  const [password, setPassword] = useState([]);

  const { loading } = useSelector((state) => state.cep);
  const { register, errors, control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    handleSubmitData(data);
  };

  const marginTitulo = {
    marginBottom: 32,
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Sobre a avaliação</Title>
          {assessments.map((item, index) => {
            return (
              <InputGroup key={index}>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    O que deseja avaliar?
                  </Title>
                  <Input
                    // defaultValue={social.link}
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage="Digite o critério que deseja avaliar"
                    name={`assessments.${index}.evaluate`}
                    placeholder="Digite o critério que deseja avaliar"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Nota máxima {index + 1}
                  </Title>
                  <Input
                    // defaultValue={social.platform}
                    ref={register({ required: true })}
                    name={`assessments.${index}.max_grade`}
                    control={control}
                    errors={errors}
                    errorMessage="Nota máxima"
                    placeholder="Digite a nota máxima"
                  ></Input>
                </div>
              </InputGroup>
            );
          })}

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setAssessments((prev) => [...prev, prev++])}
              text="Adicionar critério"
            />
            {assessments?.length > 1 && (
              <RemoveGroup
                onClick={() =>
                  setAssessments((state) => [...state].slice(0, -1))
                }
                text="Remover critério"
              />
            )}
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Pessoas juradas</Title>

          {judges.map((social, index) => {
            return (
              <InputGroup key={index}>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Nome do jurado {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.link}
                    ref={register({
                      required: { value: true, message: "Obrigatório" },
                    })}
                    errors={errors}
                    validate={errors?.judges?.[index]?.name?.message}
                    name={`judges.${index}.name`}
                    placeholder="Nome do mentor"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    E-mail do jurado {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.platform}
                    ref={register({
                      required: {
                        value: true,
                        message: "Obrigatório",
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Digite um e-mail válido",
                      },
                    })}
                    name={`judges.${index}.email`}
                    control={control}
                    errors={errors}
                    validate={errors?.judges?.[index]?.email?.message}
                    errorMessage="E-mail do mentor"
                    placeholder="E-mail do mentor"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Senha do jurado {index + 1}
                  </Title>
                  <Input
                    defaultValue={""}
                    ref={register({
                      required: {
                        value: true,
                        message: "Obrigatório",
                      },
                      minLength: {
                        value: 8,
                        message: "Digite pelo menos 8 caracteres.",
                      },
                    })}
                    errors={errors}
                    onChange={(e) =>
                      setPassword((prev) => {
                        prev[index] = `${e.target.value}`;
                        return prev;
                      })
                    }
                    validate={errors?.judges?.[index]?.password?.message}
                    name={`judges.${index}.password`}
                    placeholder="Insira a senha"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Repita a senha do jurado {index + 1}
                  </Title>
                  <Input
                    defaultValue={""}
                    name={`judges.${index}.repeat_password`}
                    control={control}
                    errors={errors}
                    ref={register({
                      required: {
                        value: true,
                        message: "Obrigatório",
                      },
                      validate: (val) =>
                        password[index] === val ||
                        "As senhas precisam ser iguais.",
                    })}
                    validate={errors?.judges?.[index]?.repeat_password?.message}
                    errorMessage="Repita a senha"
                    placeholder="Repita a senha"
                  ></Input>
                </div>
              </InputGroup>
            );
          })}

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => {
                setJudges((prev) => [...prev, prev++]);
                setPassword((prev) => [...prev, ""]);
              }}
              text="Adicionar mentor"
            />
            {judges?.length > 1 && (
              <RemoveGroup
                onClick={() => {
                  setJudges((state) => [...state].slice(0, -1));
                  setPassword((prev) => [...prev].slice(0, -1));
                }}
                text="Remover mentor"
              />
            )}
          </InputGroup>
        </Card>

        <ButtonGroup>
          <Button
            Tag={"span"}
            onClick={() => handleStep("desafio")}
            type="gray"
          >
            Voltar
          </Button>
          <Button Tag={"button"} submit disabled={loading} type="secondary">
            Finalizar
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export { Avaliation };
