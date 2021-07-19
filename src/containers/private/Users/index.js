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
    // const req =
    try {
      dispatch(get(usertype, { challenge_id: id }));
      // console.log(req());
    } catch (e) {
      console.log(e);
    }
    // console.log;
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
          {users?.users?.map((item, index) => (
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

  return (
    <ModalPage title={"Ver mais"} handleClose={() => props.setModal(null)}>
      <Card>
        <Title style={{ marginBottom: 32 }}>Formação acadêmica</Title>

        {academic.map((fields, index) => {
          return (
            <section key={index} style={{ marginTop: 24 }}>
              <InputGroup>
                <Input defaultValue={fields.level_of_education}>
                  Nível de escolaridade
                </Input>
              </InputGroup>

              <InputGroup>
                <Input defaultValue={fields.degree} disabled={true}>
                  Grau
                </Input>
              </InputGroup>

              <InputGroup>
                <Input defaultValue={fields.status}>Status</Input>
              </InputGroup>

              <InputGroup>
                <Input defaultValue={fields.institution}>Instituição</Input>
              </InputGroup>

              <InputGroup>
                <Input defaultValue={fields.course}>Curso</Input>
              </InputGroup>

              <InputGroup>
                <Input defaultValue={fields.start_date}>Início</Input>
                <Input defaultValue={fields.end_date}>Término</Input>
              </InputGroup>
            </section>
          );
        })}
      </Card>
      <Card>
        <Title style={{ marginBottom: 32 }}>Perspectivas</Title>

        <InputGroup>
          <Input defaultValue={"user?.user?.current_situation"}>
            Situação atual
          </Input>
        </InputGroup>

        <InputGroup>
          <Input defaultValue={"user?.user?.looking_for"}>O que busca?</Input>
        </InputGroup>
      </Card>

      <Card>
        <Title style={{ marginBottom: 32 }}>Skills</Title>
        {/* {console.log(availableSkills[0])} */}
        <InputGroup>
          <Input defaultValue={"skillsChange"} />
        </InputGroup>
      </Card>

      <Card>
        <Title style={{ marginBottom: 32 }}>Portfolio</Title>

        {portfolios.map((field, index) => {
          return (
            <InputGroup>
              <Input defaultValue={field.link}>Link</Input>
              <Input defaultValue={field.platform}>Plataforma</Input>
            </InputGroup>
          );
        })}
      </Card>

      <Card>
        <Title style={{ marginBottom: 32 }}>Currículo</Title>

        {/* <InputGroup>
          {user?.user?.curriculum_file && (
            <File
              file={user.user.curriculum_file}
              name={user.user.curriculum_filename}
              extension={user.user.curriculum_fileextension}
            />
          )}
        </InputGroup> */}
      </Card>

      <Card>
        <Title style={{ marginBottom: 32 }}>Experiência Profissional</Title>

        {experiences.map((field, index) => {
          return (
            <div key={index}>
              <InputGroup>
                <Input defaultValue={field.role}>Cargo</Input>
              </InputGroup>

              <InputGroup>
                <Input defaultValue={field.company}>Empresa</Input>
              </InputGroup>

              <InputGroup>
                <Input defaultValue={field.start_date}>Início</Input>
                {/* {console.log(currentJob[index].status)} */}

                <Input
                  defaultValue={
                    '(currentJob[index].status && " ") || field.end_date'
                  }
                >
                  Término
                </Input>
              </InputGroup>

              <InputGroup>
                <Textarea defaultValue={field.main_activities}>
                  Principais atividades
                </Textarea>
              </InputGroup>
            </div>
          );
        })}
      </Card>

      <Card>
        <Title style={{ marginBottom: 32 }}>Outros links</Title>
        {links.map((field, index) => {
          return (
            <InputGroup key={index}>
              <Input defaultValue={field.link}>Link</Input>
              <Input defaultValue={field.platform}>Tipo de rede</Input>
            </InputGroup>
          );
        })}
      </Card>
    </ModalPage>
  );
};

export { Users };
