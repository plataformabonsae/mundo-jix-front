import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

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

import { sanitize } from "utils/etc";

import { get, post, update } from "services/project";

import styles from "./styles.module.sass";

const ProjectEdit = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: project, loading } = useSelector((state) => state.project);
  const [countResume, setCountResume] = useState(
    props?.data?.resume?.length || 0
  );
  const [materials, setMaterials] = useState([]);
  const [links, setLinks] = useState([]);
  const { register, errors, control, handleSubmit } = useForm();

  // useEffect(() => {
  //   dispatch(get(usertype, { challenge_id: id }));
  // }, [dispatch, usertype, id]);

  const handleCountChar = (e) => {
    setCountResume(e.target.value.length);
  };

  const handleAddMaterial = (el) => {
    setMaterials((prev) => [...prev, el]);
  };

  const handleRemoveMaterial = (index) => {
    setMaterials((prev) => [...prev].slice(0, -1));
  };

  const handleAddLink = (el) => {
    setLinks((prev) => [...prev, el]);
  };

  const handleRemoveLink = (index) => {
    setLinks((prev) => [...prev].slice(0, -1));
  };

  const typeSocial = [
    { value: 1, label: "Facebook" },
    { value: 2, label: "Youtube" },
    { value: 3, label: "Google Drive" },
    { value: 4, label: "One Drive" },
    { value: 5, label: "Twitter" },
    { value: 6, label: "Instagram" },
    { value: 7, label: "Outro" },
  ];

  const onSubmit = async (data) => {
    const { challenge_id, challenge, description, links, name, resume } = data;
    if (props.edit) {
      const req = dispatch(
        update(usertype, {
          challenge_id,
          challenge,
          description,
          links: [{ link: "", type: "" }],
          links_edit: [{ link: "", type: "" }],
          name,
          resume,
          _method: "PUT",
        })
      );
      await req
        .then((res) => console.log(res, "res"))
        .catch((err) => console.log(err, "erro"));
    } else {
      const req = dispatch(
        post(usertype, {
          challenge_id,
          challenge,
          description,
          // links: [{ link: "", type: "" }],
          // links_edit: [{ link: "", type: "" }],
          name,
          resume,
        })
      );
      await req
        .then((res) => console.log(res, "res"))
        .catch((err) => console.log(err, "erro"));
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
      <div className={styles.title__container}>
        <Text className={styles.title}>
          Você poderá editar esse projeto até o prazo do desafio terminar.
        </Text>
      </div>
      <InputGroup>
        <label className={styles.label}>
          <Title size={18}>Capa do projeto</Title>
          <InputFile
            disabled={loading}
            ref={register()}
            // type="text"
            name="thumbnail"
            errors={errors}
            errorMessage="Selecione uma imagem para a capa"
            placeholder="Selecione uma imagem para a capa"
          />
        </label>
      </InputGroup>
      <InputGroup>
        <label className={styles.label}>
          <Title size={18}>Título da solução</Title>
          <Input
            defaultValue={props?.data?.name}
            disabled={loading}
            ref={register({ required: true })}
            type="text"
            name="name"
            errors={errors}
            errorMessage="Digite o nome da solução"
            placeholder="Digite o nome da solução"
          />
        </label>
      </InputGroup>
      <InputGroup>
        <label className={styles.label}>
          <Title size={18}>Resumo sobre o projeto</Title>
          <Textarea
            defaultValue={props?.data?.resume}
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
        </label>
      </InputGroup>
      <InputGroup>
        <label className={styles.label}>
          <Title size={18}>Descreva sua solução</Title>
          <Textarea
            defaultValue={props?.data?.description}
            disabled={loading}
            ref={register()}
            name="description"
            errors={errors}
            rows="14"
            errorMessage="Descreva sua solução"
            placeholder="Descreva sua solução"
          />
        </label>
      </InputGroup>
      <InputGroup>
        <label className={styles.label}>
          <Title size={18}>Pitch</Title>
          <Input
            defaultValue={props?.data?.link}
            disabled={loading}
            ref={register()}
            type="text"
            name="link"
            errors={errors}
            errorMessage="Cole aqui o seu link do youtube com o vídeo do pitch"
            placeholder="Cole aqui o seu link do youtube com o vídeo do pitch"
          />
        </label>
      </InputGroup>
      <InputGroup>
        <label className={styles.label}>
          <Title size={18}>Materiais</Title>
          <InputFile
            disabled={loading}
            ref={register()}
            type="text"
            name={`materials[0]`}
            errors={errors}
            errorMessage="Cole aqui o seu link do youtube com o vídeo do pitch"
            placeholder="Cole aqui o seu link do youtube com o vídeo do pitch"
          />
          {materials.map((item, index) => (
            <>
              <InputFile
                key={index}
                disabled={loading}
                // ref={register()}
                name={`materials[${index++}]`}
                errors={errors}
                errorMessage="Cole aqui o seu link do youtube com o vídeo do pitch"
                placeholder="Cole aqui o seu link do youtube com o vídeo do pitch"
              />
            </>
          ))}
          {!!materials.length && (
            <RemoveGroup
              onClick={() => handleRemoveMaterial()}
              text="Remover anexo"
            />
          )}
          <AddGroup
            onClick={() => handleAddMaterial()}
            text="Adicionar anexo"
          />
        </label>
      </InputGroup>
      <InputGroup>
        <label className={styles.label}>
          <Title size={18}>Links</Title>
          <div className={styles.duo}>
            <Input
              disabled={loading}
              ref={register()}
              type="text"
              name="links[0][link]"
              errors={errors}
              errorMessage="Cole o link"
              placeholder="Cole o link"
            />
            <SelectInput
              ref={register()}
              name={`links[0][type]`}
              control={control}
              errors={errors}
              errorMessage="Selecione a plataforma"
              placeholder="Selecione a plataforma"
              options={typeSocial}
            />
          </div>
          {links.map((item, index) => (
            <div className={styles.duo}>
              <Input
                disabled={loading}
                ref={register()}
                type="text"
                name={`links[${index++}][link]`}
                errors={errors}
                errorMessage="Cole o link"
                placeholder="Cole o link"
              />
              <SelectInput
                ref={register()}
                name={`links[${index++}][type]`}
                control={control}
                errors={errors}
                errorMessage="Selecione a plataforma"
                placeholder="Selecione a plataforma"
                options={typeSocial}
              />
            </div>
          ))}
          {!!links.length && (
            <RemoveGroup
              onClick={() => handleRemoveLink()}
              text="Remover anexo"
            />
          )}
          <AddGroup onClick={() => handleAddLink()} text="Adicionar anexo" />
        </label>
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
