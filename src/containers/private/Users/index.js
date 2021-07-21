import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pdf from "react-to-pdf";

import { TitleAndBack } from "components/TitleAndBack";
import { ModalPage } from "components/ModalPage";
import { Card } from "components/Card";
import { Title, Text } from "components/Text";
import Button from "components/Button";
import { Input, InputGroup, Textarea } from "components/Inputs";

import styles from "./styles.module.sass";

import prize from "assets/icons/prize.svg";
import person from "assets/icons/person.svg";
import telephone from "assets/icons/telephone.svg";
import mail from "assets/icons/mail.svg";
import social from "assets/icons/social.svg";

import { get } from "services/users";
import { BASEURL } from "utils/api";

import profile from "assets/logo/JixProfile.png";

const Users = (props) => {
  const dispatch = useDispatch();
  const { data: users } = useSelector((state) => state.users);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: challenge } = useSelector((state) => state.challenge);
  const [modal, setModal] = useState(null);
  const { id } = useParams();
  const ref = React.createRef();

  const handleModal = (data) => {
    setModal(data);
  };

  useEffect(() => {
    dispatch(get(usertype, { challenge_id: id }));
  }, [dispatch, usertype, id]);

  return (
    <div className={styles.wrapper}>
      <TitleAndBack data={challenge?.challenge} />
      <div className={styles.table}>
        <header className={styles.header}>
          <Title size={18}>Lista de participantes</Title>
          <Pdf
            targetRef={ref}
            scale={0.6}
            filename={`${challenge?.challenge?.name} - Participantes.pdf`}
          >
            {({ toPdf }) => (
              <Button Tag={"span"} type={"secondary"} onClick={toPdf}>
                Baixar
              </Button>
            )}
          </Pdf>
        </header>
        <div ref={ref} className={styles.table__content}>
          <div className={styles.row}>
            <div className={styles.block}>
              <img src={prize} alt="Pontuação" />
            </div>

            <div className={styles.block}>
              <img src={person} alt="Participante" /> <Text>Participante</Text>
            </div>

            <div className={styles.block}>
              <img src={telephone} alt="Telefone" /> <Text>Telefone</Text>
            </div>

            <div className={styles.block}>
              <img src={mail} alt="E-mail" /> <Text>E-mail</Text>
            </div>

            <div className={styles.block}>
              <img src={social} alt="Redes sociais" />{" "}
              <Text>Redes sociais</Text>
            </div>
          </div>
          {users?.users?.data?.map((item, index) => (
            <div
              className={styles.row}
              key={index}
              onClick={() => handleModal(item)}
            >
              <div className={styles.block}>
                {/* <img src={prize} alt="Pontuação" /> */}
                {index + 1}
              </div>

              <div className={styles.block}>
                <Title size={16} style={{ fontWeight: "normal" }}>
                  <img
                    className={styles.profile}
                    src={item.file ? BASEURL + item.file : profile}
                    alt="Pontuação"
                  />
                  {item.name} {item.last_name}
                </Title>
              </div>

              <div className={styles.block}>
                <Title size={16} style={{ fontWeight: "normal" }}>
                  {item.phone ? item.phone : "Sem telefone"}
                </Title>
              </div>

              <div className={styles.block}>
                <Title size={16} style={{ fontWeight: "normal" }}>
                  {item.email}
                </Title>
              </div>

              <div className={styles.block}>
                <Title size={16} style={{ fontWeight: "normal" }}>
                  {item.phone ? item.phone : "Sem Redes sociais"}
                </Title>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && <Modal data={modal} setModal={setModal} />}
    </div>
  );
};

const Modal = (props) => {
  const [academic, setAcademic] = useState([]);
  const [links, setLinks] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [tels, setTels] = useState([]);
  const [emails, setEmails] = useState([]);
  // const [emailError, setEmailError] = useState();
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const append = (tel) => {
      setAcademic((prev) => [...prev, tel]);
    };

    if (props.data.academicformations.length) {
      for (let i = 0; i < props.data.academicformations.length; i++) {
        append(props.data.academicformations[i]);
      }
    } else {
      append({});
    }

    return () => {
      setAcademic([]);
    };
  }, [props.data]);

  useEffect(() => {
    const append = (tel) => {
      setTels((prev) => [...prev, tel]);
    };
    if (props.data.phones.length) {
      for (let i = 0; i < props.data.phones.length; i++) {
        append({
          phone: props.data.phones[i].phone,
          phone_type_id: props.data.phones[i].phone_type_id,
          id: props.data.phones[i].id,
        });
      }
    } else {
      append({});
    }
    return () => {
      setTels([]);
    };
  }, [props.data]);

  useEffect(() => {
    const append = (tel) => {
      setEmails((prev) => [...prev, tel]);
    };
    if (props.data.emails.length) {
      for (let i = 0; i < props.data.emails.length; i++) {
        append(props.data.emails[i]);
      }
    } else {
      append({});
    }
    return () => {
      setEmails([]);
    };
  }, [props.data]);

  useEffect(() => {
    const append = (tel) => {
      setSocials((prev) => [...prev, tel]);
    };
    if (props.data?.socialMedias?.length) {
      for (let i = 0; i < props.data.socialMedias.length; i++) {
        append(props.data.socialMedias[i]);
      }
    } else {
      append({});
    }
    if (props.data?.social_medias?.length) {
      for (let i = 0; i < props.data.social_medias.length; i++) {
        append(props.data.social_medias[i]);
      }
    } else {
      append({});
    }
    return () => {
      setSocials([]);
    };
  }, [props.data]);

  const marginTitulo = {
    marginBottom: 32,
  };

  useEffect(() => {
    console.log(props.data);
  }, [props]);

  return (
    <ModalPage title={"Ver mais"} handleClose={() => props.setModal(null)}>
      <div className={styles.modal__wrapper}>
        <Card>
          <Title style={marginTitulo}>Dados pessoais</Title>
          <div className={styles.profile}>
            <div className={styles.image}>
              <img
                src={props.data.file ? BASEURL + props.data.file : profile}
                alt={props.data.name}
              />
              {/* <T.Text weight="bold" size={12} className={styles.location}>
            {location}º
          </T.Text> */}
            </div>
          </div>
          <InputGroup>
            <Input readOnly value={props.name || props.data.name}>
              Nome
            </Input>
            <Input readOnly value={props?.last_name || props?.data?.last_name}>
              Sobrenome
            </Input>
          </InputGroup>
          <InputGroup>
            <Input readOnly value={props?.cpf || props?.data?.cpf}>
              CPF
            </Input>
            <Input readOnly value={props?.birthdate || props?.data?.birthdate}>
              Data de nascimento
            </Input>
          </InputGroup>
        </Card>

        <Card>
          <Title style={{ marginBottom: 32 }}>Contato</Title>

          {tels.map((field, index) => {
            return (
              <InputGroup key={index}>
                <Input readOnly value={field.phone}>
                  Telefone {index + 1}
                </Input>
                <Input readOnly value={field.phone_type_id}>
                  Tipo de telefone
                </Input>
              </InputGroup>
            );
          })}

          <InputGroup style={{ marginTop: 24 }}>
            <Input readOnly value={props.data.email}>
              E-mail principal
            </Input>
          </InputGroup>

          {emails.length > 0 &&
            emails.map((email, index) => {
              return (
                <InputGroup key={index}>
                  <Input readOnly value={email.email}>
                    E-mail {index + 1}
                  </Input>
                </InputGroup>
              );
            })}
        </Card>

        <Card>
          <Title style={{ marginBottom: 32 }}>Redes sociais</Title>

          {socials.map((social, index) => {
            return (
              <InputGroup key={index}>
                <Input readOnly value={social.link}>
                  Link da rede social
                </Input>
                <Input readOnly value={social.platform}>
                  Tipo de rede
                </Input>
              </InputGroup>
            );
          })}
          <Textarea readyOnly value={props.data.description}>
            Biografia
          </Textarea>
        </Card>
        <Card>
          <Title style={{ marginBottom: 32 }}>Formação acadêmica</Title>

          {academic.map((fields, index) => {
            return (
              <section key={index} style={{ marginTop: 24 }}>
                <InputGroup>
                  <Input readyOnly value={fields.level_of_education}>
                    Nível de escolaridade
                  </Input>
                </InputGroup>

                <InputGroup>
                  <Input readyOnly value={fields.degree}>
                    Grau
                  </Input>
                </InputGroup>

                <InputGroup>
                  <Input readyOnly value={fields.status}>
                    Status
                  </Input>
                </InputGroup>

                <InputGroup>
                  <Input readyOnly value={fields.institution}>
                    Instituição
                  </Input>
                </InputGroup>

                <InputGroup>
                  <Input readyOnly value={fields.course}>
                    Curso
                  </Input>
                </InputGroup>

                <InputGroup>
                  <Input readyOnly value={fields.start_date}>
                    Início
                  </Input>
                  <Input readyOnly value={fields.end_date}>
                    Término
                  </Input>
                </InputGroup>
              </section>
            );
          })}
        </Card>
      </div>
    </ModalPage>
  );
};

export { Users };
