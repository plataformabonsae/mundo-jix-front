import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "components/Card";
import { Title } from "components/Text";
import {
  InputGroup,
  Input,
  SelectInput,
  AddGroup,
  InputFile,
  Checkbox,
  Textarea,
  // AddGroup,
  RemoveGroup,
  // InputWithMask,
  // Textarea
} from "components/Inputs";
import { Text } from "components/Text";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import { edit } from "services/auth";

// TODO
// 1 - Adicionar e remover mais números
// 2 - '' '' '' redes socias

const Profissional = ({ action, type, noShadow }) => {
  const history = useHistory();
  // const { pathname } = useLocation()

  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.login);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { loading } = useSelector((state) => state.profile);

  const { register, errors, control, handleSubmit } = useForm();

  const [tels, setTels] = useState([0]);
  const [emails, setEmails] = useState([0]);
  const [socials, setSocials] = useState([0]);

  // const onSubmit = async (data) => {
  //     let {
  //         name,
  //         last_name,
  //         cpf,
  //         birthdate,
  //         // file,
  //     } = data
  //     // console.log(data)
  //     // console.log(file)
  //     await dispatch(edit(type, {
  //         name,
  //         last_name,
  //         cpf,
  //         birthdate,
  //         // file,
  //     }))
  //     .then(() => {
  //         if( type === 'talento' ) {
  //             history.push(`/join/${type}/academico`)
  //         } else {
  //             history.push(`/dashboard/${type}`)
  //         }
  //     })
  // }

  const onSubmit = (data) => {
    history.push(`/dashboard/${type}`);
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

  const typeSkill = [
    { value: "Programação", label: "Programação" },
    { value: "Skill dois", label: "Skill dois" },
    { value: "Skill três", label: "Skill três" },
    { value: "Skill quatro", label: "Skill quatro" },
  ];

  const typeLinks = [
    { value: "Youtube", label: "Youtube" },
    { value: "Blog", label: "Blog" },
    { value: "Outro", label: "Outro" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Perspectivas</Title>

        <InputGroup>
          <SelectInput
            ref={register({ required: true })}
            name={`situacao-atual`}
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
            ref={register({ required: true })}
            name={`o-que-busca`}
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

        <InputGroup>
          <SelectInput
            ref={register({ required: true })}
            name={`skills`}
            control={control}
            isMulti
            errors={errors}
            errorMessage="Digite pelo menos uma skill"
            placeholder="Digite sua skill"
            options={typeSkill}
          />
        </InputGroup>
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Portfolio</Title>

        {tels.map((_, index) => {
          return (
            <InputGroup>
              <Input
                ref={register()}
                errors={errors}
                errorMessage="Máximo 20 caracteres"
                name="plataforma.link"
                placeholder="Colo aqui o link"
              >
                Link
              </Input>
              <SelectInput
                ref={register()}
                name={`plafatorma.url`}
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

        {tels.length > 1 && (
          <RemoveGroup
            onClick={() => setTels((state) => [...state].slice(0, -1))}
            text="Remover portfolio"
          />
        )}
        <AddGroup
          onClick={() => setTels((state) => [...state, state++])}
          text="Adicionar portfolio"
        />
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Currículo</Title>

        <InputGroup>
          <Text size={12} weight={"bold"}>
            Anexe seu currículo em PDF ou Doc:
          </Text>
          <InputFile
            ref={register()}
            name={`curriculo`}
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
        <Title style={{ marginBottom: 32 }}>Experiência Porfissional</Title>

        {emails.map((_, index) => {
          return (
            <>
              <InputGroup>
                <Input
                  ref={register()}
                  name="cargo"
                  errors={errors}
                  errorMessage="Campo necessário"
                  placeholder="Digite o cargo"
                >
                  Cargo
                </Input>
              </InputGroup>

              <InputGroup>
                <Input
                  ref={register()}
                  name="empresa.nome"
                  errors={errors}
                  errorMessage="Campo necessário"
                  placeholder="Digite o nome da empresa"
                >
                  Empresa
                </Input>
              </InputGroup>

              <InputGroup>
                <Input
                  ref={register()}
                  name="empresa.inicio"
                  errors={errors}
                  errorMessage="Campo necessário"
                  placeholder="__/__/____"
                >
                  Início
                </Input>
                <Input
                  ref={register()}
                  name="empresa.termino"
                  errors={errors}
                  errorMessage="Campo necessário"
                  placeholder="__/__/____"
                >
                  Término
                </Input>
                <div style={{ width: "100%", textAlign: "right" }}>
                  <Checkbox>Meu Emprego atual</Checkbox>
                </div>
              </InputGroup>

              <InputGroup>
                <Textarea
                  ref={register()}
                  errors={errors}
                  errorMessage="Máximo de 400 caracteres"
                  name={`atividades`}
                  placeholder="Digite suas principais atividades"
                >
                  Principais atividades
                </Textarea>
              </InputGroup>
            </>
          );
        })}

        {emails.length > 1 && (
          <RemoveGroup
            onClick={() => setEmails((state) => [...state].slice(0, -1))}
            text="Remover experiencia"
          />
        )}
        <AddGroup
          onClick={() => setEmails((state) => [...state, state++])}
          text="Adicionar experiencia"
        />
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
        {socials.map((_, index) => {
          return (
            <InputGroup key={index}>
              <Input
                ref={register()}
                errors={errors}
                errorMessage="Somente números"
                name={`social.${[index]}.link`}
                placeholder="Cole aqui o link"
              >
                Link
              </Input>
              <SelectInput
                ref={register()}
                name={`social.${[index]}.type`}
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

        {socials.length > 1 && (
          <RemoveGroup
            onClick={() => setSocials((state) => [...state].slice(0, -1))}
            text="Remover link"
          />
        )}
        <AddGroup
          onClick={() => setSocials((state) => [...state, state++])}
          text="Adicionar link"
        />
      </Card>

      <ButtonGroup>
        <Button to={`/dashboard/${type}`} type="outlineWhite">
          Salvar e sair
        </Button>
        <Button Tag="button" type="secondary">
          Continuar
        </Button>
      </ButtonGroup>
    </form>
  );
};

export { Profissional };
