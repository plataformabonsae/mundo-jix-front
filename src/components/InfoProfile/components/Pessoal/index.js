import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import { cpf } from "cpf-cnpj-validator";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
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
  const { data, loading } = useSelector((state) => state.user);
  const [, updateState] = React.useState();
  const user = data.user || data.data;
  // const { data: profile, loading } = useSelector((state) => state.profile);
  const { register, errors, control, handleSubmit } = useForm();
  // const {
  //   fields,
  //   append,
  //   prepend,
  //   // remove,
  //   // swap,
  //   // move,
  //   // insert,
  // } = useFieldArray({
  //   control,
  //   name: "phones", // unique name for your Field Array
  //   // keyName: "id", default to "id", you can change the key name
  // });
  const [tels, setTels] = useState([]);
  const [emails, setEmails] = useState([0]);
  const [socials, setSocials] = useState([0]);

  useEffect(() => {
    // if (!!data?.phones?.length) {
    const append = (tel) => {
      setTels((prev) => [...prev, tel]);
    };
    for (let i = 0; i < data.phones.length; i++) {
      append({
        phone: data.phones[i].phone,
        type: data.phones[i].phone_type_id,
        id: data.phones[i].id,
      });
    }
    return () => {
      setTels([]);
    };
    // data.phones.map((item) =>
    //   append([
    //     {
    //       phone: item.phone,
    //       type: item.phone_type_id,
    //     },
    //   ])
    // );
    // }
    // return () => {};
  }, [data]);

  // const handleAppend = () => {
  //   append({ phone: "12345678", type: "1" });
  // };

  const onSubmit = async (data) => {
    let { name, last_name, cpf, file, password, confirm_password, phones } =
      data;
    console.log(data);
    await dispatch(
      edit(type, {
        // file: file[0],
        email: user.email,
        name,
        last_name,
        cpf,
        phones,
        // password,
        // confirm_password,
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

    // if (password === confirm_password) {
    //   await dispatch(
    //     edit(type, {
    //       password,
    //       confirm_password,
    //     })
    //   )
    //     .then(() => {
    //       toast.success("Senha atualizada com sucesso", {
    //         position: toast.POSITION.BOTTOM_RIGHT,
    //       });
    //     })
    //     .catch((error) => {
    //       toast.error(
    //         "Algum erro ocorreu ao atualizar a senha, por favor tente novamente",
    //         {
    //           position: toast.POSITION.BOTTOM_RIGHT,
    //         }
    //       );
    //       console.log(error);
    //     });
    // }
  };

  const handleNascimento = (val) => {
    let value = val;
    let array = value.split("/").map((x) => +x);

    return new Date(array[2] + 18, array[1] - 1, array[0]) <= new Date();
  };

  const typeTel = [
    { value: 1, label: "Celular" },
    { value: 2, label: "Profissional" },
    { value: 3, label: "Pessoal" },
  ];

  const typeSocial = [
    { value: "Instagram", label: "Instagram" },
    { value: "Facebook", label: "Facebook" },
    { value: "Linkedin", label: "Linkedin" },
    { value: "Twitter", label: "Twitter" },
    { value: "TikTok", label: "TikTok" },
  ];

  if (!user) {
    return <Loading />;
  } else {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <Card noShadow={noShadow}>
          <Title style={{ marginBottom: 32 }}>Dados pessoais</Title>

          <PhotoUpload
            name="file"
            ref={register()}
            image={user?.file || user?.data?.file || ""}
          />

          <InputGroup>
            <Input
              defaultValue={user.name || user.data.name}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Digite seu primeiro nome"
              name="name"
              placeholder="Digite seu primeiro nome"
            >
              Nome
            </Input>
            <Input
              defaultValue={user.last_name || user.data.last_name}
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
              defaultValue={user.cpf || user.data.cpf}
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
              defaultValue={user?.birthdate || user?.data?.birthdate}
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
                defaultValue={""}
                // disabled={true}
                ref={register()}
                type="password"
                name="password"
                errors={errors}
                errorMessage="Digite uma senha válida"
                placeholder="Digite a senha"
              >
                Senha
              </Input>
              <Input
                defaultValue={""}
                // disabled={true}
                ref={register()}
                type="password"
                name="confirm_password"
                errors={errors}
                errorMessage="Digite uma senha válida"
                placeholder="Digite a senha"
              >
                Confirme a senha
              </Input>
            </InputGroup>
          ) : null}
        </Card>

        <Card noShadow={noShadow}>
          <Title style={{ marginBottom: 32 }}>Contato</Title>
          {tels?.map((field, index) => {
            // console.log(field);
            return (
              <InputGroup key={field.id}>
                <InputWithMask
                  defaultValue={`${field.phone}`}
                  name={`phones.new.[${index}].phone`}
                  ref={register()}
                  errors={errors}
                  errorMessage="Somente números"
                  placeholder="Digite seu telefone"
                  control={control}
                  mask={`(99) 99999-9999`}
                >
                  Telefone
                </InputWithMask>
                <SelectInput
                  defaultValue={field.type}
                  name={`phones[new][${index}].phone_type_id`}
                  ref={register()}
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

          {/* {phones?.length > 1 && (
            <RemoveGroup
              onClick={() => setTels((state) => [...state].slice(0, -1))}
              text="Remover telefone"
            />
          )} */}
          <AddGroup
            // onClick={() => {()}}
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
  }
};

export { Pessoal };
