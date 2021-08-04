import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import parse from "html-react-parser"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper/core"
import YouTube from "react-youtube"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"

import { Card } from "components/Card"
import { Input, InputGroup, Textarea } from "components/Inputs"
import { ProfileCard } from "components/ProfileCard"
import { Dialog } from "components/Dialog"
import { FeedbackCard, CreateFeedback } from "components/FeedbackCard"
import { Title, Text } from "components/Text"
import { TabFlat } from "components/Tabs"
import Button from "components/Button"
import { WindowSize } from "utils/etc"

import profileDefault from "assets/logo/JixProfile.png"
import guardia from "assets/components/ProfileCard/guardia.svg"
import material from "assets/components/Project/material.svg"
import link from "assets/icons/link-black.svg"

import chrevron from "assets/components/Project/chevron.svg"

import * as colors from "utils/styles/Colors"

import { BASEURL } from "utils/api"

import { get as assessment, getAsJudge, avaliate } from "services/assessment"
import { get } from "services/project"
import { deleteMaterial } from "services/deleteMaterial"
import { kick, leave, transfer } from "services/team"
import { getAsMentor, getAsTalent } from "services/feedbacks"

import styles from "./styles.module.sass"

SwiperCore.use([Navigation])

const Carousel = (props) => {
	const { width } = WindowSize()
	const dispatch = useDispatch()
	const [activeTab, setActiveTab] = useState("meu-projeto")
	const [hasAvaliate, sethasAvaliate] = useState(false)
	const [modalFeedback, setModalFeedback] = useState(false)
	const [modalAvaliation, setModalAvaliation] = useState(false)
	const { data: feedbacks } = useSelector((state) => state.feedbacks)
	const { data: assessments } = useSelector((state) => state.assessment)
	const { data: user } = useSelector((state) => state.user)
	const { current: currentProject } = useSelector((state) => state.projects)
	const { data: usertype } = useSelector((state) => state.usertype)
	const { data: project } = useSelector((state) => state.project)
	const { data: challenge } = useSelector((state) => state.challenge)
	const { register, handleSubmit, errors } = useForm()
	const { data: judgeAssessment } = useSelector((state) => state.judgeAssessment)
	const { data } = props
	const { type, id, trail_type } = useParams()
	const [modalAvaliationComfirmation, setModalAvaliationComfirmation] = useState(false)
	// useEffect(() => {
	//   if (!user?.user?.is_judge || !user?.user?.is_mentor)
	// }, [dispatch, usertype, data, user]);

	// Assets
	useEffect(() => {
		if (user.user && (currentProject || project)) {
			const request =
				user?.user?.is_mentor || user?.user?.is_judge || usertype === "empresa"
					? getAsJudge
					: assessment
			dispatch(
				request(usertype, {
					project_id: data.project?.id ? data.project?.id : trail_type,
					challenge_id: id,
				})
			)
		}
	}, [dispatch, usertype, data, currentProject, id, user, project, trail_type])

	useEffect(() => {
		const judges = assessments?.judges.filter((el) => el.judge.id == user?.user.id)
		const avaliate = assessments?.assessments?.length
		if (judges?.length && !!avaliate) {
			sethasAvaliate(true)
		} else {
			sethasAvaliate(false)
		}
		/* if (!!avaliate) {
			console.log("on", assessments?.assessments)
			sethasAvaliate(false)
		} else {
			sethasAvaliate(true)
		} */
	}, [assessments?.judges, user?.user])
	// Feedbacks
	useEffect(() => {
		const request =
			user?.user?.is_mentor || user?.user?.is_judge || usertype === "empresa"
				? getAsMentor
				: getAsTalent
		dispatch(
			request(usertype, {
				challenge_id: id,
				project_id: trail_type,
			})
		)
	}, [data?.project?.id, id, dispatch, usertype, user, trail_type])

	const opts = {
		height: "460",
		width: "100%'",
	}
	const small = {
		height: "190",
		width: "100%'",
	}

	const isKeeper = props.keeper !== user?.user?.id

	const handleOnReady = () => {
		// console.log("onready yt video");
	}

	const handleModalFeedback = () => {
		setModalFeedback((prev) => !prev)
	}
	const handlerDelete = async (material_id) => {
		const req = dispatch(deleteMaterial(usertype, { material_id }))
		await req
			.then((res) => window.location.reload())
			.catch((err) => {
				toast.error("Algum erro ocorreu ao criar o desafio", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const handleModalAvaliation = () => {
		setModalAvaliation((prev) => !prev)
	}

	const handleTabs = (tab) => {
		setActiveTab(tab)
	}

	const submitAssessment = (data) => {
		const { grade, assessment_id, feedback } = data
		dispatch(
			avaliate(usertype, {
				...data,
				feedback: JSON.stringify(feedback),
				grade: JSON.stringify(grade),
				assessment_id: JSON.stringify(assessment_id),
			})
		)
			.then((res) => {
				toast.success("Avaliação enviada", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.then(() =>
				dispatch(
					getAsJudge(usertype, {
						project_id: currentProject?.project?.id,
						challenge_id: challenge.challenge.id,
					})
				)
			)
			.then(() => {
				handleModalAvaliation()
			})
			.catch((error) => {
				toast.error("Algum erro ocorreu ao enviar a avaliação", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
		setModalAvaliationComfirmation(false)
	}

	return (
		<section className={styles.carousel}>
			<header className={styles.header}>
				<div className={styles.header__links}>
					<TabFlat
						active={activeTab === "meu-projeto"}
						Tag="span"
						onClick={() => handleTabs("meu-projeto")}
					>
						{user?.user?.is_mentor || user?.user?.is_judge
							? "Projeto"
							: "Meu projeto"}
					</TabFlat>
					{data?.team && (
						<TabFlat
							active={activeTab === "equipe"}
							Tag="span"
							onClick={() => handleTabs("equipe")}
						>
							Equipe
						</TabFlat>
					)}

					<TabFlat
						active={activeTab === "feedbacks"}
						Tag="span"
						onClick={() => handleTabs("feedbacks")}
					>
						Feedback
					</TabFlat>
					{!user?.user?.is_mentor && (
						<TabFlat
							active={activeTab === "avaliacao"}
							Tag="span"
							onClick={() => handleTabs("avaliacao")}
						>
							Avaliação
						</TabFlat>
					)}
				</div>
				{(user?.user?.is_mentor || user?.user?.is_judge) &&
				activeTab === "feedbacks" ? (
					<Button
						Tag="span"
						type={"tertiary"}
						onClick={() => handleModalFeedback()}
					>
						Enviar feedback
					</Button>
				) : null}
				{console.log("teste", user?.user)}
				{user?.user?.is_mentor ||
				user?.user?.is_judge ||
				data?.team?.guardian_id !== user?.user?.id ||
				usertype === "empresa"
					? null
					: activeTab === "meu-projeto" &&
					  (isKeeper || !data?.team) && (
							<Button
								Tag="span"
								type={"tertiary"}
								onClick={() => props.modal()}
							>
								Editar projeto
							</Button>
					  )}
				{user?.user?.is_mentor ||
				user?.user?.is_judge ||
				data?.team?.guardian_id !== user?.user?.id
					? null
					: activeTab === "equipe" && (
							<>
								{data?.teammates?.length < 4 ? (
									<Button
										type={"tertiary"}
										to={`/desafios/${type}/inscricao/${id}/convidar`}
									>
										Convidar participante
									</Button>
								) : (
									<Text>Seu time está completo</Text>
								)}
							</>
					  )}
				{!hasAvaliate && !!user?.user?.is_judge && activeTab === "avaliacao" ? (
					<Button
						Tag="span"
						type={"tertiary"}
						onClick={() => handleModalAvaliation()}
					>
						Avaliar projeto
					</Button>
				) : null}
			</header>
			{activeTab === "meu-projeto" && (
				<Card border noShadow>
					<div className={styles.videos}>
						<style>
							{`
              .swiper-button-next {
                position: absolute;
                text-align: center;
                z-index: 2;
                width: 50px;
                bottom: 0;
                top: 0;
                right: 0;
                background: rgb(228, 229, 231);
                cursor: pointer;
              }

              .swiper-button-next::before {
                content: '';
                display: inline-block;
                position: absolute;
                z-index: 3;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                transform: translate(-50%, -50%);
                background-image: url(${chrevron});
                background-repeat: no-repeat;
                object-fit: cover;
              }
              
              .swiper-button-prev {
                position: absolute;
                z-index: 2;
                text-align: center;
                width: 50px;
                bottom: 0;
                top: 0;
                left: 0;
                background: rgb(228, 229, 231);
                cursor: pointer;
              }

              .swiper-button-prev::before {
                content: '';
                display: inline-block;
                position: absolute;
                z-index: 3;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                transform: translate(-50%, -50%) rotate(180deg);
                background-image: url(${chrevron});
                background-repeat: no-repeat;
                object-fit: cover;
              }
              `}
						</style>
						{!!data?.project?.videos?.length ||
						!!currentProject?.project?.videos?.length ? (
							<Swiper
								navigation
								observer={activeTab}
								spaceBetween={0}
								slidesPerView={1}
							>
								{(
									data?.project?.videos ||
									currentProject?.project?.videos
								).map(
									(item) =>
										item.link && (
											<SwiperSlide key={item.id}>
												<div style={{ padding: "0 50px" }}>
													<YouTube
														videoId={item.link.split("v=")[1]}
														opts={width > 762 ? opts : small}
														onReady={handleOnReady}
													/>
												</div>
											</SwiperSlide>
										)
								)}
							</Swiper>
						) : (
							<>Sem pitch cadastrado</>
						)}
					</div>
					<div className={styles.content}>
						<section className={styles.desc}>
							<Title className={styles.title} size={18}>
								{data?.project?.name}
							</Title>
							<div className={styles.desc__title}>Descrição</div>
							<div className={styles.forcefont}>
								{(data?.project?.description ||
									currentProject?.project?.description) &&
									parse(
										data?.project?.description ||
											currentProject?.project?.description
									)}
							</div>
						</section>
						<section className={styles.downloads}>
							<Title size={18}>Materiais anexados</Title>
							<div className={styles.downloads__wrapper}>
								{(data?.project?.materials?.length > 0 ||
									currentProject?.project?.materials?.length > 0) &&
									(
										data?.project?.materials ||
										currentProject?.project?.materials
									).map((item) => (
										<div className={styles.file__wrapper}>
											<a
												href={BASEURL + item.file}
												rel="noreferrer"
												target={"_blank"}
												className={styles.downloads__material}
											>
												<img
													src={material}
													alt="Download de material"
												/>
												{item.filename}
											</a>
											{project?.guardian?.id === user?.user?.id ||
												(!project?.team?.id && (
													<span
														className={styles.file__delete}
														onClick={() =>
															handlerDelete(item.id)
														}
													>
														Deletar
													</span>
												))}
										</div>
									))}
								{(data?.project?.materials?.length === 0 ||
									currentProject?.project?.materials?.length === 0) &&
									"Sem materiais cadastrados"}
							</div>
							<Title style={{ marginTop: 32 }} size={18}>
								Links anexados
							</Title>
							<div className={styles.downloads__wrapper}>
								{(data?.project?.links?.length > 0 ||
									currentProject?.project?.links?.length > 0) &&
									(
										data?.project?.links ||
										currentProject?.project?.links
									).map((item) => (
										<a
											href={item.link}
											rel="noreferrer"
											target={"_blank"}
											className={styles.downloads__material}
										>
											<img src={link} alt="Link" />
											{item.link}
										</a>
									))}
								{(data?.project?.links?.length === 0 ||
									currentProject?.project?.links?.length === 0) &&
									"Sem links cadastrados"}
							</div>
						</section>
					</div>
				</Card>
			)}
			{activeTab === "equipe" && (
				<section className={styles.equipe}>
					<Card noShadow border>
						<Title style={{ marginBottom: 32 }}>
							Time {data?.team?.name || currentProject?.team[0]?.name}
						</Title>
						{!!data?.guardian && (
							<TeamIntegrant
								teamId={data?.team?.id}
								challengeId={data?.challenge?.id}
								key={data.guardian.id}
								data={data.guardian}
								keeper={data.guardian}
							/>
						)}
						{!!data?.teammates &&
							[...data?.teammates].map((item) => (
								<TeamIntegrant
									// accepted={item.pivot.is_effected}
									challengeId={data?.challenge?.id}
									accepted={true}
									teamId={data?.team?.id}
									key={item.id}
									data={item}
								/>
							))}
						{data?.team?.users?.map((item) => (
							<TeamIntegrant
								// accepted={item.pivot.is_effected}
								challengeId={data?.challenge?.id}
								accepted={true}
								teamId={data?.team?.id}
								key={item.id}
								data={item}
							/>
						))}
						{currentProject?.team[0]?.users?.map((item) => (
							<TeamIntegrant
								// accepted={item.pivot.is_effected}
								challengeId={data?.challenge?.id}
								accepted={true}
								teamId={data?.team?.id}
								key={item.id}
								data={item}
							/>
						))}
					</Card>
				</section>
			)}
			{activeTab === "feedbacks" && (
				<section className={styles.feedbacks}>
					{feedbacks?.feedbacks?.map((item) => (
						<FeedbackCard
							challengeId={feedbacks?.challenge?.id}
							projectId={feedbacks?.project?.id}
							key={item.id}
							data={item}
							buttonText={"Visualizar"}
						/>
					))}
					{feedbacks?.feedbacks?.length === 0 && (
						<Text>O projeto ainda não tem feeedback do mentor.</Text>
					)}
				</section>
			)}
			{activeTab === "avaliacao" && (
				<section className={styles.avaliacao}>
					{!!assessments?.final_grades?.assessments?.length ? (
						<Card noShadow border>
							<section className={styles.avaliacao__content}>
								<section className={styles.avaliacao__grades}>
									<Title
										size={16}
										style={{
											textAlign: "center",
											marginBottom: 24,
											textTransform: "uppercase",
										}}
									>
										Notas por matéria
									</Title>
									{assessments?.final_grades?.assessments?.map(
										(item) => (
											<Card
												key={item?.assessment_id}
												className={styles.avaliacao__card}
												noShadow
												border
											>
												<div
													className={
														styles.avaliacao__card__wrapper
													}
												>
													<Title size={16}>
														{item?.assessment?.evaluate}
													</Title>
													<Title>
														{item.grade}
														<span style={{ opacity: 0.15 }}>
															/
															{item?.assessment?.max_grade *
																assessments?.judges
																	?.length}
														</span>
													</Title>
												</div>
											</Card>
										)
									)}
								</section>
								<section className={styles.avaliacao__total}>
									<Title
										size={16}
										style={{
											textAlign: "center",
											marginBottom: 24,
											textTransform: "uppercase",
										}}
									>
										Nota final
									</Title>
									<Title
										style={{ textAlign: "center", marginBottom: 24 }}
										size={180}
									>
										{assessments?.final_grades?.final_grade}
									</Title>
								</section>
							</section>
						</Card>
					) : (
						<Text>O projeto ainda não foi avaliado.</Text>
					)}
					{assessments?.judges?.map((item) => (
						<Card noShadow border>
							<section className={styles.avaliacao__content}>
								<section className={styles.avaliacao__grades}>
									<Title
										size={16}
										style={{
											// textAlign: "center",
											marginBottom: 24,
											textTransform: "uppercase",
										}}
									>
										Avaliação do jurado {item.judge.name}
									</Title>
									{item?.avaliations.map((avaliation) => (
										<Card
											key={avaliation.assessment_id}
											className={styles.avaliacao__card}
											noShadow
											border
										>
											<div
												className={
													styles.avaliacao__card__wrapper
												}
											>
												<Title size={16}>
													{avaliation?.assessment?.evaluate}
												</Title>
												<Title>
													{avaliation?.grade}
													<span style={{ opacity: 0.2 }}>
														/
														{
															avaliation?.assessment
																?.max_grade
														}
													</span>
												</Title>
											</div>
											<hr
												style={{ marginTop: 22, opacity: 0.15 }}
											/>
											<Title
												size={16}
												style={{
													color: colors.MEDIUM_GRAY,
													textAlign: "center",
													margin: `24px 0`,
												}}
											>
												Feedback do jurado
											</Title>
											<Text>{avaliation?.feedback}</Text>
										</Card>
									))}
								</section>
							</section>
						</Card>
					))}
				</section>
			)}
			{modalFeedback && (
				<CreateFeedback
					handleModal={handleModalFeedback}
					challengeId={data?.challenge?.id | currentProject?.challenge?.id}
					projectId={data?.project?.id || currentProject?.project?.id}
				/>
			)}
			{modalAvaliation && (
				<form onSubmit={handleSubmit(submitAssessment)}>
					<Dialog
						style={{ minWidth: 600 }}
						header={"Avaliar projeto"}
						handleClose={handleModalAvaliation}
					>
						<input
							ref={register()}
							name={`judge_id`}
							type={"hidden"}
							value={user?.user.id}
						/>
						<input
							ref={register()}
							name={`project_id`}
							type={"hidden"}
							value={currentProject?.project?.id}
						/>
						<input
							ref={register()}
							name={`challenge_id`}
							type={"hidden"}
							value={challenge?.challenge?.id}
						/>
						{assessments?.assessments?.map((avaliation, index) => (
							<Card
								key={avaliation.id}
								className={styles.avaliacao__card}
								noShadow
								border
							>
								<input
									ref={register()}
									name={`assessment_id.${index}`}
									type={"hidden"}
									value={avaliation.id}
								/>
								<div className={styles.avaliacao__card__wrapper}>
									<Title size={16}>{avaliation.evaluate}</Title>
									<div
										style={{ display: "flex", alignItems: "center" }}
									>
										<div style={{ maxWidth: 120 }}>
											<Input
												ref={register({
													required: {
														value: true,
														message: "Obrigatório",
													},
													max: {
														value: avaliation.max_grade,
														message: `Até ${avaliation.max_grade}`,
													},
													min: {
														value: 0,
														message: `A nota mínima é 0`,
													},
												})}
												name={`grade.${index}`}
												type={"number"}
												errors={errors}
												validate={errors.grade?.[index]?.message}
												// max={avaliation.max_grade}
											></Input>
										</div>
										<Title>
											<span style={{ opacity: 0.2 }}>
												/{avaliation.max_grade}
											</span>
										</Title>
									</div>
								</div>
								<InputGroup>
									<label
										style={{
											width: "100%",
											textAlign: "left",
											marginTop: 24,
										}}
									>
										<Title size={16}>Feedback da matéria</Title>
										<Textarea
											// disabled={loading}
											ref={register({ required: true })}
											name={`feedback.${index}`}
											// onChange={handleCountChar}
											errors={errors}
											rows="7"
											validate={
												errors.feedback?.[index] &&
												`Escreva um feedback para o projeto`
											}
											z
											placeholder="Escreva um feedback para o projeto"
										/>
									</label>
								</InputGroup>
							</Card>
						))}

						<Button
							onClick={() => {
								setModalAvaliationComfirmation(true)
							}}
							Tag={"span"}
							type={"green"}
						>
							Enviar avaliação
						</Button>
					</Dialog>
					{modalAvaliationComfirmation && (
						<Dialog
							title="Tem certeza que deseja enviar a Avaliação?"
							desc=" Após o envio da avalição, você não poderá editá-la."
						>
							<div
								style={{
									marginTop: 10,
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Button
									onClick={() => {
										setModalAvaliationComfirmation(false)
									}}
									Tag={"span"}
									type={"gray"}
								>
									Cancelar
								</Button>
								<Button submit Tag={"button"} type={"green"}>
									Confirmar
								</Button>
							</div>
						</Dialog>
					)}
				</form>
			)}
		</section>
	)
}

const TeamIntegrant = (props) => {
	const { data, accepted, challengeId } = props
	const dispatch = useDispatch()
	const history = useHistory()
	const [modal, setModal] = useState(false)
	const [kickIntegrant, setKickIntegrant] = useState(false)
	const [leaveIntegrant, setLeaveIntegrant] = useState(false)
	const [transferIntegrant, setTransferIntegrant] = useState(false)
	const { data: user } = useSelector((state) => state.user)
	const { data: project, loading } = useSelector((state) => state.project)
	const { data: usertype } = useSelector((state) => state.usertype)

	const handleModal = () => {
		setModal((prev) => !prev)
		setKickIntegrant(false)
		setLeaveIntegrant(false)
		setTransferIntegrant(false)
	}

	const handleTransfer = async () => {
		const fetch = dispatch(
			transfer(usertype, { team_id: props.teamId, user_id: data.id })
		)
		fetch
			.then(() => dispatch(get(usertype, { challenge_id: challengeId })))
			.then(() => {
				toast.success(`${data.name} agora é guardião`, {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
				handleModal()
			})
			.catch((error) => {
				toast.error("Algum erro ocorreu ao transferir guardião.", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const handleKick = () => {
		const fetch = dispatch(
			kick(usertype, { team_id: props.teamId, user_id: data.id })
		)
		fetch
			.then(() => dispatch(get(usertype, { challenge_id: challengeId })))
			.then((res) => {
				toast.success("Usuário expulso com sucesso", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.then(() => handleModal())
			.catch((error) => {
				toast.error("Algum erro ocorreu ao expulsar", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const handleLeave = () => {
		const fetch = dispatch(
			leave(usertype, { team_id: props.teamId, user_id: data.id })
		)
		fetch
			.then(() => dispatch(get(usertype, { challenge_id: challengeId })))
			.then((res) => {
				toast.success("Saiu da equipe com sucesso", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.then(() => handleModal())
			.then(() => history.push("/dashboard"))
			.catch((error) => {
				toast.error("Algum erro ocorreu ao sair da equipe", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	const iAmKepper = project?.guardian?.id === user?.user?.id
	const isMe = data.id === user?.user?.id

	return (
		<>
			<Card
				border
				noShadow
				className={styles.integrant}
				style={{ opacity: !props.keeper && !accepted && 0.4 }}
			>
				<div className={styles.integrant__content}>
					<div className={styles.integrant__image}>
						<img
							className={styles.integrant__image__profile}
							src={
								data?.file !== null
									? BASEURL + data?.file
									: profileDefault
							}
							alt={"Integrante do time"}
						/>
						{props.keeper && (
							<img
								className={styles.integrant__image__keeper}
								src={guardia}
								alt={"Integrante do time"}
							/>
						)}
					</div>
					<div>
						<Title size={16}>
							{data?.name} {!!data?.last_name && data?.last_name}
						</Title>
						<Text size={14}>
							{data?.skills?.map(
								(item, index) => `${!!index ? " •" : ""} ${item.title}`
							)}
						</Text>
					</div>
				</div>
				{(props.keeper || !!accepted) && (
					<Button
						onClick={() => handleModal()}
						Tag={"button"}
						style={{ background: "transparent" }}
						type={"transparent"}
					>
						Ver mais
					</Button>
				)}
			</Card>
			{modal && (
				<Dialog header={"Informações do integrante"} handleClose={handleModal}>
					{!kickIntegrant && !leaveIntegrant && !transferIntegrant && (
						<>
							<div style={{ overflow: "initial", marginTop: 60 }}>
								<ProfileCard
									keeper={props.keeper}
									data={data}
									border={false}
								/>
							</div>
							{isMe && !props.keeper && (
								<div className={styles.integrant__buttons}>
									<span
										onClick={() => setLeaveIntegrant(data)}
										className={styles.integrant__button}
										style={{ fontSize: 12, color: colors.ERROR }}
									>
										Sair da equipe
									</span>
								</div>
							)}
							{isMe && props.keeper && (
								<>
									<Text size={14}>
										Você precisa escolher outro integrante para ser
										guardião antes de sair da equipe.
									</Text>
									<div className={styles.integrant__buttons}>
										<span
											className={styles.integrant__button}
											style={{
												fontSize: 12,
												color: colors.ERROR,
												opacity: 0.4,
												cursor: "default",
											}}
										>
											Sair da equipe
										</span>
									</div>
								</>
							)}
						</>
					)}
					{kickIntegrant && (
						<>
							<Title>Confirmação</Title>
							<Text style={{ margin: "12px 0" }}>
								Tem certeza que deseja expulsar {data?.name} da equipe?
							</Text>
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
								}}
							>
								<Button
									style={{ minWidth: 100 }}
									type={"secondary"}
									Tag={"span"}
									onClick={() => handleModal()}
								>
									Cancelar
								</Button>
								<Button
									style={{ minWidth: 100 }}
									type={"green"}
									Tag={"span"}
									onClick={() => handleKick(data)}
								>
									Expulsar
								</Button>
							</div>
						</>
					)}
					{leaveIntegrant && (
						<>
							<Title>Confirmação</Title>
							<Text style={{ margin: "12px 0" }}>
								Tem certeza que sair da equipe?
							</Text>
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
								}}
							>
								<Button
									style={{ minWidth: 100 }}
									type={"secondary"}
									Tag={"span"}
									onClick={() => handleModal()}
								>
									Cancelar
								</Button>
								<Button
									style={{ minWidth: 100 }}
									type={"green"}
									Tag={"span"}
									onClick={() => handleLeave(data)}
								>
									Sair
								</Button>
							</div>
						</>
					)}
					{transferIntegrant && (
						<>
							<Title>Confirmação</Title>
							<Text style={{ margin: "12px 0" }}>
								Tem certeza que deseja transferir o guardião para{" "}
								{data?.name}?
							</Text>
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
								}}
							>
								<Button
									style={{ minWidth: 100 }}
									type={"secondary"}
									Tag={"span"}
									onClick={() => handleModal()}
								>
									Cancelar
								</Button>
								<Button
									style={{ minWidth: 100 }}
									type={"green"}
									Tag={"span"}
									onClick={() => handleTransfer(data)}
								>
									Transferir
								</Button>
							</div>
						</>
					)}
					{!kickIntegrant &&
						!leaveIntegrant &&
						!transferIntegrant &&
						!isMe &&
						iAmKepper && (
							<div className={styles.integrant__buttons}>
								<span
									className={styles.integrant__button}
									style={{ fontSize: 12, color: colors.LIGHT_BLACK }}
									onClick={() => setTransferIntegrant((prev) => !prev)}
								>
									Tornar Guardião
								</span>
								<span
									onClick={() => {
										setKickIntegrant((prev) => !prev)
									}}
									className={styles.integrant__button}
									style={{ fontSize: 12, color: colors.ERROR }}
								>
									Excluir participante
								</span>
							</div>
						)}
				</Dialog>
			)}
		</>
	)
}
export { Carousel }
