import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import { cpf } from "cpf-cnpj-validator";
import { useSelector, useDispatch } from "react-redux";

import { Card } from "components/Card";
import { PasswordChecker } from "components/PasswordChecker";
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

const Pessoal = ({
  type,
  noShadow,
  finalRoute,
  hasPassword,
  redirect,
  dontRedirect,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { data, loading } = useSelector((state) => state.user);
  const { data: usertype } = useSelector((state) => state.usertype);
  const [passwordModal, setPasswordModal] = useState(false);
  const [changedMainEmail, setChangedMainEmail] = useState(false);
  const [modalChangeEmail, setModalChangeEmail] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  // const [cpfControl, setCpfControl] = useState(false);
  const user = data.user || data.data;
  const { register, errors, control, handleSubmit } = useForm({
    reValidateMode: "onChange",
  });
  const [tels, setTels] = useState([]);
  const [emails, setEmails] = useState([]);
  // const [emailError, setEmailError] = useState();
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const append = (tel) => {
      setTels((prev) => [...prev, tel]);
    };
    if (data.phones.length) {
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

  useEffect(() => {
    const append = (tel) => {
      setEmails((prev) => [...prev, tel]);
    };
    if (data.emails.length) {
      for (let i = 0; i < data.emails.length; i++) {
        append(data.emails[i]);
      }
    } else {
      append({});
    }
    return () => {
      setEmails([]);
    };
  }, [data]);

  useEffect(() => {
    const append = (tel) => {
      setSocials((prev) => [...prev, tel]);
    };
    if (data?.socialMedias?.length) {
      for (let i = 0; i < data.socialMedias.length; i++) {
        append(data.socialMedias[i]);
      }
    } else {
      append({});
    }
    if (data?.social_medias?.length) {
      for (let i = 0; i < data.social_medias.length; i++) {
        append(data.social_medias[i]);
      }
    } else {
      append({});
    }
    return () => {
      setSocials([]);
    };
  }, [data]);

  // useEffect(() => {
  //   console.log(cpf.isValid(cpfControl));
  // }, [cpfControl]);

  const handlePasswordModal = () => {
    setPasswordModal((prev) => !prev);
  };

  const handleEmailHasChanged = (state) => {
    setChangedMainEmail(state);
  };

  const handleEmailModal = (state) => {
    if (changedMainEmail)
      setModalChangeEmail((prev) => (state === "close" ? false : !prev));
  };

  const onSubmit = async (data) => {
    // let { email, name, last_name, cpf, phones, birthdate } = data;
    handleEmailModal("close");
    const { phones, emails, socialMedias } = data;
    let filtered_phones;
    let filtered_social_media;
    for (let i = 0; i < phones.length; i++) {
      filtered_phones = [...phones].filter((phone) => phone.phone);
    }
    for (let i = 0; i < socialMedias.length; i++) {
      filtered_social_media = [...socialMedias].filter((social) => social.link);
    }
    await dispatch(
      edit(usertype, {
        ...data,
        phones: JSON.stringify(filtered_phones),
        emails: JSON.stringify(emails) || "{}",
        social_medias: JSON.stringify(filtered_social_media),
      })
    )
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
        console.log(error.response.data);
        toast.error(
          error.response.data.errors.email[0] ===
            "This email is already taken." &&
            "Esse e-mail já está sendo utilizado.",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      });
  };

  const handleNascimento = (val) => {
    let value = val;
    let array = value.split("/").map((x) => +x);

    return new Date(array[2] + 16, array[1] - 1, array[0]) <= new Date();
  };

  const typeTel = [
    { value: "Celular", label: "Celular" },
    { value: "Profissional", label: "Profissional" },
    { value: "Pessoal", label: "Pessoal" },
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

  const marginTitulo = {
    marginBottom: 32,
  };

  if (!user) {
    return <Loading />;
  } else {
    return (
      <>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Card noShadow={noShadow}>
            <Title style={marginTitulo}>Dados pessoais</Title>
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
                defaultValue={user?.last_name || user?.data?.last_name}
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
                defaultValue={user?.cpf || user?.data?.cpf}
                ref={register()}
                rules={{
                  validate: (val) => cpf.isValid(val),
                }}
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
                required
                defaultValue={user?.birthdate || user?.data?.birthdate}
                ref={register}
                rules={{
                  required: true,
                  validate: (val) => handleNascimento(val),
                }}
                name="birthdate"
                errors={errors}
                errorMessage="Você precisa ter mais que 16 anos"
                placeholder="Somente números"
                control={control}
                mask={`99/99/9999`}
              >
                Data de nascimento
              </InputWithMask>
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
          </Card>

          <Card noShadow={noShadow}>
            <Title style={{ marginBottom: 32 }}>Contato</Title>

            {tels.map((field, index) => {
              // console.log(field);
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
                    Telefone {++index}
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
            <Title style={{ marginBottom: 32 }}>Redes sociais</Title>

            {socials.map((social, index) => {
              return (
                <InputGroup key={index}>
                  <Input
                    defaultValue={social.link}
                    ref={register()}
                    errors={errors}
                    errorMessage="Somente números"
                    name={`socialMedias.${index}.link`}
                    placeholder="Link da rede social"
                  >
                    Cole aqui
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

            {/* {!socials[0]?.link && (
              <InputGroup>
                <Input
                  defaultValue={""}
                  ref={register()}
                  errors={errors}
                  errorMessage="Somente números"
                  name={`socialMedias.0.link`}
                  placeholder="Link da rede social"
                >
                  Cole aqui
                </Input>
                <SelectInput
                  defaultValue={""}
                  ref={register()}
                  name={`socialMedias.0.platform`}
                  control={control}
                  errors={errors}
                  errorMessage="Selecione um tipo"
                  placeholder="Selecione a rede social"
                  options={typeSocial}
                >
                  Tipo de rede
                </SelectInput>
              </InputGroup>
            )} */}

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
            <Title style={{ marginBottom: 32 }}>Sobre você</Title>

            <InputGroup>
              <Textarea
                defaultValue={`${user?.description || ""}`}
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
            {!dontRedirect && (
              <Button
                disabled={loading}
                to={finalRoute ? finalRoute : `/dashboard`}
                type="outlineWhite"
              >
                Salvar e sair
              </Button>
            )}
            <Button
              disabled={loading}
              Tag={changedMainEmail ? "span" : "button"}
              onClick={() => (changedMainEmail ? handleEmailModal() : null)}
              type="secondary"
            >
              {dontRedirect ? "Salvar" : "Continuar"}
            </Button>
          </ButtonGroup>
          {modalChangeEmail && (
            <Dialog
              // style={{ minWidth: 400 }}
              header={"Email principal"}
              handleClose={handleEmailModal}
            >
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
  }
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

export { Pessoal };
