import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import * as yup from "yup"
// import { removeLastPath } from "utils/etc";

import { validationSchema } from "utils/etc"

import { File } from "components/Downloads"
import { Card } from "components/Card"
import { Title } from "components/Text"
import {
	InputGroup,
	Input,
	SelectInput,
	SelectInputMulti,
	AddGroup,
	InputFile,
	Checkbox,
	Textarea,
	// AddGroup,
	RemoveGroup,
	InputWithMask,
	// Textarea
} from "components/Inputs"
import { Text } from "components/Text"
import Button from "components/Button"
import { ButtonGroup } from "components/ButtonGroup"
// import { cep, cepReset } from "services/adress";

import styles from "./styles.module.sass"

import { edit } from "services/auth"

const curriculumSchema = yup.object().shape({
	curriculum: yup
		.mixed()
		.test(
			"",
			"O arquivo deve ter até 8MB",
			(value) => !value.length || value[0].size <= 8000000
		),
})

const Profissional = ({ action, type, noShadow, dontRedirect }) => {
	const history = useHistory()
	const dispatch = useDispatch()
	// const location = useLocation();
	const { data: user, loading } = useSelector((state) => state.user)
	const { data: usertype } = useSelector((state) => state.usertype)

	const resolver = validationSchema(curriculumSchema)
	const [availableSkills, setAvailableSkills] = useState([])
	const { register, errors, control, handleSubmit } = useForm({ resolver })
	const [skillsChange, setSkillsChange] = useState([])

	const [currentJob, setCurrentJob] = useState([])
	const [datesValidation, setDatesValidation] = useState([])

	const [portfolios, setPortfolios] = useState([])
	const [experiences, setExperiences] = useState([])
	const [links, setLinks] = useState([])

	useEffect(() => {
		const append = (skill) => setSkillsChange((prev) => [...prev, skill])
		const skills = user?.skills
		setSkillsChange([])
		for (let i = 0; i < skills.length; i++) {
			append({ value: skills[i].id, label: skills[i].title })
		}
	}, [user?.skills])

	useEffect(() => {
		const append = (skill) => setAvailableSkills((prev) => [...prev, skill])
		const skills = user.types.skills
		for (let i = 0; i < skills.length; i++) {
			append({ value: skills[i].id, label: skills[i].title })
		}
	}, [user.types.skills])

	useEffect(() => {
		console.log(skillsChange)
	}, [skillsChange])

	useEffect(() => {
		const append = (xp) => {
			setExperiences((prev) => [...prev, xp])
		}
		if (user.experiences.length) {
			for (let i = 0; i < user.experiences.length; i++) {
				append(user.experiences[i])
			}
		} else {
			append({})
		}
		return () => {
			setExperiences([])
		}
	}, [user])

	useEffect(() => {
		const append = (link) => {
			setLinks((prev) => [...prev, link])
		}
		if (user.links.length) {
			for (let i = 0; i < user.links.length; i++) {
				append(user.links[i])
			}
		} else {
			append({})
		}
		return () => {
			setLinks([])
		}
	}, [user])

	useState(() => {
		const appendCurrentJob = (link) => {
			setCurrentJob((prev) => [...prev, link])
		}
		const appendDates = (link) => {
			setDatesValidation((prev) => [...prev, link])
		}
		if (user.experiences.length) {
			for (let i = 0; i < user.experiences.length; i++) {
				appendCurrentJob({
					status: user.experiences[i].current_job === 1 ? true : false,
					id: user.experiences[i].id,
				})
				appendDates({
					start: user.experiences[i].start_date,
					end: user.experiences[i].end_date,
				})
			}
		} else {
			appendCurrentJob([])
			appendDates([])
		}
		return () => {
			setCurrentJob([])
			appendDates([])
		}
	}, [user])

	useEffect(() => {
		const append = (port) => {
			setPortfolios((prev) => [...prev, port])
		}
		if (user.portfolios.length) {
			for (let i = 0; i < user.portfolios.length; i++) {
				append(user.portfolios[i])
			}
		} else {
			append({})
		}
		return () => {
			setPortfolios([])
		}
	}, [user])

	const handleRemoveSkill = (value) => {
		setSkillsChange((prev) => [...prev].filter((item) => item.value !== value))
	}

	const onSubmit = async (data) => {
		const {
			current_situation,
			looking_for,
			curriculum,
			portfolios,
			experiences,
			links,
			skills,
		} = data
		let filtered_portfolios
		let filtered_skills
		let filtered_experiences
		let filtered_links
		for (let i = 0; i < portfolios?.length; i++) {
			filtered_portfolios = [...portfolios].filter((port) => port.link.length)
		}
		// for (let i = 0; i < skills?.length; i++) {
		//   filtered_skills = [...skills].filter((skill) => skill.id);
		// }
		for (let i = 0; i < experiences?.length; i++) {
			filtered_experiences = [...experiences].filter((xp) => xp.role.length)
		}
		for (let i = 0; i < links?.length; i++) {
			filtered_links = [...links].filter((link) => link.link.length)
		}
		// console.log(JSON.stringify(filtered_experiences));
		// console.log(JSON.stringify(filtered_skills));
		await dispatch(
			edit(usertype, {
				name: user?.user?.name,
				email: user?.user?.email,
				skills: JSON.stringify(skills),
				current_situation,
				looking_for,
				curriculum: curriculum[0],
				portfolios: JSON.stringify(filtered_portfolios),
				experiences: JSON.stringify(filtered_experiences),
				links: JSON.stringify(filtered_links),
			})
		)
			.then(() => {
				toast.success("Informações atualizadas", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.then(() => !dontRedirect && history.push("/dashboard"))
			.catch((error) => {
				toast.error("Algum erro ocorreu. Tente novamente", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})

		// console.log(errors);
	}

	const typeSituacao = [
		{ value: "Tenho emprego", label: "Tenho emprego" },
		{ value: "Sou freelancer", label: "Sou freelancer" },
		{ value: "Não tenho emprego", label: "Não tenho emprego" },
	]

	const typeBusca = [
		{ value: "Jovem aprendiz", label: "Jovem aprendiz" },
		{ value: "Estágio", label: "Estágio" },
		{ value: "PJ", label: "PJ" },
		{ value: "Trainee", label: "Trainee" },
		{ value: "CLT", label: "CLT" },
		{ value: "Empreender", label: "Empreender" },
	]

	const typePortifolio = [
		{ value: "Github", label: "Github" },
		{ value: "Site", label: "Site" },
		{ value: "Outro", label: "Outro" },
	]

	const typeLinks = [
		{ value: "Youtube", label: "Youtube" },
		{ value: "Blog", label: "Blog" },
		{ value: "Outro", label: "Outro" },
	]

	const handleSkillsChange = (data) => {
		setSkillsChange((prev) => [...prev, data])
	}

	const handleCurrentJob = (index, status) => {
		setCurrentJob((prev) => {
			let array = [...prev]
			array[index].status = status
			return array
		})
	}

	const handleSetStartDate = (index, start) => {
		setDatesValidation((prev) => {
			let array = [...prev]
			array[index].start = start.length ? start : null
			return array
		})
	}

	const handleSetEndDate = (index, end) => {
		setDatesValidation((prev) => {
			let array = [...prev]
			array[index].end = end.length ? end : null
			return array
		})
	}

	const handleParseDate = (date) =>
		date && !!Number(date.split("/")[2]) && date.split("/")[2].length === 4
			? new Date(date.split("/").reverse().join("-")).getTime()
			: false

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Card noShadow={noShadow}>
				<Title style={{ marginBottom: 32 }}>Perspectivas</Title>

				<InputGroup>
					<SelectInput
						disabled={!loading}
						defaultValue={user?.user?.current_situation}
						ref={register()}
						name={`current_situation`}
						control={control}
						errors={errors}
						errorMessage="Selecione um tipo"
						placeholder="Selecione a situação atual"
						options={typeSituacao}
					>
						Situação atual
					</SelectInput>
				</InputGroup>

				<InputGroup>
					<SelectInput
						defaultValue={user?.user?.looking_for}
						ref={register()}
						name={`looking_for`}
						control={control}
						errors={errors}
						errorMessage="Selecione um tipo"
						placeholder="Selecione o que busca"
						options={typeBusca}
					>
						O que busca?
					</SelectInput>
				</InputGroup>
			</Card>

			<Card noShadow={noShadow}>
				<Title style={{ marginBottom: 32 }}>Skills</Title>
				<InputGroup>
					<SelectInputMulti
						name={`skills`}
						// ref={register()}
						isMulti={false}
						control={control}
						options={availableSkills}
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
								onClick={() => handleRemoveSkill(item.value)}
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
				<Title style={{ marginBottom: 32 }}>Portfolio</Title>

				{portfolios.map((field, index) => {
					return (
						<InputGroup>
							<Input
								defaultValue={field.link}
								ref={register()}
								control={control}
								errors={errors}
								errorMessage="Máximo 20 caracteres"
								name={`portfolios.${index}.link`}
								placeholder="Colo aqui o link"
							>
								Link
							</Input>
							<SelectInput
								defaultValue={field.platform}
								ref={register()}
								name={`portfolios.${index}.platform`}
								control={control}
								errors={errors}
								errorMessage="Selecione pelo menos uma plataforma"
								placeholder="Selecione a plataforma"
								options={typePortifolio}
							>
								Plataforma
							</SelectInput>
						</InputGroup>
					)
				})}

				<InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
					<AddGroup
						onClick={() => setPortfolios((prev) => [...prev, prev++])}
						text="Adicionar portfolio"
					/>
					{portfolios?.length > 1 && (
						<RemoveGroup
							onClick={() =>
								setPortfolios((state) => [...state].slice(0, -1))
							}
							text="Remover portfolio"
						/>
					)}
				</InputGroup>
			</Card>

			<Card noShadow={noShadow}>
				<Title style={{ marginBottom: 32 }}>Currículo</Title>

				<InputGroup>
					{user?.user?.curriculum_file && (
						<File
							file={user.user.curriculum_file}
							name={user.user.curriculum_filename}
							extension={user.user.curriculum_fileextension}
						/>
					)}
					<Text style={{ width: "100%" }} size={12} weight={"bold"}>
						Anexe um currículo em PDF ou Doc (limite de 8mb):
					</Text>
					<InputFile
						ref={register()}
						name={`curriculum`}
						control={control}
						accept="application/msword, application/pdf"
						errors={errors}
						errorMessage={errors?.curriculum?.message}
						// placeholder="Selecione a plataforma"
						options={typePortifolio}
					>
						{/* Plataforma */}
					</InputFile>
				</InputGroup>
			</Card>

			<Card noShadow={noShadow}>
				<Title style={{ marginBottom: 32 }}>Experiência Profissional</Title>

				{experiences.map((field, index) => {
					return (
						<div key={index}>
							<InputGroup>
								<Input
									defaultValue={field.role}
									ref={register()}
									name={`experiences.${index}.role`}
									errors={errors}
									control={control}
									errorMessage="Campo necessário"
									placeholder="Digite o cargo"
								>
									Cargo
								</Input>
							</InputGroup>

							<InputGroup>
								<Input
									defaultValue={field.company}
									ref={register()}
									name={`experiences.${index}.company`}
									errors={errors}
									control={control}
									errorMessage="Campo necessário"
									placeholder="Digite o nome da empresa"
								>
									Empresa
								</Input>
							</InputGroup>

							<InputGroup>
								<InputWithMask
									defaultValue={field.start_date}
									ref={register()}
									name={`experiences.${index}.start_date`}
									errors={errors}
									control={control}
									validate={
										!handleParseDate(datesValidation[index]?.start) &&
										"Digite uma data válida"
									}
									onKeyUp={(e) =>
										handleSetStartDate(index, e.target.value)
									}
									errorMessage="Data invalida"
									placeholder="__/__/____"
									mask={`99/99/9999`}
								>
									Início
								</InputWithMask>
								{/* {console.log(currentJob[index].status)} */}

								<InputWithMask
									disabled={currentJob[index]?.status}
									defaultValue={
										(currentJob[index].status && " ") ||
										field.end_date
									}
									onKeyUp={(e) =>
										handleSetEndDate(index, e.target.value)
									}
									ref={register()}
									validate={
										!currentJob[index].status &&
										handleParseDate(datesValidation[index]?.start) >
											handleParseDate(
												datesValidation[index]?.end
											) &&
										"A data de término deve ser maior que de início"
									}
									name={`experiences.${index}.end_date`}
									errors={errors}
									control={control}
									mask={`99/99/9999`}
									errorMessage={errors?.end_date?.message}
									placeholder="__/__/____"
								>
									Término
								</InputWithMask>

								<div style={{ width: "100%", textAlign: "right" }}>
									<Checkbox
										defaultChecked={
											field.current_job === 1 ? true : false
										}
										onChange={() =>
											handleCurrentJob(
												index,
												!currentJob[index]?.status
											)
										}
										ref={register()}
										name={`experiences.${index}.current_job`}
									>
										Meu Emprego atual
									</Checkbox>
								</div>
							</InputGroup>

							<InputGroup>
								<Textarea
									defaultValue={field.main_activities}
									ref={register()}
									errors={errors}
									control={control}
									errorMessage="Máximo de 400 caracteres"
									name={`experiences.${index}.main_activities`}
									placeholder="Digite suas principais atividades"
								>
									Principais atividades
								</Textarea>
							</InputGroup>
						</div>
					)
				})}

				<InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
					<AddGroup
						onClick={() => {
							setDatesValidation((prev) => [
								...prev,
								{ start: null, end: null },
							])
							setExperiences((prev) => [...prev, prev++])
							setCurrentJob((prev) => [...prev, { status: false }])
						}}
						text="Adicionar experiência"
					/>
					{experiences?.length > 1 && (
						<RemoveGroup
							onClick={() =>
								setExperiences((state) => [...state].slice(0, -1))
							}
							text="Remover experiência"
						/>
					)}
				</InputGroup>
			</Card>

			<Card noShadow={noShadow}>
				<Title style={{ marginBottom: 32 }}>Outros links</Title>
				{links.map((field, index) => {
					return (
						<InputGroup key={index}>
							<Input
								defaultValue={field.link}
								ref={register()}
								errors={errors}
								control={control}
								errorMessage="Somente números"
								name={`links.${index}.link`}
								placeholder="Cole aqui o link"
							>
								Link
							</Input>
							<SelectInput
								defaultValue={field.platform}
								ref={register()}
								name={`links.${index}.platform`}
								control={control}
								errors={errors}
								errorMessage="Selecione um tipo"
								placeholder="Selecione a plataforma"
								options={typeLinks}
							>
								Tipo de rede
							</SelectInput>
						</InputGroup>
					)
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
			</Card>

			<ButtonGroup>
				<Button Tag="button" submit type="secondary">
					{dontRedirect ? "Salvar" : "Finalizar"}
				</Button>
			</ButtonGroup>
		</form>
	)
}

export { Profissional }
