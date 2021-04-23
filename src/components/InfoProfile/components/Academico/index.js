import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
// import { cpf } from 'cpf-cnpj-validator'

import { Card } from "components/Card";
import { Title } from "components/Text";
import {
  // PhotoUpload,
  InputGroup,
  Input,
  SelectInput,
  AddGroup,
  RemoveGroup,
  InputWithMask,
  // Textarea
} from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

// TODO
// 1 - Adicionar e remover mais números
// 2 - '' '' '' redes socias

const Academico = ({ action, type, noShadow, advance, save, finalRoute }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [socials, setSocials] = useState([0]);

  const { register, errors, control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    let array = pathname.split("/");
    history.push(`/${array[1]}/${type}/profissional`);
    console.log(array);
  };

  const typeEscolar = [
    { value: "Médio", label: "Médio" },
    { value: "Técnico", label: "Profissional" },
    { value: "Superior", label: "Superior" },
  ];

  const typeGrau = [
    { value: "Tecnólogo", label: "Tecnólogo" },
    { value: "Graduação", label: "Graduação" },
    { value: "Pós-graduação", label: "Pós-graduação" },
    { value: "Mestrado", label: "Mestrado" },
    { value: "Doutorado", label: "Doutorado" },
  ];

  const typeStatus = [
    { value: "Completo", label: "Completo" },
    { value: "Em andamento", label: "Em andamento" },
    { value: "Incompleto", label: "Incompleto" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Formação acadêmica</Title>

        {socials.map((_, index) => {
          return (
            <>
              <InputGroup>
                <SelectInput
                  ref={register({ required: true })}
                  name={`escolaridade`}
                  control={control}
                  errors={errors}
                  errorMessage="Selecione um tipo"
                  placeholder="Selecione seu nível de escolaridade"
                  options={typeEscolar}
                >
                  Nível de escolaridade
                </SelectInput>
              </InputGroup>

              <InputGroup>
                <SelectInput
                  ref={register({ required: true })}
                  name={`grau`}
                  control={control}
                  errors={errors}
                  errorMessage="Selecione um tipo"
                  placeholder="Selecione o grau de escolaridade"
                  options={typeGrau}
                >
                  Grau
                </SelectInput>
              </InputGroup>

              <InputGroup>
                <SelectInput
                  ref={register({ required: true })}
                  name={`status`}
                  control={control}
                  errors={errors}
                  errorMessage="Selecione um tipo"
                  placeholder="Selecione o status atual"
                  options={typeStatus}
                >
                  Grau
                </SelectInput>
              </InputGroup>

              <InputGroup>
                <Input
                  ref={register({ required: true })}
                  name="instituicao"
                  errors={errors}
                  errorMessage="Campo necessário"
                  placeholder="Digite a instituição"
                >
                  Instituição
                </Input>
              </InputGroup>

              <InputGroup>
                <Input
                  ref={register({ required: true })}
                  name="instituicao"
                  errors={errors}
                  errorMessage="Campo necessário"
                  placeholder="Digite o curso"
                >
                  Curso
                </Input>
              </InputGroup>

              <InputGroup>
                <InputWithMask
                  ref={register({ required: true })}
                  name="instituicao"
                  errors={errors}
                  control={control}
                  mask={`99/99/9999`}
                  errorMessage="Campo necessário"
                  placeholder="__/__/____"
                >
                  Início
                </InputWithMask>
                <InputWithMask
                  ref={register({ required: true })}
                  name="instituicao"
                  errors={errors}
                  control={control}
                  mask={`99/99/9999`}
                  errorMessage="Campo necessário"
                  placeholder="__/__/____"
                >
                  Término
                </InputWithMask>
              </InputGroup>
            </>
          );
        })}

        {socials.length > 1 && (
          <RemoveGroup
            onClick={() => setSocials((state) => [...state].slice(0, -1))}
            text="Remover rede social"
          />
        )}
        <AddGroup
          onClick={() => setSocials((state) => [...state, state++])}
          text="Adicionar rede social"
        />

        {/* <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`escolaridade`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione seu nível de escolaridade"
                        options={ typeEscolar }>
                        Nível de escolaridade
                    </SelectInput>
                </InputGroup>

                <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`grau`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione o grau de escolaridade"
                        options={ typeGrau }>
                        Grau
                    </SelectInput>
                </InputGroup>

                <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`status`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione o status atual"
                        options={ typeStatus }>
                        Grau
                    </SelectInput>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register({ required: true })}
                        name="instituicao"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="Digite a instituição">
                        Instituição
                    </Input>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register({ required: true })}
                        name="instituicao"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="Digite o curso">
                        Curso
                    </Input>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register({ required: true })}
                        name="instituicao"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="__/__/____">
                        Início
                    </Input>
                    <Input
                        ref={register({ required: true })}
                        name="instituicao"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="__/__/____">
                        Término
                    </Input>
                </InputGroup> */}
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

export { Academico };
