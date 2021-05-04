import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { cpf } from "cpf-cnpj-validator";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { Title } from "components/Text";
import {
  PhotoUpload,
  InputGroup,
  Input,
  // InputFile,
  SelectInput,
  AddGroup,
  RemoveGroup,
  InputWithMask,
  Textarea,
} from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import { edit } from "services/auth";
import "react-toastify/dist/ReactToastify.css";

// import history from "utils/history";
// import { isRejected } from "@reduxjs/toolkit";

// TODO
// errors in masked inputs

const Pessoal = ({ action, type, noShadow, finalRoute, hasPassword }) => {
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state) => state.user);
  // const { data: profile, loading } = useSelector((state) => state.profile);
  const { register, errors, control, handleSubmit } = useForm();
  const [tels, setTels] = useState([0]);
  const [emails, setEmails] = useState([0]);
  const [socials, setSocials] = useState([0]);

  const onSubmit = async (data) => {
    let { name, last_name, cpf, file } = data;
    await dispatch(
      edit(type, {
        file,
        email: user.email,
        name,
        last_name,
        cpf,
        // birthdate,
      })
    )
      .then(() => {
        toast.success("Informações atualizadas", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("Algum erro ocorreu, por favor tente novamente", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(error);
      });
  };

  const handleNascimento = (val) => {
    let value = val;
    let array = value.split("/").map((x) => +x);

    return new Date(array[2] + 18, array[1] - 1, array[0]) <= new Date();
  };

  const typeTel = [
    { value: "celular", label: "Celular" },
    { value: "profissional", label: "Profissional" },
    { value: "pessoal", label: "Pessoal" },
  ];

  const typeSocial = [
    { value: "Instagram", label: "Instagram" },
    { value: "Facebook", label: "Facebook" },
    { value: "Linkedin", label: "Linkedin" },
    { value: "Twitter", label: "Twitter" },
    { value: "TikTok", label: "TikTok" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer style={{ background: "white" }} />
      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Dados pessoais</Title>

        <PhotoUpload name="file" ref={register()} image={user?.user?.file} />

        <InputGroup>
          <Input
            defaultValue={user.name}
            ref={register({ required: true })}
            errors={errors}
            errorMessage="Digite seu primeiro nome"
            name="name"
            placeholder="Digite seu primeiro nome"
          >
            Nome
          </Input>
          <Input
            defaultValue={user.last_name}
            ref={register({ required: true })}
            name="last_name"
            errors={errors}
            errorMessage="Digite seu sobrenome"
            placeholder="Digite seu sobrenome"
          >
            Sobrenome
          </Input>
        </InputGroup>

        <InputGroup>
          <InputWithMask
            defaultValue={user.cpf}
            ref={register({
              required: true,
              validate: (val) => cpf.isValid(val),
            })}
            name="cpf"
            errors={errors}
            errorMessage="Digite um CPF válido"
            placeholder="Somente números"
            control={control}
            mask={`999.999.999-99`}
          >
            CPF
          </InputWithMask>
          <InputWithMask
            defaultValue={user.birthdate}
            ref={register({
              required: true,
              validate: (val) => handleNascimento(val),
            })}
            name="birthdate"
            errors={errors}
            errorMessage="Você precisa ter mais que 18 anos"
            placeholder="Somente números"
            control={control}
            mask={`99/99/9999`}
          >
            Data de nascimento
          </InputWithMask>
        </InputGroup>
        {!hasPassword ? (
          <InputGroup>
            <Input
              defaultValue={user.birthdate | "12345678"}
              disabled={true}
              ref={register({ required: true })}
              type="password"
              name="password"
              errors={errors}
              errorMessage="Digite uma senha válida"
              placeholder="Digite a senha"
            >
              Senha
            </Input>
          </InputGroup>
        ) : null}
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Contato</Title>

        {tels.map((_, index) => {
          return (
            <InputGroup key={index}>
              <InputWithMask
                defaultValue={user.tel || ""}
                ref={register({ required: true })}
                errors={errors}
                errorMessage="Somente números"
                name={`tel.${[index]}.number`}
                placeholder="Digite seu telefone"
                control={control}
                mask={`(99) 99999-9999`}
              >
                Telefone
              </InputWithMask>
              <SelectInput
                ref={register({ required: true })}
                name={`tel.${[index]}.type`}
                control={control}
                errors={errors}
                errorMessage="Selecione um tipo"
                placeholder="Selecione o tipo de telefone"
                options={typeTel}
              >
                Tipo de telefone
              </SelectInput>
            </InputGroup>
          );
        })}

        {tels.length > 1 && (
          <RemoveGroup
            onClick={() => setTels((state) => [...state].slice(0, -1))}
            text="Remover telefone"
          />
        )}
        <AddGroup
          onClick={() => setTels((state) => [...state, state++])}
          text="Adicionar telefone"
        />

        {emails.map((_, index) => {
          return (
            <InputGroup key={index}>
              <Input
                defaultValue={user.email}
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                name={`email.${[index]}`}
                errors={errors}
                errorMessage="Digite um e-mail válido"
                placeholder="Digite seu melhor e-mail"
              >
                E-mail
              </Input>
            </InputGroup>
          );
        })}

        {emails.length > 1 && (
          <RemoveGroup
            onClick={() => setEmails((state) => [...state].slice(0, -1))}
            text="Remover e-mail"
          />
        )}
        <AddGroup
          onClick={() => setEmails((state) => [...state, state++])}
          text="Adicionar e-mail"
        />
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Redes sociais</Title>

        {socials.map((_, index) => {
          return (
            <InputGroup key={index}>
              <Input
                ref={register()}
                errors={errors}
                errorMessage="Somente números"
                name={`social.${[index]}.link`}
                placeholder="Link da rede social"
              >
                Cole aqui
              </Input>
              <SelectInput
                ref={register()}
                name={`social.${[index]}.type`}
                control={control}
                errors={errors}
                errorMessage="Selecione um tipo"
                placeholder="Selecione a rede social"
                options={typeSocial}
              >
                Tipo de rede
              </SelectInput>
            </InputGroup>
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
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Redes sociais</Title>

        <InputGroup>
          <Textarea
            ref={register()}
            errors={errors}
            errorMessage="Máximo de 200 caracteres"
            name={`description`}
            placeholder="Digite sua biografia"
          >
            Minha biografia
          </Textarea>
        </InputGroup>
      </Card>

      <ButtonGroup>
        <Button
          disabled={loading}
          to={finalRoute ? finalRoute : `/dashboard/${type}`}
          type="outlineWhite"
        >
          Salvar e sair
        </Button>
        <Button disabled={loading} Tag="button" type="secondary">
          Continuar
        </Button>
      </ButtonGroup>
    </form>
  );
};

export { Pessoal };
