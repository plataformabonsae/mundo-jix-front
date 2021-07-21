import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
import { Title, Text } from "components/Text";
import {
  InputGroup,
  Input,
  InputFile,
  Textarea,
  AddGroup,
  RemoveGroup,
  SelectInputMulti,
  SelectInput,
  InputWithMask,
  Radio,
} from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import { skills as skillsFetch } from "services/skills";

import "react-toastify/dist/ReactToastify.css";

const Challenge = ({
  noShadow = true,
  handleStep,
  handleGoBack,
  handleHasAvaliation,
  hasAvaliation,
  handleSubmit: handleIsSubmit,
}) => {
  const [countResume, setCountResume] = useState(0);
  const [materials, setMaterials] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsChange, setSkillsChange] = useState([]);

  const dispatch = useDispatch();
  const { data: skillsData } = useSelector((state) => state.skills);
  const { loading } = useSelector((state) => state.cep);

  const { register, errors, control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });

  useEffect(() => {
    dispatch(skillsFetch());
  }, [dispatch]);

  useEffect(() => {
    const append = (skill) => {
      setSkills((prev) => [...prev, skill]);
    };
    if (skillsData) {
      const skills = skillsData;
      for (let i = 0; i < skills.length; i++) {
        append({ value: skills[i].id, label: skills[i].title });
      }
    }
  }, [skillsData]);

  const handleCountChar = (e) => {
    setCountResume(e.target.value.length);
  };

  const handleSkillsChange = (data) => {
    console.log(data, "handleSkillsChange");
    setSkillsChange(data);
  };

  const handleDate = (val) => {
    let value = val;
    let array = value.split("/").map((x) => +x);
    const date = new Date(array[2], array[1] - 1, array[0]);

    return date.getTime() && date > new Date();
  };

  const onSubmit = (data) => {
    const materialsCounter = {};
    for (let i = 0; i < 10; i++) {
      if (data[`materials_${i}`])
        materialsCounter[`materials_${i}`] = data[`materials_${i}`][0];
    }
    const dataWithMaterials = { ...data, file: data.file[0], materialsCounter };
    if (hasAvaliation) {
      handleStep("avaliacao", dataWithMaterials);
      console.log("handleStep");
    } else {
      handleIsSubmit(dataWithMaterials);
      console.log("handleIsSubmit");
    }
  };

  const marginTitulo = {
    marginBottom: 32,
  };
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Sobre o desafio</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Nome do desafio
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Digite o nome do desafio"
              name="name"
              placeholder="Digite o nome do desafio"
            ></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Capa do desafio
          </Title>
          <InputGroup>
            <InputFile
              ref={register()}
              name={`file`}
              control={control}
              accept="image/png, image/gif, image/jpeg"
              errors={errors}
              errorMessage={errors?.file?.message}
            >
              Capa em JPG ou PNG (limite de 4mb):
            </InputFile>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Resumo do desafio
          </Title>
          <InputGroup>
            <Textarea
              defaultValue={""}
              disabled={loading}
              ref={register({ required: true })}
              name="resume"
              onChange={handleCountChar}
              errors={errors}
              maxLength="140"
              rows="3"
              errorMessage="Escreva aqui o que é o desafio"
              placeholder="Escreva aqui o que é o desafio"
            ></Textarea>
            <div
              style={{ width: "100%", font: { size: 14 }, textAlign: "right" }}
            >
              {countResume}/140
            </div>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Descreva o desafio
          </Title>
          <InputGroup>
            <Textarea
              defaultValue={""}
              disabled={loading}
              ref={register({ required: true })}
              name="description"
              errors={errors}
              rows="12"
              errorMessage="Escreva aqui a descrição completa do desafio"
              placeholder="Escreva aqui a descrição completa do desafio"
            ></Textarea>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Prazo do desafio
          </Title>
          <InputGroup>
            <InputWithMask
              defaultValue={""}
              disabled={loading}
              control={control}
              ref={register()}
              rules={{
                required: {
                  value: true,
                  message: "Esse campo é obrigatório",
                },
                validate: {
                  isValid: (val) =>
                    handleDate(val) || "Insira um deadline válido",
                },
                valueAsDate: true,
              }}
              name="deadline"
              errors={errors}
              mask="99/99/9999"
              rows="12"
              errorMessage={errors["deadline"]?.message}
              placeholder="Digite o prazo do desafio"
            ></InputWithMask>
          </InputGroup>
          <InputGroup>
            <div>
              <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                Materiais
              </Title>
              {materials.map((item, index) => (
                <InputFile
                  key={index}
                  disabled={loading}
                  ref={register()}
                  name={`materials_${index}`}
                  control={control}
                  errors={errors}
                  errorMessage="Descreva sua solução"
                  placeholder="Descreva sua solução"
                />
              ))}
              <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
                <AddGroup
                  onClick={() => setMaterials((prev) => [...prev, prev++])}
                  text="Adicionar material"
                />
                {materials?.length > 1 && (
                  <RemoveGroup
                    onClick={() =>
                      setMaterials((state) => [...state].slice(0, -1))
                    }
                    text="Remover material"
                  />
                )}
              </InputGroup>
            </div>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Vídeo de apresentação
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              disabled={loading}
              ref={register({
                pattern: {
                  value:
                    /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/,
                  message: "Digite um link do Youtube válido",
                },
              })}
              type="text"
              name={`link`}
              errors={errors}
              // arrayError={errors["videos"]?.[index]}
              // errorMessage="Cole o link do youtube do pitch"
              errorMessage={errors["link"]?.message}
              placeholder="Cole o link do youtube do pitch"
            />
            {/* <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Cole o link do vídeo"
              name="link"
              placeholder="Cole o link do vídeo"
            ></Input> */}
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Premiação
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Digite a premiação"
              name="prize"
              placeholder="Digite a premiação"
            ></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Skills
          </Title>
          {/* {console.log(availableSkills[0])} */}
          <InputGroup>
            <SelectInputMulti
              name={`skills`}
              ref={register()}
              isMulti
              control={control}
              options={skills}
              errors={errors}
              value={skillsChange}
              // defaultValue={skillsChange}
              onChange={handleSkillsChange}
              // rules={{
              //   validate: {
              //     hasAny: (v) =>
              //       console.log(skillsChange) ||
              //       "Selecione pelo menos uma skill",
              //   },
              // }}
              errorMessage={errors["skills"]?.message}
              placeholder="Digite sua skill"
            />
          </InputGroup>
          {skillsChange?.map((item, index) => (
            <input
              key={item.value}
              type="hidden"
              ref={register()}
              name={`skills.${index}.id`}
              value={item.value}
            />
          ))}
        </Card>

        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Insígnias</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Nome da insígnia
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Digite o nome da insígnia"
              name="badge.title"
              placeholder="Digite o nome da insígnia"
            ></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Descrição da insígnia
          </Title>
          <InputGroup>
            <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Descrição da insígnia"
              name="badge.description"
              placeholder="Descrição da insígnia"
            ></Input>

            <input
              type="hidden"
              value={"15"}
              ref={register()}
              name={"badge.points"}
            />
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Pessoas mentoras</Title>

          {mentors.map((social, index) => {
            return (
              <InputGroup key={index}>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Nome do mentor {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.link}
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage="Nome do mentor"
                    name={`mentors.${index}.name`}
                    placeholder="Nome do mentor"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    E-mail do Mentor {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.platform}
                    ref={register({ required: true })}
                    name={`mentors.${index}.email`}
                    control={control}
                    errors={errors}
                    errorMessage="E-mail do mentor"
                    placeholder="E-mail do mentor"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Senha do mentor {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.link}
                    ref={register({ required: true })}
                    errors={errors}
                    errorMessage="Repita a senha"
                    name={`mentors.${index}.password`}
                    placeholder="Repita a senha"
                  ></Input>
                </div>
                <div style={{ width: "50%" }}>
                  <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                    Repita a senha do mentor {index + 1}
                  </Title>
                  <Input
                    defaultValue={social.platform}
                    ref={register({ required: true })}
                    name={`mentors.${index}.repeat_password`}
                    control={control}
                    errors={errors}
                    errorMessage="Repita a senha"
                    placeholder="Repita a senha"
                  ></Input>
                </div>
              </InputGroup>
            );
          })}

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setMentors((prev) => [...prev, prev++])}
              text="Adicionar mentor"
            />
            {mentors?.length > 1 && (
              <RemoveGroup
                onClick={() => setMentors((state) => [...state].slice(0, -1))}
                text="Remover mentor"
              />
            )}
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Avaliação</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Terá avaliação?
          </Title>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 12 }}
          >
            <Radio
              ref={register()}
              onChange={() => handleHasAvaliation(true)}
              name={"hasAssessment"}
              checked={hasAvaliation === true}
            >
              Sim
            </Radio>
            <Radio
              ref={register()}
              onChange={() => handleHasAvaliation(false)}
              name={"hasAssessment"}
              checked={hasAvaliation === false}
            >
              Não
            </Radio>
          </div>
        </Card>

        <ButtonGroup>
          <Button Tag={"span"} onClick={() => handleGoBack("job")} type="gray">
            Voltar
          </Button>
          <Button Tag={"button"} submit disabled={loading} type="secondary">
            {hasAvaliation ? "Continuar" : "Salvar"}
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export { Challenge };
