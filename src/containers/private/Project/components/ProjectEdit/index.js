import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
// import { removeLastPath } from "utils/etc";

// import { validationSchema } from "utils/etc";

import { Text, Title } from "components/Text";
import Button from "components/Button";
import {
  Input,
  InputGroup,
  InputFile,
  Textarea,
  AddGroup,
  RemoveGroup,
  SelectInput,
} from "components/Inputs";

// import { sanitize } from "utils/etc";

import { get, getEdit, post, update } from "services/project";

import styles from "./styles.module.sass";

const fileSchema = yup.object().shape({
  materials_1: yup
    .mixed()
    .test(
      "",
      "O arquivo deve ter até 8MB",
      (value) => !value.length || value[0].size <= 8000000
    ),
});

const ProjectEdit = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: usertype } = useSelector((state) => state.usertype);
  const {
    current: project,
    data,
    loading,
  } = useSelector((state) => state.project);
  const [countResume, setCountResume] = useState(
    props?.data?.resume?.length || 0
  );
  const [materials, setMaterials] = useState([]);
  const [links, setLinks] = useState([]);
  const [pitch, setPitchs] = useState([]);
  const { register, errors, control, handleSubmit } = useForm({
    mode: "onBlur",
  });
  // const resolver = validationSchema(fileSchema);

  useEffect(() => {
    props.id &&
      dispatch(getEdit(usertype, { project_id: props.id }))
        .then((res) => {})
        .catch((err) => {});
  }, [dispatch, usertype, id, props.id, data]);

  useEffect(() => {
    const append = (link) => {
      setLinks((prev) => [...prev, link]);
    };
    if (project?.project?.links.length) {
      for (let i = 0; i < project.project.links.length; i++) {
        append({
          link: project.project.links[i].link,
          type: project.project.links[i].type,
        });
      }
    } else {
      append({});
    }
    return () => {
      setLinks([]);
    };
  }, [project?.project]);

  useEffect(() => {
    const append = (material) => {
      setMaterials((prev) => [...prev, material]);
    };
    if (project?.project?.links.length) {
      for (let i = 0; i < project.project.links.length; i++) {
        append({
          // link: project.project.links[i].link,
          // name: project.project.links[i].type,
        });
      }
    } else {
      append({});
    }
    return () => {
      setMaterials([]);
    };
  }, [project?.project]);

  useEffect(() => {
    const append = (link) => {
      setPitchs((prev) => [...prev, link]);
    };
    if (project?.project?.videos?.length) {
      for (let i = 0; i <= project.project.videos.length; i++) {
        append(project.project.videos[i]);
      }
    } else {
      append({});
    }
    return () => {
      setPitchs([]);
    };
  }, [project?.project]);

  const handleCountChar = (e) => {
    setCountResume(e.target.value.length);
  };

  const typeSocial = [
    { value: "Facebook", label: "Facebook" },
    { value: "Youtube", label: "Youtube" },
    { value: "Google Drive", label: "Google Drive" },
    { value: "One Drive", label: "One Drive" },
    { value: "Twitter", label: "Twitter" },
    { value: "Instagram", label: "Instagram" },
    { value: "Outro", label: "Outro" },
  ];

  const onSubmit = async (data) => {
    const {
      challenge_id,
      challenge,
      description,
      links,
      videos,
      file,
      name,
      resume,
      user_id,
      team_id,
    } = data;
    const materialsCounter = {};
    for (let i = 0; i < 10; i++) {
      if (data[`materials_${i}`])
        materialsCounter[`materials_${i}`] = data[`materials_${i}`][0];
    }
    console.log({
      challenge_id,
      project_id: props.id,
      challenge,
      user_id,
      file: file[0],
      team_id,
      description,
      videos: JSON.stringify(videos),
      links: JSON.stringify(links),
      name,
      resume,
      ...materialsCounter,
    });
    if (props.edit) {
      const req = dispatch(
        update(usertype, {
          challenge_id,
          project_id: props.id,
          challenge,
          user_id,
          file: file[0],
          team_id,
          description,
          videos: JSON.stringify(videos),
          links: JSON.stringify(links),
          name,
          resume,
          ...materialsCounter,
          _method: "PUT",
        })
      );
      await req
        .then((res) => {
          toast.success("Projeto editado com sucesso!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(res);
        })
        .then((res) => dispatch(get(usertype, { challenge_id })))
        .then(() => props.handleClose())
        .catch((err) => console.log(err));
    } else {
      const req = dispatch(
        post(usertype, {
          challenge_id,
          project_id: props.id,
          challenge,
          user_id,
          file: file[0] || undefined,
          team_id,
          description,
          videos: videos[0] !== "" ? JSON.stringify(videos) : null,
          links: links[0].link !== "" ? JSON.stringify(links) : null,
          name,
          resume,
          ...materialsCounter,
        })
      );
      await req
        .then((res) => {
          toast.success("Projeto criado com sucesso!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(res);
        })
        .then(() => dispatch(get(usertype, { challenge_id })))
        .then(() => props.handleClose())
        .catch((error) => {
          console.log(error);
          toast.error("Um erro ocorreu ao criar o projeto, tente novamente.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.edit}>
      <input
        type="hidden"
        name="challenge_id"
        value={id}
        ref={register({ required: true })}
      />
      <input
        type="hidden"
        name="challenge"
        value={id}
        ref={register({ required: true })}
      />
      <input type="hidden" name="team_id" value={props.team} ref={register()} />
      <input type="hidden" name="user_id" value={props.user} ref={register()} />
      <div className={styles.title__container}>
        <Text className={styles.title}>
          Você poderá editar esse projeto até o prazo do desafio terminar.
        </Text>
      </div>
      <InputGroup>
        <div className={styles.label}>
          <Title size={18}>Capa do projeto</Title>
          <InputFile
            disabled={loading}
            ref={register()}
            // type="text"
            name="file"
            errors={errors}
            errorMessage="Selecione uma imagem para a capa"
            placeholder="Selecione uma imagem para a capa"
          />
        </div>
      </InputGroup>
      <InputGroup>
        <div className={styles.label}>
          <Title size={18}>Título da solução</Title>
          <Input
            defaultValue={project?.project?.name || data?.project?.name}
            disabled={loading}
            ref={register({ required: true })}
            type="text"
            name="name"
            errors={errors}
            errorMessage="Digite o nome da solução"
            placeholder="Digite o nome da solução"
          />
        </div>
      </InputGroup>
      <InputGroup>
        <div className={styles.label}>
          <Title size={18}>Resumo sobre o projeto</Title>
          <Textarea
            defaultValue={project?.project?.resume}
            disabled={loading}
            ref={register({ required: true })}
            name="resume"
            onChange={handleCountChar}
            errors={errors}
            maxLength="140"
            rows="3"
            errorMessage="Escreva aqui o que é o seu projeto"
            placeholder="Escreva aqui o que é o seu projeto"
          />
          <div className={styles.counter}>{countResume}/140</div>
        </div>
      </InputGroup>
      <InputGroup>
        <div className={styles.label}>
          <Title size={18}>Descreva sua solução</Title>
          <Textarea
            defaultValue={project?.project?.description}
            disabled={loading}
            ref={register()}
            name="description"
            errors={errors}
            rows="14"
            errorMessage="Descreva sua solução"
            placeholder="Descreva sua solução"
          />
        </div>
      </InputGroup>
      <InputGroup>
        <div className={styles.label}>
          <Title size={18}>Pitch</Title>
          {pitch?.map((field, index) => {
            console.log(errors["videos"]?.[index]?.message);
            return (
              <div className={styles.duo}>
                <Input
                  defaultValue={field?.link}
                  disabled={loading}
                  ref={register({
                    pattern: {
                      value:
                        /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/,
                      message: "Digite um link do Youtube válido",
                    },
                  })}
                  type="text"
                  name={`videos.${index}`}
                  arrayError={errors["videos"]?.[index]}
                  // errorMessage="Cole o link do youtube do pitch"
                  errorMessage={errors["videos"]?.[index]?.message}
                  placeholder="Cole o link do youtube do pitch"
                />
              </div>
            );
          })}
          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setPitchs((prev) => [...prev, prev++])}
              text="Adicionar vídeo do youtube"
            />
            {pitch?.length > 1 && (
              <RemoveGroup
                onClick={() => setPitchs((state) => [...state].slice(0, -1))}
                text="Remover vídeo do youtube"
              />
            )}
          </InputGroup>
        </div>
      </InputGroup>
      <InputGroup>
        <div className={styles.label}>
          <Title size={18}>Materiais</Title>
          {materials.map((item, index) => (
            <InputFile
              disabled={loading}
              ref={register()}
              name={`materials_${index}`}
              control={control}
              errors={errors}
              errorMessage="Descreva sua solução"
              placeholder="Descreva sua solução"
            />
          ))}
          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setMaterials((prev) => [...prev, prev++])}
              text="Adicionar material"
            />
            {materials?.length > 1 && (
              <RemoveGroup
                onClick={() => setMaterials((state) => [...state].slice(0, -1))}
                text="Remover material"
              />
            )}
          </InputGroup>
        </div>
      </InputGroup>
      <InputGroup>
        <div className={styles.label}>
          <Title size={18}>Links</Title>
          {links.map((field, index) => {
            return (
              <div className={styles.duo}>
                <Input
                  defaultValue={field.link}
                  disabled={loading}
                  ref={register()}
                  type="text"
                  name={`links.${index}.link`}
                  errors={errors}
                  errorMessage="Cole o link"
                  placeholder="Cole o link"
                />
                <SelectInput
                  defaultValue={field.type}
                  ref={register()}
                  name={`links.${index}.type`}
                  control={control}
                  errors={errors}
                  errorMessage="Selecione a plataforma"
                  placeholder="Selecione a plataforma"
                  options={typeSocial}
                />
              </div>
            );
          })}

          <InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
            <AddGroup
              onClick={() => setLinks((prev) => [...prev, prev++])}
              text="Adicionar link"
            />
            {links?.length > 1 && (
              <RemoveGroup
                onClick={() => setLinks((state) => [...state].slice(0, -1))}
                text="Remover link"
              />
            )}
          </InputGroup>
        </div>
      </InputGroup>
      <div className={styles.button__wrapper}>
        <Button submit style={{ width: "100%" }} Tag={"button"} type="green">
          Enviar
        </Button>
      </div>
    </form>
  );
};

export { ProjectEdit };
