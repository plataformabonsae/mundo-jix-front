import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { Card } from "components/Card"
import { Loading } from "components/Loading"
import { Title } from "components/Text"
import {
	InputGroup,
	Input,
	InputFile,
	Textarea,
	AddGroup,
	RemoveGroup,
	SelectInputMulti,
	InputWithMask,
	// SelectInput,
	// Radio,
} from "components/Inputs"
import Button from "components/Button"
import { ButtonGroup } from "components/ButtonGroup"
import { ProfileCard } from "components/ProfileCard"
import { updateChallenge } from "services/newChallenge"

import { skills as skillsFetch } from "services/skills"

import "react-toastify/dist/ReactToastify.css"
import styles from "./styles.module.sass"
import { get } from "services/challenges"

const Challenge = ({ noShadow = true, handleClose }) => {
	const [countResume, setCountResume] = useState(0)
	const [materials, setMaterials] = useState([])
	const [mentors, setMentors] = useState([])
	const [skills, setSkills] = useState([])
	const [skillsChange, setSkillsChange] = useState([])
	const [password, setPassword] = useState([])

	const dispatch = useDispatch()
	const { data: skillsData } = useSelector((state) => state.skills)
	const { data: challenge } = useSelector((state) => state.challenge)
	const { data: usertype } = useSelector((state) => state.usertype)
	const { loading: loadingUpdate } = useSelector((state) => state.newChallenge)
	const { loading } = useSelector((state) => state.cep)

	const { register, errors, control, handleSubmit } = useForm({
		reValidateMode: "onChange",
	})

	useEffect(() => {
		dispatch(skillsFetch())
	}, [dispatch])

	useEffect(() => {
		const append = (skill) => {
			setSkills((prev) => [...prev, skill])
		}
		if (skillsData) {
			for (let i = 0; i < skillsData.length; i++) {
				append({ value: skillsData[i].id, label: skillsData[i].title })
			}
		}
	}, [skillsData])

	useEffect(() => {
		const append = (skill) => setSkillsChange((prev) => [...prev, skill])
		const skills = challenge?.challenge?.skills
		setSkillsChange([])
		if (skills)
			for (let i = 0; i < skills.length; i++) {
				append({ value: skills[i].id, label: skills[i].title })
			}
	}, [challenge?.challenge?.skills])

	useEffect(() => {
		setSkills((prev) => prev.filter((x) => !skillsChange.includes(x)))
	}, [skillsChange])

	const handleRemoveSkill = (skill) => {
		setSkillsChange((prev) => [...prev].filter((item) => item.value !== skill.value))
		setSkills((prev) => [...prev, skill])
	}

	const handleCountChar = (e) => {
		setCountResume(e.target.value.length)
	}

	const handleSkillsChange = (data) => {
		setSkillsChange((prev) => [...prev, data])
	}

	const handleDate = (val) => {
		let value = val
		let array = value.split("/").map((x) => +x)
		const date = new Date(array[2], array[1] - 1, array[0])

		return date.getTime() && date > new Date()
	}

	const closeModal = (e) => {
		window.location.reload()
	}

	const onSubmit = (data) => {
		const materialsCounter = {}
		for (let i = 0; i < 10; i++) {
			if (data[`materials_${i}`])
				materialsCounter[`materials_${i}`] = data[`materials_${i}`][0]
		}
		const dataWithMaterials = { ...data, file: data.file[0], materialsCounter }
		dispatch(
			updateChallenge(usertype, {
				_method: "PUT",
				...dataWithMaterials,
				badge: JSON.stringify(data.badge),
				skills: JSON.stringify(data.skills),
				mentors: JSON.stringify(data.mentors),
				challenge_id: challenge.challenge.id,
			})
		)
			.then(() =>
				dispatch(get(usertype, { challenge_id: challenge.challenge.id })).then(
					(res) => {
						toast.success("Desafio atualizado", {
							position: toast.POSITION.BOTTOM_RIGHT,
						})
					}
				)
			)
			.catch((error) => {
				toast.error("Algum erro ocorreu ao atualizar o desafio", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const marginTitulo = {
		marginBottom: 32,
	}
	if (challenge)
		return (
			<>
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<Card noShadow={noShadow}>
						<Title style={marginTitulo}>Sobre o desafio</Title>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Nome do desafio
						</Title>
						<InputGroup>
							<Input
								defaultValue={challenge.challenge.name}
								ref={register({ required: true })}
								errors={errors}
								errorMessage="Digite o nome do desafio"
								name="name"
								placeholder="Digite o nome do desafio"
							></Input>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Capa do desafio
						</Title>
						<InputGroup>
							<InputFile
								ref={register()}
								name={`file`}
								control={control}
								accept="image/png, image/gif, image/jpeg"
								errors={errors}
								errorMessage={errors?.file?.message}
							>
								Capa em JPG ou PNG (limite de 4mb):
							</InputFile>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Resumo do desafio
						</Title>
						<InputGroup>
							<Textarea
								defaultValue={challenge.challenge.resume}
								disabled={loading}
								ref={register({ required: true })}
								name="resume"
								onChange={handleCountChar}
								errors={errors}
								maxLength="140"
								rows="3"
								errorMessage="Escreva aqui o que é o desafio"
								placeholder="Escreva aqui o que é o desafio"
							></Textarea>
							<div
								style={{
									width: "100%",
									font: { size: 14 },
									textAlign: "right",
								}}
							>
								{countResume}/140
							</div>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Descreva o desafio
						</Title>
						<InputGroup>
							<Textarea
								defaultValue={challenge.challenge.description}
								disabled={loading}
								ref={register({ required: true })}
								name="description"
								errors={errors}
								rows="12"
								errorMessage="Escreva aqui a descrição completa do desafio"
								placeholder="Escreva aqui a descrição completa do desafio"
							></Textarea>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Prazo do desafio
						</Title>
						<InputGroup>
							<InputWithMask
								defaultValue={challenge.challenge.deadline}
								disabled={loading}
								control={control}
								ref={register()}
								rules={{
									required: {
										value: true,
										message: "Esse campo é obrigatório",
									},
									validate: {
										isValid: (val) =>
											handleDate(val) ||
											"Insira um deadline válido",
									},
								}}
								name="deadline"
								errors={errors}
								mask="99/99/9999"
								rows="12"
								errorMessage={errors["deadline"]?.message}
								placeholder="Digite o prazo do desafio"
							></InputWithMask>
						</InputGroup>
						<InputGroup>
							<div>
								<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
									Materiais
								</Title>
								{materials.map((item, index) => (
									<InputFile
										key={index}
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
										onClick={() =>
											setMaterials((prev) => [...prev, prev++])
										}
										text="Adicionar material"
									/>
									{materials?.length > 1 && (
										<RemoveGroup
											onClick={() =>
												setMaterials((state) =>
													[...state].slice(0, -1)
												)
											}
											text="Remover material"
										/>
									)}
								</InputGroup>
							</div>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Vídeo de apresentação
						</Title>
						<InputGroup>
							<Input
								defaultValue={challenge.challenge.link}
								disabled={loading}
								ref={register({
									pattern: {
										value: /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/,
										message: "Digite um link do Youtube válido",
									},
								})}
								type="text"
								name={`link`}
								errors={errors}
								// arrayError={errors["videos"]?.[index]}
								// errorMessage="Cole o link do youtube do pitch"
								errorMessage={errors["link"]?.message}
								placeholder="Cole o link do youtube do pitch"
							/>
							{/* <Input
              defaultValue={""}
              ref={register({ required: true })}
              errors={errors}
              errorMessage="Cole o link do vídeo"
              name="link"
              placeholder="Cole o link do vídeo"
            ></Input> */}
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Premiação
						</Title>
						<InputGroup>
							<Input
								defaultValue={challenge.challenge.prize}
								ref={register({ required: true })}
								errors={errors}
								errorMessage="Digite a premiação"
								name="prize"
								placeholder="Digite a premiação"
							></Input>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Skills
						</Title>
						<InputGroup>
							<SelectInputMulti
								name={`skills`}
								// ref={register()}
								isMulti={false}
								control={control}
								options={skills}
								errors={errors}
								value={skillsChange}
								// defaultValue={skillsChange}
								onChange={handleSkillsChange}
								// rules={{
								//   validate: {
								//     hasAny: (v) =>
								//       console.log(skillsChange) ||
								//       "Selecione pelo menos uma skill",
								//   },
								// }}
								errorMessage={errors["skills"]?.message}
								placeholder="Digite sua skill"
							/>
						</InputGroup>
						<div className={styles.skill__wrapper}>
							{skillsChange?.map((item, index) => (
								<div className={styles.skill__item}>
									{item.label}
									<span
										className={styles.skill__remove}
										onClick={() => handleRemoveSkill(item)}
									>
										X
									</span>
									<input
										key={index}
										type="hidden"
										ref={register()}
										name={`skills.${index}.id`}
										value={`${item.value}`}
									/>
								</div>
							))}
						</div>
					</Card>

					<Card noShadow={noShadow}>
						<Title style={marginTitulo}>Insígnias</Title>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Nome da insígnia
						</Title>
						<InputGroup>
							<Input
								defaultValue={challenge?.challenge?.badges[0]?.title}
								errors={errors}
								ref={register({
									required: {
										value: true,
										message: "Digite o nome da insígnia",
									},
								})}
								validate={errors?.badge?.title?.message}
								name="badge.title"
								placeholder="Digite o nome da insígnia"
							></Input>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Descrição da insígnia
						</Title>
						<InputGroup>
							<Input
								defaultValue={
									challenge?.challenge?.badges[0]?.description
								}
								ref={register({
									required: {
										value: true,
										message: "Digite a descrição da insígnia",
									},
								})}
								errors={errors}
								validate={errors?.badge?.description?.message}
								name="badge.description"
								placeholder="Descrição da insígnia"
							></Input>

							<input
								type="hidden"
								value={"15"}
								ref={register()}
								name={"badge.points"}
							/>
						</InputGroup>
					</Card>

					<Card noShadow={noShadow}>
						<Title style={marginTitulo}>Pessoas mentoras</Title>

						{challenge?.mentors?.map((item, index) => (
							<ProfileCard border data={item} key={item.id} small />
						))}

						{mentors.map((social, index) => {
							return (
								<InputGroup key={index}>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											Nome do mentor {index + 1}
										</Title>
										<Input
											defaultValue={social.link}
											ref={register({
												required: {
													value: true,
													message: "Obrigatório",
												},
											})}
											errors={errors}
											validate={
												errors?.mentors?.[index]?.name?.message
											}
											name={`mentors.${index}.name`}
											placeholder="Nome do mentor"
										></Input>
									</div>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											E-mail do Mentor {index + 1}
										</Title>
										<Input
											defaultValue={social.platform}
											ref={register({
												required: {
													value: true,
													message: "Obrigatório",
												},
												pattern: {
													value: /^\S+@\S+$/i,
													message: "Digite um e-mail válido",
												},
											})}
											name={`mentors.${index}.email`}
											control={control}
											errors={errors}
											validate={
												errors?.mentors?.[index]?.email?.message
											}
											errorMessage="E-mail do mentor"
											placeholder="E-mail do mentor"
										></Input>
									</div>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											Senha do mentor {index + 1}
										</Title>
										<Input
											defaultValue={""}
											ref={register({
												required: {
													value: true,
													message: "Obrigatório",
												},
												minLength: {
													value: 8,
													message:
														"Digite pelo menos 8 caracteres.",
												},
											})}
											errors={errors}
											onChange={(e) =>
												setPassword((prev) => {
													prev[index] = `${e.target.value}`
													return prev
												})
											}
											validate={
												errors?.mentors?.[index]?.password
													?.message
											}
											name={`mentors.${index}.password`}
											placeholder="Insira a senha"
										></Input>
									</div>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											Repita a senha do mentor {index + 1}
										</Title>
										<Input
											defaultValue={""}
											name={`mentors.${index}.repeat_password`}
											control={control}
											errors={errors}
											ref={register({
												required: {
													value: true,
													message: "Obrigatório",
												},
												validate: (val) =>
													password[index] === val ||
													"As senhas precisam ser iguais.",
											})}
											validate={
												errors?.mentors?.[index]?.repeat_password
													?.message
											}
											errorMessage="Repita a senha"
											placeholder="Repita a senha"
										></Input>
									</div>
								</InputGroup>
							)
						})}

						<InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
							<AddGroup
								onClick={() => {
									setMentors((prev) => [...prev, prev++])
									setPassword((prev) => [...prev, ""])
								}}
								text="Adicionar mentor"
							/>
							{mentors?.length > 1 && (
								<RemoveGroup
									onClick={() => {
										setMentors((state) => [...state].slice(0, -1))
										setPassword((prev) => [...prev].slice(0, -1))
									}}
									text="Remover mentor"
								/>
							)}
						</InputGroup>
					</Card>

					{/* <Card noShadow={noShadow}>
          <Title style={marginTitulo}>Avaliação</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Terá avaliação?
          </Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 12,
            }}
          >
            <Radio
              ref={register()}
              onChange={() => handleHasAvaliation(true)}
              name={"hasAssessment"}
              checked={hasAvaliation === true}
            >
              Sim
            </Radio>
            <Radio
              ref={register()}
              onChange={() => handleHasAvaliation(false)}
              name={"hasAssessment"}
              checked={hasAvaliation === false}
            >
              Não
            </Radio>
          </div>
        </Card> */}

					<ButtonGroup>
						{loadingUpdate ? (
							<Loading />
						) : (
							<>
								<Button
									style={{ marginLeft: 30 }}
									Tag={"span"}
									onClick={() => closeModal()}
									type="gray"
								>
									Voltar
								</Button>
								<Button
									style={{ marginRight: 30 }}
									Tag={"button"}
									submit
									disabled={loading}
									type="secondary"
								>
									Salvar
								</Button>
							</>
						)}
					</ButtonGroup>
				</form>
			</>
		)
	return ""
}

export { Challenge }
