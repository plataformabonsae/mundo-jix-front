import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { Title } from "components/Text"
import Button from "components/Button"
import { Input, Textarea, InputGroup, InputFile } from "components/Inputs"
import { Card } from "components/Card"
import styles from "./styles.module.sass"
import {
	material,
	updateMaterial,
	up,
	down,
	get,
	deleteTrail as deleteTrailService,
} from "services/createTrail"
import { File } from "components/Downloads"

const Material = (props) => {
	const dispatch = useDispatch()
	const [editable, setEditable] = useState(true)
	const [expand, setExpand] = useState(true)
	const { trails, data, index, handleData, handleCopy, handleDelete } = props
	const { data: usertype } = useSelector((state) => state.usertype)
	const { register, errors, control, handleSubmit } = useForm({
		reValidateMode: "onChange",
	})

	const { id } = useParams()

	useEffect(() => {
		if (data) setEditable(false)
	}, [data])

	useEffect(() => {
		if (data) setExpand(false)
	}, [data])

	const handleEdit = () => setEditable((prev) => !prev)

	const onSubmit = async (formData) => {
		if (!!data) {
			Promise.all([
				dispatch(
					updateMaterial(usertype, {
						trail_id: data?.id,
						challenge_id: id,
						...formData,
						file: formData.file[0],
					})
				),
			])
				.then(() => dispatch(get(usertype, { challenge_id: id })))
				.then((res) => {
					toast.success("Material salvo", {
						position: toast.POSITION.BOTTOM_RIGHT,
					})
				})
				.catch((error) => {
					toast.error("Um erro ocorreu ao salvar o material", {
						position: toast.POSITION.BOTTOM_RIGHT,
					})
				})
		}
		Promise.all([
			dispatch(
				material(usertype, {
					challenge_id: id,
					...formData,
					file: formData.file[0],
				})
			),
		])
			.then(() => dispatch(get(usertype, { challenge_id: id })))
			.then((res) => {
				toast.success("Material salvo", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.catch((error) => {
				toast.error("Um erro ocorreu ao salvar o material", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const deleteTrail = async (trail_id) => {
		Promise.all([dispatch(deleteTrailService(usertype, { trail_id: trail_id }))])
			.then(() => dispatch(get(usertype, { challenge_id: id })))
			.then((res) => {
				toast.success("Trilha deletada", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.catch((error) => {
				toast.error("Um erro ocorreu ao deletar a trilha.", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const orderUp = async (trail_id) => {
		Promise.all([
			dispatch(
				up(usertype, {
					trail_id: trail_id,
				})
			),
		])
			.then(() => {
				dispatch(get(usertype, { challenge_id: id }))
			})

			.then((res) => {
				toast.success("Ordem mudada", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.catch((error) => {
				toast.error("Um erro ocorreu ao ordenar a trilha.", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const orderDown = async (trail_id) => {
		Promise.all([
			dispatch(
				down(usertype, {
					trail_id: trail_id,
				})
			),
		])
			.then(() => dispatch(get(usertype, { challenge_id: id })))
			.then((res) => {
				toast.success("Ordem mudada", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.catch((error) => {
				toast.error("Um erro ocorreu ao ordenar a trilha.", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const handleExpand = () => setExpand((prev) => !prev)

	return (
		<Card border noShadow={!editable}>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<header className={styles.header}>
					<Title onClick={() => handleExpand()} style={{ cursor: "pointer" }}>
						{Number.isInteger(index) && index + 1 + ")"} Material{" "}
						{!!data && (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								style={{ position: "relative", top: 2 }}
							>
								<path
									d="M18.4849 3.46122C18.2201 3.19596 17.7904 3.1955 17.5256 3.46009L9.38722 11.577L6.4509 8.38791C6.19718 8.11249 5.7682 8.09463 5.49233 8.34832C5.21667 8.60204 5.19902 9.03123 5.45274 9.30689L8.86733 13.0152C8.99238 13.1511 9.16739 13.23 9.35192 13.2339C9.35688 13.2341 9.36166 13.2341 9.36641 13.2341C9.54574 13.2341 9.71825 13.1629 9.84534 13.0362L18.4835 4.42067C18.749 4.15611 18.7495 3.72647 18.4849 3.46122Z"
									fill="#6AE87B"
									stroke="#6AE87B"
								/>
								<path
									d="M18.3216 9.32159C17.9469 9.32159 17.6432 9.62527 17.6432 10C17.6432 14.2146 14.2146 17.6432 10 17.6432C5.78561 17.6432 2.35679 14.2146 2.35679 10C2.35679 5.78561 5.78561 2.35679 10 2.35679C10.3747 2.35679 10.6784 2.05311 10.6784 1.67841C10.6784 1.30368 10.3747 1 10 1C5.03734 1 1 5.03734 1 10C1 14.9624 5.03734 19 10 19C14.9624 19 19 14.9624 19 10C19 9.6253 18.6963 9.32159 18.3216 9.32159Z"
									fill="#6AE87B"
									stroke="#6AE87B"
								/>
							</svg>
						)}
					</Title>
					<div className={styles.edit}>
						<span className={styles.button} onClick={() => handleEdit(index)}>
							<svg
								width="30"
								height="30"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="15" cy="15" r="15" fill="#0094FF" />
								<path
									d="M8.18848 19.2186V21.8748H10.9235L18.9899 14.0407L16.2549 11.3844L8.18848 19.2186ZM21.105 11.9865C21.3894 11.7102 21.3894 11.264 21.105 10.9877L19.3984 9.33023C19.1139 9.05398 18.6544 9.05398 18.37 9.33023L17.0353 10.6265L19.7703 13.2827L21.105 11.9865Z"
									fill="white"
								/>
							</svg>
						</span>
						{!!data && (
							<span
								className={styles.button}
								onClick={() => handleCopy(index)}
							>
								<svg
									width="16"
									height="18"
									viewBox="0 0 16 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M11.4545 0H1.63636C0.736364 0 0 0.736364 0 1.63636V13.0909H1.63636V1.63636H11.4545V0ZM10.6364 3.27273L15.5455 8.18182V16.3636C15.5455 17.2636 14.8091 18 13.9091 18H4.90091C4.00091 18 3.27273 17.2636 3.27273 16.3636L3.28091 4.90909C3.28091 4.00909 4.00909 3.27273 4.90909 3.27273H10.6364ZM9.81818 9H14.3182L9.81818 4.5V9Z"
										fill="#05B1A8"
									/>
								</svg>
							</span>
						)}

						{!!data ? (
							<span
								className={styles.button}
								onClick={() => deleteTrail(data.id)}
							>
								<svg
									width="18"
									height="20"
									viewBox="0 0 18 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 5H17"
										stroke="#FF445A"
										stroke-width="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M7 9V15"
										stroke="#FF445A"
										stroke-width="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M11 9V15"
										stroke="#FF445A"
										stroke-width="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5H2Z"
										stroke="#FF445A"
										stroke-width="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						) : (
							<span
								className={styles.button}
								onClick={() => handleDelete(index)}
							>
								<svg
									width="18"
									height="20"
									viewBox="0 0 18 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 5H17"
										stroke="#FF445A"
										stroke-width="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M7 9V15"
										stroke="#FF445A"
										stroke-width="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M11 9V15"
										stroke="#FF445A"
										stroke-width="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5H2Z"
										stroke="#FF445A"
										stroke-width="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						)}

						{!!data && (
							<>
								<span
									className={styles.button}
									onClick={() => orderUp(data.id)}
								>
									<svg
										width="12"
										height="8"
										viewBox="0 0 12 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z"
											fill="#6C767D"
										/>
									</svg>
								</span>
								<span
									className={styles.button}
									onClick={() => orderDown(data.id)}
								>
									<svg
										width="12"
										height="8"
										viewBox="0 0 12 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z"
											fill="#6C767D"
										/>
									</svg>
								</span>
							</>
						)}
					</div>
				</header>
				{expand && (
					<div style={{ marginTop: 32 }}>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Nome do material
						</Title>
						<InputGroup>
							<Input
								defaultValue={
									trails[index]?.data?.name || data?.material?.name
								}
								ref={register({ required: true })}
								errors={errors}
								disabled={!editable}
								name="name"
								errorMessage="Digite o nome do material"
								placeholder="Digite o nome do material"
							></Input>
						</InputGroup>
						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Descreva o material
						</Title>
						<InputGroup>
							<Textarea
								defaultValue={
									trails[index]?.data?.description ||
									data?.material?.description
								}
								ref={register({ required: true })}
								name="description"
								errors={errors}
								disabled={!editable}
								rows="6"
								errorMessage="Escreva aqui a descrição do material"
								placeholder="Escreva aqui a descrição do material"
							></Textarea>
						</InputGroup>

						<Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
							Arquivo
						</Title>
						{!!data && data?.material?.file ? (
							<div className={styles.files}>
								{data?.material?.file && (
									<File
										file={data?.material?.file}
										name={data?.material?.filename}
										extension={data?.material?.fileextension}
									/>
								)}
							</div>
						) : (
							<InputFile
								ref={register()}
								name={`file`}
								disabled={!editable}
								control={control}
								errors={errors}
								errorMessage="Anexe o material"
								placeholder="Anexe o material"
							/>
						)}
						{!data ? (
							<Button Tag={"button"} submit type={"green"}>
								Salvar
							</Button>
						) : (
							editable && (
								<Button Tag={"button"} submit type={"secondary"}>
									Salvar edição
								</Button>
							)
						)}
					</div>
				)}
			</form>
		</Card>
	)
}

export { Material }
