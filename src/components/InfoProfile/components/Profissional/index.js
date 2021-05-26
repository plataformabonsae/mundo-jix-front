import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { removeLastPath } from "utils/etc";

import { Card } from "components/Card";
import { Title } from "components/Text";
import {
  InputGroup,
  Input,
  SelectInput,
  SelectInputMulti,
  AddGroup,
  InputFile,
  Checkbox,
  Textarea,
  // AddGroup,
  RemoveGroup,
  InputWithMask,
  // Textarea
} from "components/Inputs";
import { Text } from "components/Text";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";
// import { cep, cepReset } from "services/adress";

import { edit } from "services/auth";

const Profissional = ({ action, type, noShadow, dontRedirect }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: user, loading } = useSelector((state) => state.user);
  const { data: usertype } = useSelector((state) => state.usertype);

  const { register, errors, control, handleSubmit } = useForm();
  const [availableSkills, setAvailableSkills] = useState([]);
  const [skillsChange, setSkillsChange] = useState([]);

  const [portfolios, setPortfolios] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const append = (skill) => {
      setSkillsChange((prev) => [...prev, skill]);
    };
    const skills = user?.skills;
    console.log(skills);
    if (skills) {
      for (let i = 0; i < skills.length; i++) {
        append({ value: skills[i].id, label: skills[i].title });
      }
    }
  }, [user?.skills]);

  useEffect(() => {
    const append = (skill) => {
      setAvailableSkills((prev) => [...prev, skill]);
    };
    const skills = user.types.skills;
    console.log(skills);
    for (let i = 0; i < skills.length; i++) {
      append({ value: skills[i].id, label: skills[i].title });
    }
  }, [user?.types?.skills]);

  useEffect(() => {
    const append = (xp) => {
      setExperiences((prev) => [...prev, xp]);
    };
    if (user.experiences.length) {
      for (let i = 0; i < user.experiences.length; i++) {
        append(user.experiences[i]);
      }
    } else {
      append({});
    }
    return () => {
      setExperiences([]);
    };
  }, [user]);

  useEffect(() => {
    const append = (link) => {
      setLinks((prev) => [...prev, link]);
    };
    if (user.links.length) {
      for (let i = 0; i < user.links.length; i++) {
        append(user.links[i]);
      }
    } else {
      append({});
    }
    return () => {
      setLinks([]);
    };
  }, [user]);

  useEffect(() => {
    const append = (port) => {
      setPortfolios((prev) => [...prev, port]);
    };
    if (user.portfolios.length) {
      for (let i = 0; i < user.portfolios.length; i++) {
        append(user.portfolios[i]);
      }
    } else {
      append({});
    }
    return () => {
      setPortfolios([]);
    };
  }, [user]);

  const onSubmit = async (data) => {
    console.log(data);
    // let { email, name, last_name, cpf, phones, birthdate } = data;
    const {
      current_situation,
      looking_for,
      curriculum,
      portfolios,
      experiences,
      links,
      skills,
    } = data;
    let filtered_portfolios;
    let filtered_skills;
    let filtered_experiences;
    let filtered_links;
    for (let i = 0; i < portfolios?.length; i++) {
      filtered_portfolios = [...portfolios].filter((port) => port.link.length);
    }
    for (let i = 0; i < skills?.length; i++) {
      filtered_skills = [...skills].filter((skill) => skill.id);
    }
    for (let i = 0; i < experiences?.length; i++) {
      filtered_experiences = [...experiences].filter((xp) => xp.role.length);
    }
    for (let i = 0; i < links?.length; i++) {
      filtered_links = [...links].filter((link) => link.link.length);
    }
    console.log(JSON.stringify(filtered_skills));
    await dispatch(
      edit(usertype, {
        name: user?.user?.name,
        email: user?.user?.email,
        skills: JSON.stringify(filtered_skills),
        current_situation,
        looking_for,
        curriculum: curriculum[0],
        portfolios: JSON.stringify(filtered_portfolios),
        experiences: JSON.stringify(filtered_experiences),
        links: JSON.stringify(filtered_links),
      })
    )
      .then(() => {
        toast.success("Informações atualizadas", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .then(() => !dontRedirect && history.push("/dashboard"))
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.data.errors);

        toast.error("Algum erro ocorreu. Tente novamente", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const typeSituacao = [
    { value: "Tenho emprego", label: "Tenho emprego" },
    { value: "Sou freelancer", label: "Sou freelancer" },
    { value: "Não tenho emprego", label: "Não tenho emprego" },
  ];

  const typeBusca = [
    { value: "Jovem aprendiz", label: "Jovem aprendiz" },
    { value: "Estágio", label: "Estágio" },
    { value: "PJ", label: "PJ" },
    { value: "Trainee", label: "Trainee" },
    { value: "CLT", label: "CLT" },
    { value: "Empreender", label: "Empreender" },
  ];

  const typePortifolio = [
    { value: "Github", label: "Github" },
    { value: "Site", label: "Site" },
    { value: "Outro", label: "Outro" },
  ];

  const typeLinks = [
    { value: "Youtube", label: "Youtube" },
    { value: "Blog", label: "Blog" },
    { value: "Outro", label: "Outro" },
  ];

  const handleSkillsChange = (data) => {
    setSkillsChange(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Perspectivas</Title>

        <InputGroup>
          <SelectInput
            defaultValue={user?.user?.current_situation}
            ref={register()}
            name={`current_situation`}
            control={control}
            errors={errors}
            errorMessage="Selecione um tipo"
            placeholder="Selecione a situação atual"
            options={typeSituacao}
          >
            Situação atual
          </SelectInput>
        </InputGroup>

        <InputGroup>
          <SelectInput
            defaultValue={user?.user?.looking_for}
            ref={register()}
            name={`looking_for`}
            control={control}
            errors={errors}
            errorMessage="Selecione um tipo"
            placeholder="Selecione o que busca"
            options={typeBusca}
          >
            O que busca?
          </SelectInput>
        </InputGroup>
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Skills</Title>
        {/* {console.log(availableSkills[0])} */}
        <InputGroup>
          <SelectInputMulti
            name={`skills`}
            value={skillsChange}
            options={availableSkills}
            control={control}
            placeholder="Digite sua skill"
            onChange={handleSkillsChange}
          />
        </InputGroup>
        {console.log(availableSkills)}
      </Card>
      {skillsChange.map((item, index) => (
        <input
          type="hidden"
          ref={register()}
          name={`skills.${index}.id`}
          value={item.value}
        />
      ))}

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Portfolio</Title>

        {portfolios.map((field, index) => {
          return (
            <InputGroup>
              <Input
                defaultValue={field.link}
                ref={register()}
                control={control}
                errors={errors}
                errorMessage="Máximo 20 caracteres"
                name={`portfolios.${index}.link`}
                placeholder="Colo aqui o link"
              >
                Link
              </Input>
              <SelectInput
                defaultValue={field.platform}
                ref={register()}
                name={`portfolios.${index}.platform`}
                control={control}
                errors={errors}
                errorMessage="Selecione pelo menos uma plataforma"
                placeholder="Selecione a plataforma"
                options={typePortifolio}
              >
                Plataforma
              </SelectInput>
            </InputGroup>
          );
        })}

        {/* {!portfolios[0]?.link && (
          <InputGroup>
            <Input
              ref={register()}
              control={control}
              errors={errors}
              errorMessage="Máximo 20 caracteres"
              name={`portfolios.0.link`}
              placeholder="Colo aqui o link"
            >
              Link
            </Input>
            <SelectInput
              ref={register()}
              name={`portfolios.0.platform`}
              control={control}
              errors={errors}
              errorMessage="Selecione pelo menos uma plataforma"
              placeholder="Selecione a plataforma"
              options={typePortifolio}
            >
              Plataforma
            </SelectInput>
          </InputGroup>
        )} */}

        <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
          <AddGroup
            onClick={() => setPortfolios((prev) => [...prev, prev++])}
            text="Adicionar portfolio"
          />
          {portfolios?.length > 1 && (
            <RemoveGroup
              onClick={() => setPortfolios((state) => [...state].slice(0, -1))}
              text="Remover portfolio"
            />
          )}
        </InputGroup>
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Currículo</Title>

        <InputGroup>
          <Text style={{ width: "100%" }} size={12} weight={"bold"}>
            Anexe seu currículo em PDF ou Doc:
          </Text>
          <InputFile
            ref={register()}
            name={`curriculum`}
            control={control}
            // errors={errors}
            // errorMessage="Selecione pelo menos uma plataforma"
            // placeholder="Selecione a plataforma"
            options={typePortifolio}
          >
            {/* Plataforma */}
          </InputFile>
        </InputGroup>
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Experiência Profissional</Title>

        {experiences.map((field, index) => {
          return (
            <>
              <InputGroup>
                <Input
                  defaultValue={field.role}
                  ref={register()}
                  name={`experiences.${index}.role`}
                  errors={errors}
                  control={control}
                  errorMessage="Campo necessário"
                  placeholder="Digite o cargo"
                >
                  Cargo
                </Input>
              </InputGroup>

              <InputGroup>
                <Input
                  defaultValue={field.company}
                  ref={register()}
                  name={`experiences.${index}.company`}
                  errors={errors}
                  control={control}
                  errorMessage="Campo necessário"
                  placeholder="Digite o nome da empresa"
                >
                  Empresa
                </Input>
              </InputGroup>

              <InputGroup>
                <InputWithMask
                  defaultValue={field.start_date}
                  ref={register()}
                  name={`experiences.${index}.start_date`}
                  errors={errors}
                  control={control}
                  errorMessage="Campo necessário"
                  placeholder="__/__/____"
                  mask={`99/99/9999`}
                >
                  Início
                </InputWithMask>
                <InputWithMask
                  defaultValue={field.end_date}
                  ref={register()}
                  name={`experiences.${index}.end_date`}
                  errors={errors}
                  control={control}
                  mask={`99/99/9999`}
                  errorMessage="Campo necessário"
                  placeholder="__/__/____"
                >
                  Término
                </InputWithMask>
                <div style={{ width: "100%", textAlign: "right" }}>
                  <Checkbox
                  // defaultValue={field.current_job}
                  // ref={register()}
                  // name={`experiences.${index}.current_job`}
                  >
                    Meu Emprego atual
                  </Checkbox>
                </div>
              </InputGroup>

              <InputGroup>
                <Textarea
                  defaultValue={field.main_activities}
                  ref={register()}
                  errors={errors}
                  control={control}
                  errorMessage="Máximo de 400 caracteres"
                  name={`experiences.${index}.main_activities`}
                  placeholder="Digite suas principais atividades"
                >
                  Principais atividades
                </Textarea>
              </InputGroup>
            </>
          );
        })}

        {/* {!experiences[0]?.role && (
          <>
            <InputGroup>
              <Input
                ref={register()}
                name={`experiences.0.role`}
                errors={errors}
                control={control}
                errorMessage="Campo necessário"
                placeholder="Digite o cargo"
              >
                Cargo
              </Input>
            </InputGroup>

            <InputGroup>
              <Input
                ref={register()}
                name={`experiences.0.company`}
                errors={errors}
                control={control}
                errorMessage="Campo necessário"
                placeholder="Digite o nome da empresa"
              >
                Empresa
              </Input>
            </InputGroup>

            <InputGroup>
              <InputWithMask
                ref={register()}
                name={`experiences.0.start_date`}
                errors={errors}
                control={control}
                errorMessage="Campo necessário"
                placeholder="__/__/____"
                mask={`99/99/9999`}
              >
                Início
              </InputWithMask>
              <InputWithMask
                ref={register()}
                name={`experiences.0.end_date`}
                errors={errors}
                control={control}
                mask={`99/99/9999`}
                errorMessage="Campo necessário"
                placeholder="__/__/____"
              >
                Término
              </InputWithMask>
              <div style={{ width: "100%", textAlign: "right" }}>
                <Checkbox ref={register()} name={`experiences.0.current_job`}>
                  Meu Emprego atual
                </Checkbox>
              </div>
            </InputGroup>

            <InputGroup>
              <Textarea
                ref={register()}
                errors={errors}
                control={control}
                errorMessage="Máximo de 400 caracteres"
                name={`experiences.0.main_activities`}
                placeholder="Digite suas principais atividades"
              >
                Principais atividades
              </Textarea>
            </InputGroup>
          </>
        )} */}

        <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
          <AddGroup
            onClick={() => setExperiences((prev) => [...prev, prev++])}
            text="Adicionar experiência"
          />
          {experiences?.length > 1 && (
            <RemoveGroup
              onClick={() => setExperiences((state) => [...state].slice(0, -1))}
              text="Remover experiência"
            />
          )}
        </InputGroup>
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Outros links</Title>

        {/* <InputGroup>
          <Input
            ref={register()}
            errors={errors}
            errorMessage="Máximo 20 caracteres"
            name="plataforma.link"
            placeholder="Cole aqui o link"
          >
            Link
          </Input>
          <SelectInput
            ref={register({ required: true })}
            name={`plafatorma.url`}
            control={control}
            errors={errors}
            errorMessage="Selecione pelo menos uma plataforma"
            placeholder="Selecione a plataforma"
            options={typeLinks}
          >
            Plataforma
          </SelectInput>

          <AddGroup text="Adicionar link" />
        </InputGroup> */}
        {links.map((field, index) => {
          return (
            <InputGroup key={index}>
              <Input
                defaultValue={field.link}
                ref={register()}
                errors={errors}
                control={control}
                errorMessage="Somente números"
                name={`links.${index}.link`}
                placeholder="Cole aqui o link"
              >
                Link
              </Input>
              <SelectInput
                defaultValue={field.platform}
                ref={register()}
                name={`links.${index}.platform`}
                control={control}
                errors={errors}
                errorMessage="Selecione um tipo"
                placeholder="Selecione a plataforma"
                options={typeLinks}
              >
                Tipo de rede
              </SelectInput>
            </InputGroup>
          );
        })}

        {/* {!links[0]?.link && (
          <InputGroup>
            <Input
              ref={register()}
              errors={errors}
              control={control}
              errorMessage="Somente números"
              name={`links.0.link`}
              placeholder="Cole aqui o link"
            >
              Link
            </Input>
            <SelectInput
              ref={register()}
              name={`links.0.platform`}
              control={control}
              errors={errors}
              errorMessage="Selecione um tipo"
              placeholder="Selecione a plataforma"
              options={typeLinks}
            >
              Tipo de rede
            </SelectInput>
          </InputGroup>
        )} */}

        <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
          <AddGroup
            onClick={() => setLinks((prev) => [...prev, prev++])}
            text="Adicionar link"
          />
          {links?.length > 1 && (
            <RemoveGroup
              onClick={() => setLinks((state) => [...state].slice(0, -1))}
              text="Remover link"
            />
          )}
        </InputGroup>
      </Card>

      <ButtonGroup>
        <Button Tag="button" submit type="secondary">
          {dontRedirect ? "Salvar" : "Finalizar"}
        </Button>
      </ButtonGroup>
    </form>
  );
};

export { Profissional };
