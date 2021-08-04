import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { Card } from "components/Card"
import { Loading } from "components/Loading"
import { Title } from "components/Text"
import { InputGroup, Input, AddGroup, RemoveGroup } from "components/Inputs"
import Button from "components/Button"
import { ButtonGroup } from "components/ButtonGroup"

import { updateChallenge } from "services/newChallenge"
import { get } from "services/challenges"

import "react-toastify/dist/ReactToastify.css"

const Avaliation = ({ noShadow = true, handleClose }) => {
	const [assessments, setAssessments] = useState([])
	const [judges, setJudges] = useState([])
	const [password, setPassword] = useState([])

	const { loading } = useSelector((state) => state.cep)
	const dispatch = useDispatch()

	const { data: usertype } = useSelector((state) => state.usertype)
	const { data: challenge } = useSelector((state) => state.challenge)
	const { loading: loadingUpdate } = useSelector((state) => state.newChallenge)

	const { register, errors, control, handleSubmit } = useForm({
		reValidateMode: "onChange",
	})

	const onSubmit = async (data) => {
		console.log("Enviando", {
			_method: "PUT",
			...data,
			challenge_id: challenge.challenge.id,
		})
		dispatch(
			updateChallenge(usertype, {
				_method: "PUT",
				...data,
				challenge_id: challenge.challenge.id,
			})
		)
			.then((res) => {
				toast.success("Desafio atualizado com sucesso", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.then(() => dispatch(get(usertype, { challenge_id: challenge.challenge.id })))
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
					<input
						type="hidden"
						value={challenge.challenge.name}
						ref={register()}
						name={"name"}
					/>
					<input
						type="hidden"
						value={challenge.challenge.description}
						ref={register()}
						name={"description"}
					/>
					<input
						type="hidden"
						value={challenge.challenge.link}
						ref={register()}
						name={"link"}
					/>
					<input
						type="hidden"
						value={"12/12/2022"}
						ref={register()}
						name={"deadline"}
					/>
					<Card noShadow={noShadow}>
						<Title style={marginTitulo}>Sobre a avaliação</Title>
						{assessments.map((item, index) => {
							return (
								<InputGroup key={index}>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											O que deseja avaliar?
										</Title>
										<Input
											// defaultValue={social.link}
											ref={register({ required: true })}
											errors={errors}
											errorMessage="Digite o critério que deseja avaliar"
											name={`assessments.${index}.evaluate`}
											placeholder="Digite o critério que deseja avaliar"
										></Input>
									</div>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											Nota máxima {index + 1}
										</Title>
										<Input
											// defaultValue={social.platform}
											ref={register({ required: true })}
											name={`assessments.${index}.max_grade`}
											control={control}
											errors={errors}
											errorMessage="Nota máxima"
											placeholder="Digite a nota máxima"
										></Input>
									</div>
								</InputGroup>
							)
						})}

						<InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
							<AddGroup
								onClick={() =>
									setAssessments((prev) => [...prev, prev++])
								}
								text="Adicionar critério"
							/>
							{assessments?.length > 1 && (
								<RemoveGroup
									onClick={() =>
										setAssessments((state) => [...state].slice(0, -1))
									}
									text="Remover critério"
								/>
							)}
						</InputGroup>
					</Card>

					<Card noShadow={noShadow}>
						<Title style={marginTitulo}>Pessoas juradas</Title>

						{judges.map((social, index) => {
							return (
								<InputGroup key={index}>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											Nome do jurado {index + 1}
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
												errors?.judges?.[index]?.name?.message
											}
											name={`judges.${index}.name`}
											placeholder="Nome do jurado"
										></Input>
									</div>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											E-mail do jurado {index + 1}
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
											name={`judges.${index}.email`}
											control={control}
											errors={errors}
											validate={
												errors?.judges?.[index]?.email?.message
											}
											errorMessage="E-mail do jurado"
											placeholder="E-mail do jurado"
										></Input>
									</div>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											Senha do jurado {index + 1}
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
												errors?.judges?.[index]?.password?.message
											}
											name={`judges.${index}.password`}
											placeholder="Insira a senha"
										></Input>
									</div>
									<div style={{ width: "50%" }}>
										<Title
											size={14}
											style={{ marginLeft: 6, marginTop: 12 }}
										>
											Repita a senha do jurado {index + 1}
										</Title>
										<Input
											defaultValue={""}
											name={`judges.${index}.repeat_password`}
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
												errors?.judges?.[index]?.repeat_password
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
									setJudges((prev) => [...prev, prev++])
									setPassword((prev) => [...prev, ""])
								}}
								text="Adicionar jurado"
							/>
							{judges?.length > 1 && (
								<RemoveGroup
									onClick={() => {
										setJudges((state) => [...state].slice(0, -1))
										setPassword((prev) => [...prev].slice(0, -1))
									}}
									text="Remover jurado"
								/>
							)}
						</InputGroup>
					</Card>

					<ButtonGroup>
						{loadingUpdate ? (
							<Loading />
						) : (
							<>
								<Button
									style={{ marginLeft: 30 }}
									Tag={"span"}
									onClick={() => handleClose()}
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

export { Avaliation }
