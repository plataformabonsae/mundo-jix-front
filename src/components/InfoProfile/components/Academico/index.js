import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { removeLastPath } from "utils/etc"

import { Card } from "components/Card"
import { Title } from "components/Text"
import {
	InputGroup,
	Input,
	SelectInput,
	AddGroup,
	RemoveGroup,
	InputWithMask,
} from "components/Inputs"
import Button from "components/Button"
import { ButtonGroup } from "components/ButtonGroup"

import { edit } from "services/auth"

const Academico = ({ noShadow, finalRoute, dontRedirect }) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const location = useLocation()
	const { data: user, loading } = useSelector((state) => state.user)
	const { data: usertype } = useSelector((state) => state.usertype)

	const [datesValidation, setDatesValidation] = useState([])
	const [academic, setAcademic] = useState([])
	const [exit, setExit] = useState(false)

	const { register, errors, control, handleSubmit } = useForm()

	useEffect(() => {
		const append = (tel) => {
			setAcademic((prev) => [...prev, tel])
		}
		const appendDates = (link) => {
			setDatesValidation((prev) => [...prev, link])
		}
		if (user.academicformations.length) {
			for (let i = 0; i < user.academicformations.length; i++) {
				append(user.academicformations[i])
				appendDates({
					start: user.academicformations[i].start_date,
					end: user.academicformations[i].end_date,
				})
			}
		} else {
			append({})
			appendDates([])
		}

		return () => {
			appendDates([])
			setAcademic([])
		}
	}, [user])

	const onSubmit = async (data) => {
		const { academic_formations } = data
		let filtered_academic_formations
		for (let i = 0; i < academic_formations.length; i++) {
			filtered_academic_formations = [...academic_formations].filter(
				(formation) => formation.degree
			)
		}
		await dispatch(
			edit(usertype, {
				name: user?.user?.name,
				email: user?.user?.email,
				academic_formations: JSON.stringify(filtered_academic_formations),
			})
		)
			.then(() => {
				toast.success("Informações atualizadas", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.then(
				() =>
					!dontRedirect &&
					history.push(removeLastPath(location.pathname) + "/profissional")
			)
			.then(() => exit && history.push("/dashboard"))
			.catch((error) => {
				toast.error(
					error.response.data.errors.email[0] ===
						"This email is already taken." &&
						"Esse e-mail já está sendo utilizado.",
					{
						position: toast.POSITION.BOTTOM_RIGHT,
					}
				)
			})
	}

	const typeEscolar = [
		{ value: "Médio", label: "Médio" },
		{ value: "Técnico", label: "Profissional" },
		{ value: "Superior", label: "Superior" },
	]

	const typeGrau = [
		{ value: "Tecnólogo", label: "Tecnólogo" },
		{ value: "Graduação", label: "Graduação" },
		{ value: "Pós-graduação", label: "Pós-graduação" },
		{ value: "Mestrado", label: "Mestrado" },
		{ value: "Doutorado", label: "Doutorado" },
	]

	const typeStatus = [
		{ value: "Completo", label: "Completo" },
		{ value: "Em andamento", label: "Em andamento" },
		{ value: "Incompleto", label: "Incompleto" },
	]

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
				<Title style={{ marginBottom: 32 }}>Formação acadêmica</Title>

				{academic.map((fields, index) => {
					return (
						<section key={index} style={{ marginTop: 24 }}>
							<InputGroup>
								<SelectInput
									defaultValue={fields.level_of_education}
									ref={register()}
									name={`academic_formations.${index}.level_of_education`}
									control={control}
									errors={errors}
									errorMessage="Selecione um tipo"
									placeholder="Selecione seu nível de escolaridade"
									options={typeEscolar}
								>
									Nível de escolaridade
								</SelectInput>
							</InputGroup>

							<InputGroup>
								<SelectInput
									defaultValue={fields.degree}
									ref={register()}
									name={`academic_formations.${index}.degree`}
									control={control}
									errors={errors}
									errorMessage="Selecione um tipo"
									placeholder="Selecione o grau de escolaridade"
									options={typeGrau}
								>
									Grau
								</SelectInput>
							</InputGroup>

							<InputGroup>
								<SelectInput
									defaultValue={fields.status}
									ref={register()}
									name={`academic_formations.${index}.status`}
									control={control}
									errors={errors}
									errorMessage="Selecione um tipo"
									placeholder="Selecione o status atual"
									options={typeStatus}
								>
									Status
								</SelectInput>
							</InputGroup>

							<InputGroup>
								<Input
									defaultValue={fields.institution}
									ref={register()}
									name={`academic_formations.${index}.institution`}
									errors={errors}
									errorMessage="Campo necessário"
									placeholder="Digite a instituição"
								>
									Instituição
								</Input>
							</InputGroup>

							<InputGroup>
								<Input
									defaultValue={fields.course}
									ref={register()}
									name={`academic_formations.${index}.course`}
									errors={errors}
									errorMessage="Campo necessário"
									placeholder="Digite o curso"
								>
									Curso
								</Input>
							</InputGroup>

							<InputGroup>
								<InputWithMask
									defaultValue={fields.start_date}
									ref={register()}
									name={`academic_formations.${index}.start_date`}
									errors={errors}
									control={control}
									mask={`99/99/9999`}
									errorMessage="Campo necessário"
									validate={
										!handleParseDate(datesValidation[index]?.start) &&
										"Digite uma data válida"
									}
									onKeyUp={(e) =>
										handleSetStartDate(index, e.target.value)
									}
									placeholder="__/__/____"
								>
									Início
								</InputWithMask>
								<InputWithMask
									defaultValue={fields.end_date}
									ref={register()}
									name={`academic_formations.${index}.end_date`}
									errors={errors}
									control={control}
									mask={`99/99/9999`}
									onKeyUp={(e) =>
										handleSetEndDate(index, e.target.value)
									}
									validate={
										handleParseDate(datesValidation[index]?.start) >
											handleParseDate(
												datesValidation[index]?.end
											) &&
										"A data de término deve ser maior que de início"
									}
									errorMessage="Campo necessário"
									placeholder="__/__/____"
									// onChange={e => handleStartDate(e.target.value)}
								>
									Término
								</InputWithMask>
							</InputGroup>
						</section>
					)
				})}

				{/* {!academic[0] && (
          <>
            <InputGroup>
              <SelectInput
                ref={register()}
                name={`academic_formations.0.level_of_education`}
                control={control}
                errors={errors}
                errorMessage="Selecione um tipo"
                placeholder="Selecione seu nível de escolaridade"
                options={typeEscolar}
              >
                Nível de escolaridade
              </SelectInput>
            </InputGroup>

            <InputGroup>
              <SelectInput
                ref={register()}
                name={`academic_formations.0.degree`}
                control={control}
                errors={errors}
                errorMessage="Selecione um tipo"
                placeholder="Selecione o grau de escolaridade"
                options={typeGrau}
              >
                Grau
              </SelectInput>
            </InputGroup>

            <InputGroup>
              <SelectInput
                ref={register()}
                name={`academic_formations.0.status`}
                control={control}
                errors={errors}
                errorMessage="Selecione um tipo"
                placeholder="Selecione o status atual"
                options={typeStatus}
              >
                Status
              </SelectInput>
            </InputGroup>

            <InputGroup>
              <Input
                ref={register()}
                name={`academic_formations.0.institution`}
                errors={errors}
                errorMessage="Campo necessário"
                placeholder="Digite a instituição"
              >
                Instituição
              </Input>
            </InputGroup>

            <InputGroup>
              <Input
                ref={register()}
                name={`academic_formations.0.course`}
                errors={errors}
                errorMessage="Campo necessário"
                placeholder="Digite o curso"
              >
                Curso
              </Input>
            </InputGroup>

            <InputGroup>
              <InputWithMask
                ref={register()}
                name={`academic_formations.0.start_date`}
                errors={errors}
                control={control}
                mask={`99/99/9999`}
                errorMessage="Campo necessário"
                placeholder="__/__/____"
              >
                Início
              </InputWithMask>
              <InputWithMask
                ref={register()}
                name={`academic_formations.0.end_date`}
                errors={errors}
                control={control}
                mask={`99/99/9999`}
                errorMessage="Campo necessário"
                placeholder="__/__/____"
              >
                Término
              </InputWithMask>
            </InputGroup>
          </>
        )} */}

				<InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
					<AddGroup
						onClick={() => setAcademic((prev) => [...prev, prev++])}
						text="Adicionar formação acadêmica"
					/>
					{academic?.length > 1 && (
						<RemoveGroup
							onClick={() =>
								setAcademic((state) => [...state].slice(0, -1))
							}
							text="Remover formação acadêmica"
						/>
					)}
				</InputGroup>

				{/* <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`escolaridade`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione seu nível de escolaridade"
                        options={ typeEscolar }>
                        Nível de escolaridade
                    </SelectInput>
                </InputGroup>

                <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`grau`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione o grau de escolaridade"
                        options={ typeGrau }>
                        Grau
                    </SelectInput>
                </InputGroup>

                <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`status`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione o status atual"
                        options={ typeStatus }>
                        Grau
                    </SelectInput>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register({ required: true })}
                        name="instituicao"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="Digite a instituição">
                        Instituição
                    </Input>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register({ required: true })}
                        name="instituicao"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="Digite o curso">
                        Curso
                    </Input>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register({ required: true })}
                        name="instituicao"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="__/__/____">
                        Início
                    </Input>
                    <Input
                        ref={register({ required: true })}
                        name="instituicao"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="__/__/____">
                        Término
                    </Input>
                </InputGroup> */}
			</Card>

			<ButtonGroup>
				{!dontRedirect && (
					<Button
						disabled={loading}
						Tag={"button"}
						submit
						onClick={() => setExit(true)}
						// onClick={() => (changedMainEmail ? handleEmailModal() : null)}
						// to={finalRoute ? finalRoute : `/dashboard`}
						type="outlineWhite"
					>
						Salvar e sair
					</Button>
				)}
				<Button submit disabled={loading} Tag={"button"} type="secondary">
					{dontRedirect ? "Salvar" : "Continuar"}
				</Button>
			</ButtonGroup>
		</form>
	)
}

export { Academico }
