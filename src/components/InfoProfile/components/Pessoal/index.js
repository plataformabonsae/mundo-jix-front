import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import { cpf } from "cpf-cnpj-validator";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { Dialog } from "components/Dialog";
import { Loading } from "components/Loading";
import { Title, Text } from "components/Text";
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

import { removeLastPath } from "utils/etc";

import "react-toastify/dist/ReactToastify.css";

import * as colors from "utils/styles/Colors";

// import history from "utils/history";
// import { isRejected } from "@reduxjs/toolkit";

// TODO
// errors in masked inputs

const Pessoal = ({
  action,
  type,
  noShadow,
  finalRoute,
  hasPassword,
  dontRedirect,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { data, loading } = useSelector((state) => state.user);
  const { data: usertype } = useSelector((state) => state.usertype);
  const [passwordModal, setPasswordModal] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const user = data.user || data.data;
  const { register, errors, control, handleSubmit } = useForm();
  const [tels, setTels] = useState([0]);
  const [emails, setEmails] = useState([]);
  const [socials, setSocials] = useState([0]);

  useEffect(() => {
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
  }, [data]);

  const handlePasswordModal = () => {
    setPasswordModal((prev) => !prev);
  };

  const onSubmit = async (data) => {
    // let { email, name, last_name, cpf, phones, birthdate } = data;
    // console.log(data);
    await dispatch(edit(usertype, data))
      .then(() => {
        toast.success("Informações atualizadas", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .then(
        () =>
          !dontRedirect &&
          history.push(removeLastPath(location.pathname) + "/academico")
      )
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
    { value: 1, label: "Celular" },
    { value: 2, label: "Profissional" },
    { value: 3, label: "Pessoal" },
  ];
  // const typeTel = ["Celular", "Profissional", "Pessoal"];

  const typeSocial = [
    { value: "Instagram", label: "Instagram" },
    { value: "Facebook", label: "Facebook" },
    { value: "Linkedin", label: "Linkedin" },
    { value: "Twitter", label: "Twitter" },
    { value: "TikTok", label: "TikTok" },
  ];

  const handlePhotoModal = (data) => {
    setPhotoModal((prev) => !prev);
  };

  const handleUploadPhoto = async (data) => {
    console.log(data);
    let file;
    await fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        file = new File([blob], "File name", { type: "image/png" });
      });
    await dispatch(
      edit(type, {
        email: user.email,
        name: user.name,
        file,
      })
    )
      .then(() => {
        toast.success("Imagem enviada com sucesso", {
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

  if (!user) {
    return <Loading />;
  } else {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ToastContainer />
          <Card noShadow={noShadow}>
            <Title style={{ marginBottom: 32 }}>Dados pessoais</Title>

            <PhotoUpload
              name="file"
              upload={handleUploadPhoto}
              dialog={photoModal}
              onClick={handlePhotoModal}
              ref={register()}
              image={user?.file || user?.data?.data?.file || ""}
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
            {hasPassword && (
              <Button
                style={{ color: colors.BLUE_1, fontSize: 14 }}
                transparent
                Tag={"span"}
                onClick={() => handlePasswordModal()}
              >
                Mudar senha
              </Button>
            )}
          </Card>

          <Card noShadow={noShadow}>
            <Title style={{ marginBottom: 32 }}>Contato</Title>
            {tels.map((field, index) => {
              // console.log(field);
              return (
                <InputGroup key={index}>
                  <InputWithMask
                    defaultValue={`${field.phone}`}
                    name={`phones[new][][phone]`}
                    ref={register()}
                    errors={errors}
                    errorMessage="Somente números"
                    placeholder="Digite seu telefone"
                    control={control}
                    mask={`(99) 99999-9999`}
                  >
                    Telefone {++index}
                  </InputWithMask>
                  <SelectInput
                    defaultValue={field.type}
                    name={`phones[new][][phone_type_id]`}
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

            {tels?.length > 1 && (
              <RemoveGroup
                onClick={() => setTels((state) => [...state].slice(0, -1))}
                text="Remover telefone"
              />
            )}
            <AddGroup
              onClick={() => setTels((prev) => [...prev, prev++])}
              text="Adicionar telefone"
            />

            <InputGroup>
              <Input
                defaultValue={user.email}
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                name={`email`}
                errors={errors}
                errorMessage="Digite um e-mail válido"
                placeholder="Digite seu melhor e-mail"
              >
                E-mail principal
              </Input>
            </InputGroup>

            {emails.map((_, index) => {
              return (
                <InputGroup key={index}>
                  <Input
                    // defaultValue={user.email}
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    name={`emails[new][${index}][email]`}
                    errors={errors}
                    errorMessage="Digite um e-mail válido"
                    placeholder="Digite um e-mail"
                  >
                    E-mail {index + 2}
                  </Input>
                </InputGroup>
              );
            })}

            {emails.length > 0 && (
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
                defaultValue={`${user?.description}`}
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
              to={finalRoute ? finalRoute : `/dashboard`}
              type="outlineWhite"
            >
              Salvar e sair
            </Button>
            <Button disabled={loading} Tag="button" type="secondary">
              Continuar
            </Button>
          </ButtonGroup>
        </form>
        {passwordModal && <ChangePassword handleDialog={handlePasswordModal} />}
      </>
    );
  }
};

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: user, loading } = useSelector((state) => state.user);
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { email, password, confirm_password, name } = data;
    await dispatch(
      edit(usertype, {
        email,
        name,
        password,
        confirm_password,
      })
    )
      .then(() => {
        toast.success("Senha atualizada com sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(
          "Algum erro ocorreu ao atualizar a senha, por favor tente novamente",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        // console.log(error);
      });
  };

  return (
    <Dialog
      style={{ minWidth: 400 }}
      header={"Mudar senha"}
      handleClose={props.handleDialog}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          ref={register({ required: true })}
          name={"email"}
          value={user?.user?.email}
        />
        <input
          type="hidden"
          ref={register({ required: true })}
          name={"name"}
          value={user?.user?.name}
        />
        <InputGroup>
          <Input
            defaultValue={""}
            disabled={loading}
            ref={register({
              required: true,
              validate: password === confirmPassword,
            })}
            type="password"
            name="password"
            errors={errors}
            errorMessage="Digite uma senha válida"
            placeholder="Digite a senha"
            onChange={(e) => setPassword(e.target.value)}
          >
            Senha
          </Input>
        </InputGroup>
        <InputGroup>
          <Input
            defaultValue={""}
            disabled={loading}
            ref={register({
              required: true,
              validate: password === confirmPassword,
            })}
            type="password"
            name="confirm_password"
            errors={errors}
            errorMessage="Digite uma senha válida"
            placeholder="Digite a senha novamente"
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
            Confirme a senha
          </Input>
        </InputGroup>
        {password !== confirmPassword && (
          <Text size={14} style={{ marginBottom: 12 }}>
            {" "}
            As senhas precisam ser iguais.{" "}
          </Text>
        )}
        <Button
          disabled={
            loading || password !== confirmPassword || !password?.length
          }
          Tag="button"
          submit
          type="green"
        >
          Atualizar senha
        </Button>
      </form>
    </Dialog>
  );
};

export { Pessoal };
