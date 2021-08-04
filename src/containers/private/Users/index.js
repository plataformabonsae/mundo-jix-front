import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Pdf from "react-to-pdf"

import { TitleAndBack } from "components/TitleAndBack"
import { ModalPage } from "components/ModalPage"
import { Payment } from "components/Payment"
import { Card } from "components/Card"
import { Title, Text } from "components/Text"
import Button from "components/Button"
import { File } from "components/Downloads"
import { Input, InputGroup, Textarea, Checkbox } from "components/Inputs"

import styles from "./styles.module.sass"

import prize from "assets/icons/prize.svg"
import person from "assets/icons/person.svg"
import telephone from "assets/icons/telephone.svg"
import mail from "assets/icons/mail.svg"
import social from "assets/icons/social.svg"

import { get } from "services/users"
import { BASEURL } from "utils/api"

import profile from "assets/logo/JixProfile.png"

const Users = (props) => {
	const dispatch = useDispatch()
	const { data: users } = useSelector((state) => state.users)
	const { data: usertype } = useSelector((state) => state.usertype)
	const { data: challenge } = useSelector((state) => state.challenge)
	const [modal, setModal] = useState(null)
	const [paymentModal, setPaymentModal] = useState(false)
	const { id } = useParams()
	const ref = React.createRef()

	const handleModal = (data) => {
		setModal(data)
	}

	const handlePaymentModal = () => setPaymentModal((prev) => !prev)

	useEffect(() => {
		dispatch(get(usertype, { challenge_id: id }))
	}, [dispatch, usertype, id])

	return (
		<div className={styles.wrapper}>
			<TitleAndBack data={challenge?.challenge} />
			<div className={styles.table}>
				<div ref={ref} className={styles.table__content}>
					<div className={styles.row}>
						<div className={styles.block}>
							<img src={prize} alt="Pontuação" />
						</div>

						<div className={styles.block}>
							<img src={person} alt="Participante" />{" "}
							<Text>Participante</Text>
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

							<div className={styles.block} style={{ height: 50 }}>
								<Title
									size={16}
									style={{
										fontWeight: "normal",
										display: "flex",
										alignItems: "center",
									}}
								>
									<img
										className={styles.profile}
										src={item.file ? BASEURL + item.file : profile}
										alt="Pontuação"
									/>
									<span>
										{item.name} {item.last_name}
									</span>
								</Title>
							</div>

							<div className={styles.block}>
								<Title size={16} style={{ fontWeight: "normal" }}>
									{item.phones[0]
										? item.phones[0]?.phone
										: "Sem telefone"}
								</Title>
							</div>

							<div className={styles.block}>
								<Title size={16} style={{ fontWeight: "normal" }}>
									{item.email}
								</Title>
							</div>

							<div className={styles.block}>
								<Title size={16} style={{ fontWeight: "normal" }}>
									{item.social_medias[0]
										? item.social_medias[0]?.link
										: "Sem Redes sociais"}
								</Title>
							</div>
						</div>
					))}
				</div>
				<div className={styles.buttons}>
					<Button Tag="span" type="green" onClick={() => handlePaymentModal()}>
						Mostrar mais 5 candidatos
					</Button>
				</div>
			</div>
			{modal && <Modal data={modal} setModal={setModal} />}
			{paymentModal && (
				<Payment
					price={"97,00"}
					title={"Efetue o pagamento para liberar mais 5 candidatos"}
					desc={
						"Não achou quem estava procurando? Não tem problema! Você pode acessar mais 5 dos melhores talentos agora mesmo!"
					}
					// typeOfPayment={"por desafio"}
					handleClose={handlePaymentModal}
					id={id}
					type={"users"}
					// isOpen={data?.challenge?.payed_for}
					currentChallenge={challenge}
				/>
			)}
		</div>
	)
}

