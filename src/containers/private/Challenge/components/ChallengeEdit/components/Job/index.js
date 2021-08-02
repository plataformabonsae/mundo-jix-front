import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"

import { Card } from "components/Card"
import { Loading } from "components/Loading"
import { Title } from "components/Text"
import { InputGroup, Input, SelectInput, InputWithMask } from "components/Inputs"
import Button from "components/Button"
import { ButtonGroup } from "components/ButtonGroup"

import { cep, cepReset } from "services/adress"
import { updateChallenge } from "services/newChallenge"

import "react-toastify/dist/ReactToastify.css"
import { get } from "services/challenges"

const Job = ({ noShadow = true, handleClose }) => {
	const dispatch = useDispatch()
	const [cepValues, setCepValues] = useState({
		state: null,
		city: null,
		address: null,
		neighborhood: null,
	})
	const { data: cepData, loading } = useSelector((state) => state.cep)
	const { data: usertype } = useSelector((state) => state.usertype)
	const { data: challenge } = useSelector((state) => state.challenge)
	const { loading: loadingUpdate } = useSelector((state) => state.newChallenge)
	const { register, errors, control, handleSubmit } = useForm({
		reValidateMode: "onChange",
	})

	useEffect(() => {
		if (cepData)
			setCepValues((prev) => ({
				state: cepData?.uf,
				city: cepData?.localidade,
				address: cepData?.logradouro,
				neighborhood: cepData?.bairro,
			}))
	}, [cepData])

	const handleCep = (event) => {
		const typed = event.target.value
		const onlyNumbers = parseInt(typed.replace("-", ""))
		if (onlyNumbers.toString().length === 8) {
			dispatch(cep(onlyNumbers))
		} else {
			dispatch(cepReset())
		}
	}

	const onSubmit = async (data) => {
		console.log("Enviando", {
			_method: "PUT",
			...data,
			...cepValues,
			challenge_id: challenge.challenge.id,
		})
		dispatch(
			updateChallenge(usertype, {
				_method: "PUT",
				...data,
				...cepValues,
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
				console.log(error)
			})
	}

	const typeExp = [
		{ value: "Estágio", label: "Estágio" },
		{ value: "Júnior", label: "Júnior" },
		{ value: "Pleno", label: "Pleno" },
		{ value: "Sênior", label: "Sênior" },
	]

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
						<Title style={marginTitulo}>Sobre a vaga</Title>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Remuneração
						</Title>
						<InputGroup>
							<span style={{ position: "relative", top: 20 }}>R$</span>
							<Input
								defaultValue={challenge.challenge.remuneration}
								ref={register({ required: true })}
								errors={errors}
								errorMessage="Digite a remuneração"
								name="remuneration"
								placeholder="Em reais"
								step={0.01}
								// type={"number"}
							></Input>
						</InputGroup>
					</Card>

					<Card noShadow={noShadow}>
						<Title style={{ marginBottom: 32 }}>Experiência</Title>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Nível de experiência
						</Title>
						<InputGroup>
							<SelectInput
								defaultValue={challenge.challenge.experience_type}
								name={`experience_type`}
								ref={register({ required: true })}
								control={control}
								errors={errors}
								errorMessage="Selecione o nível de experiência"
								placeholder="Selecione o nível de experiência"
								options={typeExp}
							></SelectInput>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Anos de experiência
						</Title>
						<InputGroup>
							<Input
								defaultValue={challenge.challenge.experience_years}
								name={`experience_years`}
								ref={register({ required: true })}
								errors={errors}
								errorMessage="Digite os anos de experiência"
								placeholder="Digite os anos de experiência"
							></Input>
						</InputGroup>
					</Card>

					<Card noShadow={noShadow}>
						<Title style={{ marginBottom: 32 }}>Local de trabalho</Title>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							CEP
						</Title>
						<InputGroup>
							<InputWithMask
								defaultValue={challenge.challenge.cep}
								ref={register({ required: true })}
								name="cep"
								errors={errors}
								errorMessage="Digite um CEP válido"
								placeholder="Digite o CEP"
								control={control}
								mask={`99999-999`}
								onKeyUp={handleCep}
							></InputWithMask>
						</InputGroup>
						<InputGroup>
							<div style={{ width: "50%" }}>
								<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
									Estado
								</Title>
								<InputGroup>
									<Input
										defaultValue={challenge.challenge.state}
										ref={register()}
										disabled={cepData?.uf ? true : false}
										value={cepValues?.state}
										// defaultValue={cepValues?.uf}
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
									></Input>
								</InputGroup>
							</div>
							<div style={{ width: "50%" }}>
								<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
									Cidade
								</Title>

								<InputGroup>
									<Input
										ref={register()}
										defaultValue={challenge.challenge.city}
										disabled={cepData?.localidade ? true : false}
										value={cepValues?.city}
										// defaultValue={cepValues?.localidade}
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
									></Input>
								</InputGroup>
							</div>
						</InputGroup>

						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Rua
						</Title>
						<InputGroup>
							<Input
								ref={register()}
								defaultValue={challenge.challenge.address}
								disabled={cepData?.logradouro ? true : false}
								// defaultValue={cepValues.address}
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
							></Input>
						</InputGroup>

						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Bairro
						</Title>
						<InputGroup>
							<Input
								defaultValue={challenge.challenge.neighborhood}
								ref={register()}
								disabled={cepData?.bairro ? true : false}
								value={cepValues?.neighborhood}
								name="neighborhood"
								onChange={(e) =>
									setCepValues((prev) => ({
										...prev,
										neighborhood: e.target.value,
									}))
								}
								errors={errors}
								errorMessage="Digite a rua da empresa"
								placeholder="Digite o bairro"
							></Input>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Número
						</Title>
						<InputGroup>
							<Input
								defaultValue={challenge.challenge.number}
								ref={register()}
								name="number"
								errors={errors}
								errorMessage="Digite a número da empresa"
								placeholder="Digite o número"
							></Input>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Complemento
						</Title>
						<InputGroup>
							<Input
								defaultValue={challenge.challenge.complement}
								ref={register()}
								name="complement"
								errors={errors}
								errorMessage="Digite o complemento"
								placeholder="Digite o complemento"
							></Input>
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

export { Job }
