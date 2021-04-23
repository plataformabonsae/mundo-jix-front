import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { cpf, cnpj } from "cpf-cnpj-validator";
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

import history from "utils/history";

// TODO
// errors in masked inputs

const Pessoal = ({ action, type, noShadow, finalRoute, hasPassword }) => {
  // const history = useHistory()
  // const { pathname } = useLocation()
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.login);
  //   const { data: usertype } = useSelector((state) => state.usertype);
  const { loading } = useSelector((state) => state.profile);

  const { register, errors, control, handleSubmit } = useForm();

  const [tels, setTels] = useState([0]);
  const [emails, setEmails] = useState([0]);
  const [socials, setSocials] = useState([0]);

  const onSubmit = async (data) => {
    let { name, last_name, cpf, birthdate, file } = data;
    // console.log(data)
    // console.log(file)
    await dispatch(
      edit(type, {
        name,
        last_name,
        cpf,
        birthdate,
        // file,
      })
    ).then(() => {
      if (type === "talento") {
        history.push(`/join/${type}/academico`);
      } else {
        history.push(`/dashboard/${type}`);
      }
    });
  };
  // let array = pathname.split('/')
  // if( type === 'talento' ) {
  //     history.push(`/${array[1]}/${type}/academico`)
  // } else {
  //     history.push(`/dashboard/${type}`)
  // }
  // console.log(array)
  // console.log(data)

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

  const typeFuncionarios = [
    { value: "1 - 5", label: "1 - 5" },
    { value: "6 - 15", label: "6 - 15" },
    { value: "16 - 50", label: "16 - 50" },
    { value: "51 - 100", label: "51 - 100" },
    { value: "+100", label: "+100" },
  ];

  const typeEstado = [
    { value: "Pernambuco", label: "Pernambuco" },
    { value: "Alagoas", label: "Alagoas" },
    { value: "Sergipe", label: "Sergipe" },
  ];

  const typeCidade = [
    { value: "Recife", label: "Recife" },
    { value: "Maceió", label: "Maceió" },
    { value: "Aracaju", label: "Aracaju" },
  ];

  if (type === "talento") {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card noShadow={noShadow}>
          <Title style={{ marginBottom: 32 }}>Dados pessoais</Title>

          <PhotoUpload name="file" ref={register()} />

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
  } else if (type === "empresa") {
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
            <SelectInput
              ref={register()}
              name={`localizacao.estado`}
              control={control}
              errors={errors}
              errorMessage="Selecione um tipo"
              placeholder="Selecione o estado"
              options={typeEstado}
            >
              Estado
            </SelectInput>

            <SelectInput
              ref={register()}
              name={`localizacao.cidade`}
              control={control}
              errors={errors}
              errorMessage="Selecione um tipo"
              placeholder="Selecione a cidade"
              options={typeCidade}
            >
              Cidade
            </SelectInput>
          </InputGroup>

          <InputGroup>
            <InputWithMask
              ref={register()}
              name="cep"
              errors={errors}
              errorMessage="Digite um CEP válido"
              placeholder="Digite o CEP"
              control={control}
              mask={`99999-999`}
            >
              CEP
            </InputWithMask>
          </InputGroup>

          <InputGroup>
            <Input
              ref={register()}
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
  } else {
    return <div className="f">{type}</div>;
  }
};

export { Pessoal };
