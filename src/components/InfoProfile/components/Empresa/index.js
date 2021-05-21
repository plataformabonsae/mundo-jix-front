import React, { useState } from "react";
// import { toast } from 'react-toastify'
import { useForm } from "react-hook-form";
import { cnpj } from "cpf-cnpj-validator";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { Title } from "components/Text";
import {
  PhotoUpload,
  InputGroup,
  Input,
  InputFile,
  SelectInput,
  AddGroup,
  RemoveGroup,
  InputWithMask,
  Textarea,
} from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import { edit } from "services/auth";
import { cep, cepReset } from "services/adress";

// import history from "utils/history";
// import { isRejected } from "@reduxjs/toolkit";

// TODO
// errors in masked inputs

const Pessoal = ({ action, type, noShadow, finalRoute, hasPassword }) => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.login);
  // const { data: profile, loading } = useSelector((state) => state.profile);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: cepData } = useSelector((state) => state.cep);

  const { register, errors, control, handleSubmit } = useForm();

  const [tels, setTels] = useState([0]);
  const [emails, setEmails] = useState([0]);
  const [socials, setSocials] = useState([0]);

  const onSubmit = async (data) => {
    let { name, last_name, cpf, birthdate, file } = data;
    console.log(name, last_name, cpf, birthdate, { email: user.email });
    // console.log(file)
    await dispatch(
      edit(usertype, {
        file,
        email: user.email,
        name,
        last_name,
        cpf,
        // birthdate,
      })
    ).then(() => {});
  };

  const handleCep = (event) => {
    const typed = event.target.value;
    const onlyNumbers = parseInt(typed.replace("-", ""));
    console.log(onlyNumbers);
    if (onlyNumbers.toString().length === 8) {
      dispatch(cep(onlyNumbers));
      console.log("dispatch");
    } else {
      dispatch(cepReset());
    }
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

  const typeFuncionarios = [
    { value: "1 - 5", label: "1 - 5" },
    { value: "6 - 15", label: "6 - 15" },
    { value: "16 - 50", label: "16 - 50" },
    { value: "51 - 100", label: "51 - 100" },
    { value: "+100", label: "+100" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Dados cadastrais</Title>

        <PhotoUpload name="image" ref={register} />

        <InputGroup>
          <Input
            defaultValue={user.name}
            ref={register({ required: true })}
            errors={errors}
            errorMessage="Máximo 20 caracteres"
            name="name"
            placeholder="Digite o nome da empresa"
          >
            Nome da empresa
          </Input>
        </InputGroup>

        {hasPassword ? (
          <InputGroup>
            <Input
              defaultValue={user.birthdate}
              disabled={true}
              ref={register()}
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

        <InputGroup>
          <Input
            defaultValue={user.social_reason}
            ref={register({ required: true })}
            errors={errors}
            errorMessage="Máximo 20 caracteres"
            name="social_reason"
            placeholder="Digite area da atuação"
          >
            Área de atuação
          </Input>
        </InputGroup>

        <InputGroup>
          <InputWithMask
            ref={register({ validate: (val) => cnpj.isValid(val) })}
            name="cnpj"
            errors={errors}
            control={control}
            errorMessage="Digite um CPF válido"
            placeholder="Somente números"
            mask={`99.999.999/9999-99`}
          >
            CNPJ
          </InputWithMask>
        </InputGroup>

        <InputGroup>
          <SelectInput
            ref={register()}
            name={`funcionarios`}
            control={control}
            errors={errors}
            errorMessage="Selecione uma quantidade"
            placeholder="Selecione a quantidade de funcionários"
            options={typeFuncionarios}
          >
            Quantidade de funcionários
          </SelectInput>
        </InputGroup>
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Contato</Title>

        {tels.map((_, index) => {
          return (
            <InputGroup key={index}>
              <InputWithMask
                defaultValue={user.tel || ""}
                ref={register()}
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
                ref={register()}
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
        <Title style={{ marginBottom: 32 }}>Localização</Title>

        <InputGroup>
          <InputWithMask
            ref={register()}
            name="cep"
            errors={errors}
            errorMessage="Digite um CEP válido"
            placeholder="Digite o CEP"
            control={control}
            mask={`99999-999`}
            onKeyUp={handleCep}
          >
            CEP
          </InputWithMask>
        </InputGroup>

        <InputGroup>
          <Input
            ref={register()}
            disabled={cepData?.uf ? true : false}
            value={cepData?.uf}
            name={`localizacao.estado`}
            errors={errors}
            errorMessage="Digite o estado"
            placeholder="Digite o estado"
          >
            Estado
          </Input>

          <Input
            ref={register()}
            disabled={cepData?.localidade ? true : false}
            value={cepData?.localidade}
            name={`localizacao.cidade`}
            errors={errors}
            errorMessage="Selecione um tipo"
            placeholder="Selecione a cidade"
          >
            Cidade
          </Input>
        </InputGroup>

        <InputGroup>
          <Input
            ref={register()}
            disabled={cepData?.logradouro ? true : false}
            value={cepData?.logradouro}
            name="rua"
            errors={errors}
            errorMessage="Digite a rua da empresa"
            placeholder="Digite a rua"
          >
            Rua
          </Input>
        </InputGroup>

        <InputGroup>
          <Input
            ref={register()}
            disabled={cepData?.bairro ? true : false}
            value={cepData?.bairro}
            name="bairro"
            errors={errors}
            errorMessage="Digite a rua da empresa"
            placeholder="Digite o bairro"
          >
            Bairro
          </Input>
        </InputGroup>

        <InputGroup>
          <Input
            ref={register()}
            name="numero"
            errors={errors}
            errorMessage="Digite a número da empresa"
            placeholder="Digite o número"
          >
            Número
          </Input>
        </InputGroup>

        <InputGroup>
          <Input
            ref={register()}
            name="complemento"
            errors={errors}
            errorMessage="Digite o complemento"
            placeholder="Digite o complemento"
          >
            Complemento
          </Input>
        </InputGroup>
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
        <Title style={{ marginBottom: 32 }}>Biografia</Title>

        <InputGroup>
          <Textarea
            ref={register()}
            errors={errors}
            errorMessage="Digite sua biografia"
            name={`description`}
            placeholder="Digite sua biografia"
          >
            Biografia
          </Textarea>
        </InputGroup>
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Fotos da empresa</Title>

        <InputGroup>
          <InputFile></InputFile>
        </InputGroup>
      </Card>

      <Card noShadow={noShadow}>
        <Title style={{ marginBottom: 32 }}>Vídeo da empresa</Title>

        <InputGroup>
          <Input
            ref={register()}
            name="empresa.video"
            errors={errors}
            errorMessage="Campo necessário"
            placeholder="Cole o link"
          >
            Link do youtube
          </Input>
        </InputGroup>
      </Card>

      <ButtonGroup style={{ justifyContent: "center" }}>
        {/* <Button
                        to="/"
                    type="outlineWhite">
                        Salvar e sair
                    </Button> */}
        <Button Tag="button" type="secondary">
          Continuar
        </Button>
      </ButtonGroup>
    </form>
  );
};

export { Pessoal };