const Modal = (props) => {
	const [academic, setAcademic] = useState([])
	const [links, setLinks] = useState([])
	const [portfolios, setPortfolios] = useState([])
	const [experiences, setExperiences] = useState([])

	const [currentJob, setCurrentJob] = useState([])
	const [currentSkills, setCurrentSkills] = useState([])
	// const [datesValidation, setDatesValidation] = useState([]);

	// const [portfolios, setPortfolios] = useState([]);
	// const [experiences, setExperiences] = useState([]);
	// const [links, setLinks] = useState([]);

	const [tels, setTels] = useState([])
	const [emails, setEmails] = useState([])
	// const [emailError, setEmailError] = useState();
	const [socials, setSocials] = useState([])

	useEffect(() => {
		const append = (tel) => {
			setAcademic((prev) => [...prev, tel])
		}

		if (props.data.academicformations?.length) {
			for (let i = 0; i < props.data.academicformations.length; i++) {
				append(props.data.academicformations[i])
			}
		}

		return () => {
			setAcademic([])
		}
	}, [props.data])

	useEffect(() => {
		const append = (tel) => {
			setTels((prev) => [...prev, tel])
		}
		if (props.data.phones?.length) {
			for (let i = 0; i < props.data.phones.length; i++) {
				append({
					phone: props.data.phones[i].phone,
					phone_type_id: props.data.phones[i].phone_type_id,
					id: props.data.phones[i].id,
				})
			}
		}
		return () => {
			setTels([])
		}
	}, [props.data])

	useEffect(() => {
		const append = (tel) => {
			setEmails((prev) => [...prev, tel])
		}
		if (props.data.emails.length) {
			for (let i = 0; i < props.data.emails.length; i++) {
				append(props.data.emails[i])
			}
		}
		return () => {
			setEmails([])
		}
	}, [props.data])

	useEffect(() => {
		const append = (tel) => {
			setSocials((prev) => [...prev, tel])
		}
		if (props.data?.socialMedias?.length) {
			for (let i = 0; i < props.data.socialMedias.length; i++) {
				append(props.data.socialMedias[i])
			}
		}
		if (props.data?.social_medias?.length) {
			for (let i = 0; i < props.data.social_medias.length; i++) {
				append(props.data.social_medias[i])
			}
		}
		return () => {
			setSocials([])
		}
	}, [props.data])

	const marginTitulo = {
		marginBottom: 32,
	}

	useEffect(() => {
		const append = (skill) => setCurrentSkills((prev) => [...prev, skill])
		const skills = props.data.skills
		for (let i = 0; i < skills.length; i++) {
			append({ value: skills[i].id, label: skills[i].title })
		}
	}, [props.data.skills])

	useEffect(() => {
		const append = (xp) => {
			setExperiences((prev) => [...prev, xp])
		}
		if (props.data.experiences.length) {
			for (let i = 0; i < props.data.experiences.length; i++) {
				append(props.data.experiences[i])
			}
		} else {
			append({})
		}
		return () => {
			setExperiences([])
		}
	}, [props.data])

	useEffect(() => {
		const append = (link) => {
			setLinks((prev) => [...prev, link])
		}
		if (props.data.links?.length) {
			for (let i = 0; i < props.data.links.length; i++) {
				append(props.data.links[i])
			}
		} else {
			append({})
		}
		return () => {
			setLinks([])
		}
	}, [props.data])

	useState(() => {
		const appendCurrentJob = (link) => {
			setCurrentJob((prev) => [...prev, link])
		}
		if (props.data.experiences.length) {
			for (let i = 0; i < props.data.experiences.length; i++) {
				appendCurrentJob({
					status: props.data.experiences[i].current_job === 1 ? true : false,
					id: props.data.experiences[i].id,
				})
			}
		} else {
			appendCurrentJob([])
		}
		return () => {
			setCurrentJob([])
		}
	}, [props.data])

	useEffect(() => {
		const append = (port) => {
			setPortfolios((prev) => [...prev, port])
		}
		if (props.data.portfolios?.length) {
			for (let i = 0; i < props.data.portfolios.length; i++) {
				append(props.data.portfolios[i])
			}
		} else {
			append({})
		}
		return () => {
			setPortfolios([])
		}
	}, [props.data])

	useEffect(() => {
		console.log("prop", props.data)
	}, [props])

	return (
		<ModalPage title={"Ver mais"} handleClose={() => props.setModal(null)}>
			<div className={styles.modal__wrapper}>
				<Card noShadow={true}>
					<Title style={marginTitulo}>Dados pessoais</Title>
					<div className={styles.profile}>
						<div className={styles.image}>
							<img
								src={
									props.data.file ? BASEURL + props.data.file : profile
								}
								alt={props.data.name}
							/>
						</div>
					</div>
					<InputGroup>
						<Input readOnly value={props.name || props.data.name}>
							Nome
						</Input>
						<Input
							readOnly
							value={props?.last_name || props?.data?.last_name}
						>
							Sobrenome
						</Input>
					</InputGroup>
					<InputGroup>
						<Input readOnly value={props?.cpf || props?.data?.cpf}>
							CPF
						</Input>
						<Input
							readOnly
							value={props?.birthdate || props?.data?.birthdate}
						>
							Data de nascimento
						</Input>
					</InputGroup>
				</Card>

				<Card noShadow={true}>
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
						)
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
							)
						})}
				</Card>

				<Card noShadow={true}>
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
						)
					})}
					<Textarea readOnly value={props.data.description}>
						Biografia
					</Textarea>
				</Card>
				<Card noShadow={true}>
					<Title style={{ marginBottom: 32 }}>Formação acadêmica</Title>

					{academic.map((fields, index) => {
						return (
							<section key={index} style={{ marginTop: 24 }}>
								<InputGroup>
									<Input readOnly value={fields.level_of_education}>
										Nível de escolaridade
									</Input>
								</InputGroup>

								<InputGroup>
									<Input readOnly value={fields.degree}>
										Grau
									</Input>
								</InputGroup>

								<InputGroup>
									<Input readOnly value={fields.status}>
										Status
									</Input>
								</InputGroup>

								<InputGroup>
									<Input readOnly value={fields.institution}>
										Instituição
									</Input>
								</InputGroup>

								<InputGroup>
									<Input readOnly value={fields.course}>
										Curso
									</Input>
								</InputGroup>

								<InputGroup>
									<Input readOnly value={fields.start_date}>
										Início
									</Input>
									<Input readOnly value={fields.end_date}>
										Término
									</Input>
								</InputGroup>
							</section>
						)
					})}
				</Card>
				<Card noShadow={true}>
					<Title style={{ marginBottom: 32 }}>Perspectivas</Title>

					<InputGroup>
						<Input readOnly value={props.data.current_situation}>
							Situação atual
						</Input>
					</InputGroup>

					<InputGroup>
						<Input readOnly value={props.data.looking_for}>
							O que busca?
						</Input>
					</InputGroup>
				</Card>

				<Card noShadow={true}>
					<Title style={{ marginBottom: 32 }}>Skills</Title>
					<div className={styles.skill__wrapper}>
						{currentSkills?.map((item, index) => (
							<div className={styles.skill__item}>{item.label}</div>
						))}
					</div>
				</Card>

				<Card noShadow={true}>
					<Title style={{ marginBottom: 32 }}>Portfolio</Title>

					{portfolios.map((field, index) => {
						return (
							<InputGroup>
								<Input readOnly value={field.link}>
									Link
								</Input>
								<Input readOnly value={field.platform}>
									Plataforma
								</Input>
							</InputGroup>
						)
					})}
				</Card>

				<Card noShadow={true}>
					<Title style={{ marginBottom: 32 }}>Currículo</Title>

					<InputGroup>
						{props.data.curriculum_file && (
							<File
								file={props.data.curriculum_file}
								name={props.data.curriculum_filename}
								extension={props.data.curriculum_fileextension}
							/>
						)}
					</InputGroup>
				</Card>

				<Card noShadow={true}>
					<Title style={{ marginBottom: 32 }}>Experiência Profissional</Title>

					{experiences.map((field, index) => {
						return (
							<div key={index}>
								<InputGroup>
									<Input readOnly defaultValue={field.role}>
										Cargo
									</Input>
								</InputGroup>

								<InputGroup>
									<Input readOnly value={field.company}>
										Empresa
									</Input>
								</InputGroup>

								<InputGroup>
									<Input readOnly value={field.start_date}>
										Início
									</Input>
									{/* {console.log(currentJob[index].status)} */}

									<Input
										readOnly
										value={
											(currentJob[index].status && " ") ||
											field.end_date
										}
									>
										Término
									</Input>

									<div style={{ width: "100%", textAlign: "right" }}>
										<Checkbox
											readOnly
											defaultChecked={
												field.current_job === 1 ? true : false
											}
										>
											Meu Emprego atual
										</Checkbox>
									</div>
								</InputGroup>

								<InputGroup>
									<Textarea readOnly value={field.main_activities}>
										Principais atividades
									</Textarea>
								</InputGroup>
							</div>
						)
					})}
				</Card>

				<Card noShadow={true}>
					<Title style={{ marginBottom: 32 }}>Outros links</Title>
					{links.map((field, index) => {
						return (
							<InputGroup key={index}>
								<Input readOnly value={field.link}>
									Link
								</Input>
								<Input readOnly value={field.platform}>
									Tipo de rede
								</Input>
							</InputGroup>
						)
					})}
				</Card>
			</div>
		</ModalPage>
	)
}

export { Users }
