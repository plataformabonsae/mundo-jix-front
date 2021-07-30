import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { cnpj } from "cpf-cnpj-validator";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
import { PasswordChecker } from "components/PasswordChecker";
import { Title, Text } from "components/Text";
import { Dialog } from "components/Dialog";

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

import * as colors from "utils/styles/Colors";

import { edit } from "services/auth";
import { cep, cepReset } from "services/adress";

// import history from "utils/history";
// import { isRejected } from "@reduxjs/toolkit";

// TODO
// errors in masked inputs

const Empresa = ({
  type,
  noShadow,
  finalRoute,
  hasPassword,
  redirect,
  dontRedirect,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, loading } = useSelector((state) => state.user);
  // const { data: profile, loading } = useSelector((state) => state.profile);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: cepData } = useSelector((state) => state.cep);

  const { register, errors, control, handleSubmit } = useForm();

  const [passwordModal, setPasswordModal] = useState(false);
  const [changedMainEmail, setChangedMainEmail] = useState(false);
  const [modalChangeEmail, setModalChangeEmail] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [exit, setExit] = useState(false);
  const [cepValues, setCepValues] = useState();

  const [tels, setTels] = useState([]);
  const [emails, setEmails] = useState([]);
  const [socials, setSocials] = useState([]);

  const user = data.user || data.data;

  useEffect(() => {
    if (cepData)
      setCepValues((prev) => ({
        state: cepData?.uf,
        city: cepData?.localidade,
        address: cepData?.logradouro,
        neighborhood: cepData?.bairro,
      }));
  }, [cepData, data]);

  useEffect(() => {
    console.log(cepValues);
  }, [cepValues]);

  useEffect(() => {
    const append = (tel) => {
      setTels((prev) => [...prev, tel]);
    };
    if (data?.phones?.length) {
      for (let i = 0; i < data.phones.length; i++) {
        append({
          phone: data.phones[i].phone,
          phone_type_id: data.phones[i].phone_type_id,
          id: data.phones[i].id,
        });
      }
    } else {
      append({});
    }
    return () => {
      setTels([]);
    };
  }, [data]);

  const handlePasswordModal = () => {
    setPasswordModal((prev) => !prev);
  };

  const onSubmit = async (data) => {
    handleEmailModal("close");
    const { phones, emails, socialMedias } = data;
    // let filtered_phones;
    // let filtered_social_media;
    // for (let i = 0; i < phones?.length; i++) {
    //   filtered_phones = [...phones].filter((phone) => phone.phone);
    // }
    // for (let i = 0; i < socialMedias?.length; i++) {
    //   filtered_social_media = [...socialMedias].filter((social) => social.link);
    // }
    console.log({
      ...data,
      ...cepValues,
      phones: JSON.stringify(phones),
      emails: JSON.stringify(emails) || "{}",
      social_medias: JSON.stringify(socialMedias),
    });
    await dispatch(
      edit(usertype, {
        ...data,
        ...cepValues,
        phones: JSON.stringify(phones),
        emails: JSON.stringify(emails) || "{}",
        social_medias: JSON.stringify(socialMedias),
      })
    )
      .then(() => {
        toast.success("Informações atualizadas", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .then(() => exit && history.push("/dashboard"))
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.errors?.email[0] ===
            "This email is already taken." &&
            "Esse e-mail já está sendo utilizado.",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      });
  };

  const handleCep = (event) => {
    const typed = event.target.value;
    const onlyNumbers = parseInt(typed.replace("-", ""));
    if (onlyNumbers.toString().length === 8) {
      dispatch(cep(onlyNumbers));
    } else {
      dispatch(cepReset());
    }
  };

  const handlePhotoModal = (data) => {
    setPhotoModal((prev) => !prev);
  };

  const handleEmailHasChanged = (state) => {
    setChangedMainEmail(state);
  };

  const handleEmailModal = (state) => {
    if (changedMainEmail)
      setModalChangeEmail((prev) => (state === "close" ? false : !prev));
  };
  const handleUploadPhoto = async (data) => {
    let file;
    await fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        file = new File([blob], "File name", { type: "image/png" });
      });
    await dispatch(
      edit(type, {
        email: user?.email,
        name: user?.name,
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
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card noShadow={noShadow}>
          <Title style={{ marginBottom: 32 }}>Dados cadastrais</Title>

          <PhotoUpload
            name="file"
            upload={handleUploadPhoto}
            dialog={photoModal}
            onClick={handlePhotoModal}
            ref={register()}
            image={user?.file || user?.data?.data?.file}
          />

          <InputGroup>
            <Input
              defaultValue={user?.name}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Máximo 20 caracteres"
              name="name"
              placeholder="Digite o nome da empresa"
            >
              Nome da empresa
            </Input>
          </InputGroup>

          {hasPassword && (
            <Button
              style={{ color: colors.INFORMATION, fontSize: 14 }}
              transparent
              Tag={"span"}
              onClick={() => handlePasswordModal()}
            >
              Mudar senha
            </Button>
          )}

          <InputGroup>
            <Input
              defaultValue={user?.social_reason}
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
              defaultValue={user?.cnpj || user?.data?.cnpj}
              ref={register()}
              rules={{
                validate: (val) => cnpj.isValid(val),
              }}
              name="cnpj"
              errors={errors}
              errorMessage="Digite um CNPJ válido"
              placeholder="Somente números"
              control={control}
              mask={`99.999.999/9999-99`}
            >
              CNPJ
            </InputWithMask>
          </InputGroup>

          <InputGroup>
            <SelectInput
              ref={register()}
              defaultValue={user?.employees_numbers}
              name={`employees_numbers`}
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

          {tels.map((field, index) => {
            return (
              <InputGroup key={index}>
                <InputWithMask
                  defaultValue={field.phone}
                  name={`phones.${index}.phone`}
                  ref={register()}
                  errors={errors}
                  errorMessage="Somente números"
                  placeholder="Digite seu telefone"
                  control={control}
                  mask={`(99) 99999-9999`}
                >
                  Telefone {index + 1}
                </InputWithMask>
                <SelectInput
                  defaultValue={field.phone_type_id}
                  name={`phones.${index}.phone_type_id`}
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

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setTels((prev) => [...prev, prev++])}
              text="Adicionar telefone"
            />
            {tels?.length > 1 && (
              <RemoveGroup
                onClick={() => setTels((state) => [...state].slice(0, -1))}
                text="Remover telefone"
              />
            )}
          </InputGroup>

          <InputGroup style={{ marginTop: 24 }}>
            <Input
              defaultValue={user.email}
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              name={`email`}
              errors={errors}
              onChange={(e) => handleEmailHasChanged(e.target.value)}
              errorMessage="Digite um e-mail válido"
              placeholder="Digite seu melhor e-mail"
            >
              E-mail principal
            </Input>
          </InputGroup>

          {emails.map((email, index) => {
            return (
              <InputGroup key={index}>
                <Input
                  defaultValue={email.email}
                  ref={register({
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Digite um e-mail válido",
                    },
                  })}
                  name={`emails.${index}.email`}
                  errors={errors}
                  errorMessage={`${errors?.emails?.[index]?.email?.message}`}
                  // errorMessage={"Digite um e-mail válido"}
                  placeholder="Digite um e-mail"
                >
                  E-mail {index + 1}
                </Input>
              </InputGroup>
            );
          })}

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setEmails((prev) => [...prev, prev++])}
              text="Adicionar e-mail"
            />
            {emails?.length > 0 && (
              <RemoveGroup
                onClick={() => setEmails((state) => [...state].slice(0, -1))}
                text="Remover e-mail"
              />
            )}
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={{ marginBottom: 32 }}>Localização</Title>

          <InputGroup>
            <InputWithMask
              ref={register({ required: true })}
              name="cep"
              defaultValue={user?.cep}
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
              value={cepValues?.state}
              defaultValue={user?.state}
              onKeyUp={(e) =>
                setCepValues((prev) => ({
                  ...prev,
                  state: e.target.value,
                }))
              }
              name={`state`}
              errors={errors}
              errorMessage="Digite o estado"
              placeholder="Digite o estado"
            >
              Estado
            </Input>

            <Input
              ref={register()}
              disabled={cepData?.localidade ? true : false}
              value={cepValues?.city}
              defaultValue={user?.city}
              name={`city`}
              errors={errors}
              onChange={(e) =>
                setCepValues((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
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
              defaultValue={user?.address}
              value={cepValues?.address}
              name="address"
              errors={errors}
              onChange={(e) =>
                setCepValues((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
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
              defaultValue={user?.neighborhood}
              value={cepValues?.neighborhood}
              name="neighborhood"
              onKeyUp={(e) =>
                setCepValues((prev) => ({
                  ...prev,
                  neighborhood: e.target.value,
                }))
              }
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
              name="address_id"
              defaultValue={user?.address_id}
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
              name="complement"
              defaultValue={user?.complement}
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
          <InputGroup>
            <Input
              defaultValue={user?.link}
              ref={register()}
              errors={errors}
              // errorMessage="Somente números"
              name={`link`}
              placeholder="Link do site"
            >
              Site
            </Input>
          </InputGroup>

          {socials.map((social, index) => {
            return (
              <InputGroup key={index}>
                <Input
                  defaultValue={social.link}
                  ref={register()}
                  errors={errors}
                  errorMessage="Somente números"
                  name={`socialMedias.${index}.link`}
                  placeholder="Cole aqui"
                >
                  Link
                </Input>
                <SelectInput
                  defaultValue={social.platform}
                  ref={register()}
                  name={`socialMedias.${index}.platform`}
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

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setSocials((prev) => [...prev, prev++])}
              text="Adicionar rede social"
            />
            {socials?.length > 1 && (
              <RemoveGroup
                onClick={() => setSocials((state) => [...state].slice(0, -1))}
                text="Remover rede social"
              />
            )}
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={{ marginBottom: 32 }}>Sobre sua empresa</Title>

          <InputGroup>
            <Textarea
              defaultValue={user?.description}
              ref={register()}
              errors={errors}
              errorMessage="Digite sua biografia"
              name={`description`}
              placeholder="Digite sua biografia"
            >
              Sobre sua empresa
            </Textarea>
          </InputGroup>
        </Card>

        <ButtonGroup>
          <Button
            disabled={loading}
            Tag={"button"}
            submit
            onClick={() => !dontRedirect && setExit(true)}
            type={"primary"}
          >
            {dontRedirect ? "Salvar" : "Salvar e sair"}
          </Button>
        </ButtonGroup>
        {modalChangeEmail && (
          <Dialog header={"Email principal"} handleClose={handleEmailModal}>
            <Title size={18}>Confirma mudança de e-mail principal?</Title>
            <Text style={{ margin: "12px 0" }}>
              Se confirmar, você passará a entrar pelo e-mail
              <span style={{ display: "block", fontWeight: "bold" }}>
                {changedMainEmail}
              </span>
            </Text>
            <ButtonGroup>
              <Button
                Tag={"span"}
                disabled={loading}
                type="tertiary"
                style={{ marginRight: 12 }}
                onClick={() => handleEmailModal()}
              >
                Cancelar
              </Button>
              <Button disabled={loading} Tag="button" type="primary">
                Salvar
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </form>
      {passwordModal && <ChangePassword handleDialog={handlePasswordModal} />}
      {loading && <Loading />}
    </>
  );
};

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data, loading } = useSelector((state) => state.user);
  const { register, errors, handleSubmit } = useForm();

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    return () => {
      setPassword();
      setConfirmPassword();
    };
  }, []);

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
      style={{ minWidth: 400, overflow: "inherit" }}
      header={"Mudar senha"}
      handleClose={props.handleDialog}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          ref={register({ required: true })}
          name={"email"}
          value={data?.user?.email || data?.data?.email}
        />
        <input
          type="hidden"
          ref={register({ required: true })}
          name={"name"}
          value={data?.user?.name || data?.data?.name}
        />
        <InputGroup style={{ position: "relative" }}>
          <Input
            disabled={loading}
            ref={register({
              required: {
                value: true,
                message: "Digite a senha",
              },
              minLength: {
                value: 8,
                message: "A senha precisa ter pelo menos 8 caracteres.",
              },
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                message:
                  "A senha precisa conter 1 caractere especial, 1 letra miníscula, 1 letra maiúscula e um número.",
              },
            })}
            type="password"
            name="password"
            errors={errors}
            errorMessage={
              errors?.password?.type === "pattern"
                ? "paternet"
                : errors?.password?.message
            }
            placeholder="Digite a senha"
            onKeyUp={(e) => setPassword(e.target.value)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            Senha
          </Input>
          {showTooltip && (
            <PasswordChecker
              style={{ left: "50%" }}
              password={password}
              confirmPassword={confirmPassword}
              setValid={setAllValid}
              isValid={allValid}
            />
          )}
        </InputGroup>
        <InputGroup>
          <Input
            autocomplete="off"
            disabled={loading}
            ref={register({
              required: {
                value: true,
                message: "Repita a senha",
              },
              validate: (e) => confirmPassword === password,
            })}
            type="password"
            name="confirm_password"
            errors={errors}
            errorMessage={errors?.confirm_password?.message}
            placeholder="Digite a senha novamente"
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
            Confirme a senha
          </Input>
        </InputGroup>

        <Button
          submit
          disabled={loading || !allValid}
          Tag="button"
          type="green"
        >
          Atualizar senha
        </Button>
      </form>
    </Dialog>
  );
};

export { Empresa };
