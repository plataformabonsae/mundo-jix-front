import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Project } from "containers/private/Project"
import { Projects } from "containers/private/Projects"
import { Trilha } from "containers/private/Trilha"
import { Forum } from "containers/private/Forum"
import { Users } from "containers/private/Users"

import { MainImage } from "components/MainImage"
import { ModalPage } from "components/ModalPage"
import { Dialog } from "components/Dialog"
import Button from "components/Button"
import { ProfileCard } from "components/ProfileCard"
import { Loading } from "components/Loading"
import { Title, Text } from "components/Text"
import { TabFlat } from "components/Tabs"
import { SubHeader } from "components/Header"
import { Payment } from "components/Payment"

import { Presentation } from "./components/Presentation"
import { Downloads } from "./components/Downloads"
import { Infos } from "./components/Infos"
import { Counters } from "./components/Counters"
import { ChallengeEdit } from "./components/ChallengeEdit"
import { Job } from "./components/Job"

import { all, get } from "services/challenges"
import { get as getProject } from "services/project"
import { project as getProjectAsMentor } from "services/projects"

import styles from "./styles.module.sass"

const Challenge = (props) => {
	const [currentChallenge, setCurrentChallenge] = useState()
	const [buttonContent, setButtonContent] = useState()
	const [showModalCompany, setShowModalCompany] = useState(false)
	const [owned, setOwned] = useState(false)
	const [notGuardianModal, setNotGuardianModal] = useState(false)
	const [paymentModal, setPaymentModal] = useState(false)
	const [jobModal, setJobModal] = useState(false)
	const [editChallengeModal, setEditChallengeModal] = useState(false)
	const dispatch = useDispatch()
	const { data: usertype } = useSelector((state) => state.usertype)
	const { data: user } = useSelector((state) => state.user)
	const { data: project, loadingProject } = useSelector((state) => state.project)
	const { data, loading } = useSelector((state) => state.challenge)
	const challenges = useSelector((state) => state.challenges)

	const { type, id, page, trail_type } = useParams()

	// Fetch all
	useEffect(() => {
		dispatch(all(usertype))
	}, [dispatch, usertype])

	useEffect(() => {
		const data = challenges?.data
		if (data)
			Array.isArray(data) &&
				setCurrentChallenge(
					[...data].filter((item) => item.id === parseInt(id))[0]
				)
	}, [challenges.data, id])

	useEffect(() => {
		data?.team?.id && window.localStorage.setItem("current_team", data.team.id)
	}, [data?.team?.id])

	useEffect(() => {
		dispatch(get(usertype, { challenge_id: id }))
			.then((res) => {
				setOwned(true)
			})
			.catch((err) => {
				setOwned(false)
				console.log(err)
			})
	}, [dispatch, usertype, id])

	// Mentor, jurado
	useEffect(() => {
		if (!!user?.user?.is_mentor || !!user?.user?.is_judge)
			dispatch(
				getProjectAsMentor(usertype, {
					challenge_id: id,
					project_id: trail_type,
				})
			)
				.then((res) => {})
				.catch((err) => {
					console.log(err)
				})
	}, [dispatch, usertype, id, trail_type, user])

	useEffect(() => {
		if (!user?.user?.is_mentor && !user?.user?.is_judge)
			dispatch(getProject(usertype, { challenge_id: id }))
				.then((res) => {})
				.catch((err) => {
					console.log(err)
				})
	}, [dispatch, usertype, id, trail_type, user])

	useEffect(() => {
		const companyPayed = !!data?.challenge?.payed_for
		if (data && usertype === "empresa") setShowModalCompany(!companyPayed)
	}, [data, usertype])

	const handleEditChallenge = (props) => setEditChallengeModal((prev) => !prev)

	const handlePaymentModal = () => {
		setPaymentModal((prev) => !prev)
		handleCloseBackdrop()
	}

	const handleCloseModalCompany = () => setShowModalCompany(false)

	const handleClickToSubscribe = (props) => {
		if (currentChallenge.challenge_type === "autodesafio") {
			handlePaymentModal()
		} else {
			setButtonContent((prev) => !prev)
		}
	}

	const handleJobModal = () => {
		setJobModal((prev) => !prev)
	}

	const handleCloseBackdrop = (e) => {
		setButtonContent(false)
		// handleClickToSubscribe();
		// console.log("try close backdrop");
	}

	const handleNotGuardian = () => setNotGuardianModal((prev) => !prev)

	return (
		<>
			{(loading || loadingProject) && <Loading />}

			{(owned || !!user?.user?.is_mentor || !!user?.user?.is_judge) &&
				usertype !== "empresa" && (
					<>
						<SubHeader>
							<TabFlat
								to={`/meus-desafios/${type}/${id}/inicio`}
								color={"white"}
							>
								Início
							</TabFlat>
							{!!user?.user?.is_mentor || !!user?.user?.is_judge ? (
								<TabFlat
									to={`/meus-desafios/${type}/${id}/projetos`}
									color={"white"}
								>
									Projetos
								</TabFlat>
							) : project?.project ||
							  !project?.team ||
							  !!data?.team?.pivot?.is_guardian ? (
								<TabFlat
									to={`/meus-desafios/${type}/${id}/projeto`}
									color={"white"}
								>
									Projeto
								</TabFlat>
							) : (
								<TabFlat
									Tag={"span"}
									onClick={() => handleNotGuardian()}
									color={"white"}
								>
									Projeto
								</TabFlat>
							)}
							{usertype === "talento" && (
								<TabFlat
									to={`/meus-desafios/${type}/${id}/trilha/normal`}
									color={"white"}
								>
									Trilha
								</TabFlat>
							)}
							<TabFlat
								to={`/meus-desafios/${type}/${id}/forum`}
								color={"white"}
							>
								Fórum
							</TabFlat>
						</SubHeader>
						{data?.last_video &&
							usertype === "talento" &&
							(page === "inicio" || page === "trilha") && (
								<header className={styles.lastwatched}>
									<Title className={styles.lastwatched__title}>
										<p>Continue de onde parou</p>
									</Title>
									<Button
										type={"green"}
										to={`/meus-desafios/${type}/${
											data?.challenge?.id
										}/trilha/${
											data?.last_video?.premium
												? `premium`
												: `normal`
										}/${
											data?.last_video?.video_id ||
											data?.last_video?.question_id ||
											data?.last_video?.material_id
										}`}
									>
										Continuar assistindo
									</Button>
								</header>
							)}
					</>
				)}
			{usertype === "empresa" && (
				<SubHeader
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Title color="white">{data?.challenge?.name}</Title>
					<div>
						<Button
							to={`/editar-trilha/trilha-livre/${data?.challenge?.id}`}
							type={"gray"}
							style={{ marginRight: 12 }}
						>
							Editar trilha
						</Button>
						<Button
							Tag={"span"}
							onClick={() => handleEditChallenge()}
							type={"secondary"}
							disabled={loading}
						>
							Editar desafio
						</Button>
					</div>
				</SubHeader>
			)}
			{notGuardianModal && (
				<Dialog handleClose={handleNotGuardian} style={{ textAlign: "center" }}>
					<Title>Sem projeto cadastrado</Title>
					<Text style={{ margin: "12px 0" }}>
						Aguarde o guardião publicar o projeto para poder editar
					</Text>
					<Button
						Tag={"span"}
						type={"green"}
						onClick={() => handleNotGuardian()}
					>
						Fechar
					</Button>
				</Dialog>
			)}
			{editChallengeModal && (
				<ModalPage
					title={"Editar desafio"}
					data={data?.challenge || data}
					handleClose={handleEditChallenge}
				>
					<ChallengeEdit
						data={data?.challenge}
						handleClose={handleEditChallenge}
						edit
					/>
				</ModalPage>
			)}
			{jobModal && (
				<ModalPage
					title={"Sobre a vaga"}
					data={data?.challenge || data}
					handleClose={handleJobModal}
				>
					<Job data={data?.challenge} handleClose={handleJobModal} />
				</ModalPage>
			)}
			{owned && !!data?.challenge && (page === "inicio" || !page) && (
				<>
					<section className={`${styles.challenge}`}>
						<MainImage data={data.challenge} />
						{usertype === "empresa" && <Counters data={data.challenge} />}
						{/* {!!user?.user?.is_subscribed && ( */}
						<>
							<Presentation
								handleClickToSubscribe={handleClickToSubscribe}
								data={data.challenge}
								buttonContent={false}
								isModal={props.isModal}
							/>
							{data.challenge.challenge_type === "in_company" && (
								<div style={{ margin: "0 32px" }}>
									<Button
										Tag="span"
										type="secondary"
										onClick={() => handleJobModal()}
									>
										Sobre a vaga
									</Button>
								</div>
							)}
						</>
						{/* )} */}
						{!!data.challenge.materials.length && (
							<Downloads
								data={data.challenge.materials || ""}
								isModal={props.isModal}
							/>
						)}
						{/* {!props.isModal && ( */}
						<Infos data={data.challenge} />
						{/* )} */}
						{!props.isModal && !!(data?.team?.users?.length > 0) && (
							<div className={styles.section}>
								<Title size={24}>Equipe</Title>
								<div className={styles.container}>
									{console.log("time", data?.team?.users)}
									{data?.team?.users.map((item) => (
										<ProfileCard
											border
											key={item.id}
											data={item}
											keeper={item?.pivot?.is_guardian}
										></ProfileCard>
									))}
								</div>
							</div>
						)}
						{!props.isModal && !data?.team && usertype === "talento" && (
							<div className={styles.section}>
								<Title size={24}>Individual</Title>
								<div className={styles.container}>
									<ProfileCard border data={data?.user}></ProfileCard>
								</div>
							</div>
						)}
						{data?.mentors && !!(data.mentors.length > 0) && (
							<div
								className={
									props.isModal
										? styles.section
										: styles.section__border
								}
								style={{ textAlign: props.isModal ? "left" : "auto" }}
							>
								<Title size={24}>Mentores</Title>
								<div className={styles.container}>
									{data?.mentors?.map((item, index) => (
										<ProfileCard
											border
											data={item}
											key={item.id}
											small
										/>
									))}
								</div>
							</div>
						)}
						{data?.judges && !!(data.judges.length > 0) && (
							<div
								className={
									props.isModal
										? styles.section
										: styles.section__border
								}
								style={{ textAlign: props.isModal ? "left" : "auto" }}
							>
								<Title size={24}>Jurados</Title>
								<div className={styles.container}>
									{data?.judges?.map((item, index) => (
										<ProfileCard
											border
											data={item}
											key={item.id}
											small
										/>
									))}
								</div>
							</div>
						)}
					</section>
					{showModalCompany && (
						<Payment
							price={
								data?.challenge?.challenge_type === "ultradesafio"
									? "7.000,00"
									: "2.997,00"
							}
							title={"Efetue o pagamento para liberar o desafio"}
							desc={
								data?.challenge?.challenge_type === "ultradesafio"
									? "Os Ultradesafios permitem com que você avalie o máximo de Talentos possíveis, sejam em projetos individuais ou em grupo. Use esta oportunidade para melhor aprender sobre eles."
									: "Os desafios In Company são a melhor forma de você aprender sobre um Talento. Utilize-os para identificar as pessoas que melhor atendem suas expectativas. "
							}
							// typeOfPayment={"por desafio"}
							handleClose={handleCloseModalCompany}
							id={data?.challenge?.id}
							type={data?.challenge?.challenge_type}
							isOpen={data?.challenge?.payed_for}
							currentChallenge={data?.challenge}
						/>
					)}
				</>
			)}
			{!owned && currentChallenge && (
				<section className={`${styles.challenge}`}>
					<MainImage data={currentChallenge} />
					<Presentation
						handleClickToSubscribe={handleClickToSubscribe}
						data={currentChallenge}
						buttonContent={buttonContent}
						isModal={props.isModal}
					/>
					<Infos data={currentChallenge} />
					{currentChallenge?.materials?.length > 0 && (
						<Downloads
							data={currentChallenge?.materials}
							// isModal={props.isModal}
						/>
					)}
					{currentChallenge?.mentors &&
						!!(currentChallenge.mentors.length > 0) && (
							<div
								className={
									props.isModal
										? styles.section
										: styles.section__border
								}
								style={{ textAlign: props.isModal ? "left" : "auto" }}
							>
								<Title size={24}>Mentores</Title>
								<div className={styles.container}>
									{currentChallenge?.mentors?.map((item, index) => (
										<ProfileCard
											border
											data={item}
											key={item.id}
											small
										/>
									))}
								</div>
							</div>
						)}
					{currentChallenge?.judges && !!(currentChallenge.judges.length > 0) && (
						<div
							className={
								props.isModal ? styles.section : styles.section__border
							}
							style={{ textAlign: props.isModal ? "left" : "auto" }}
						>
							<Title size={24}>Jurados</Title>
							<div className={styles.container}>
								{currentChallenge?.judges?.map((item, index) => (
									<ProfileCard border data={item} key={item.id} small />
								))}
							</div>
						</div>
					)}
					{buttonContent && (
						<div
							onClick={() => handleCloseBackdrop()}
							className={styles.hasbackdrop}
						></div>
					)}
				</section>
			)}

			{paymentModal && !!currentChallenge.id && (
				<Payment
					subscription
					title={"Assine para poder participar de todos os Autodesafios"}
					desc={
						"Melhores suas habilidades e seja um talento imprescindível para contratantes em qualquer lugar do mundo. Assinando aos Autodesafios Jix, você tem acesso pleno aos mais diversos treinamentos em vendas, liderança, espiritualidade, inteligência emocional e muito mais. "
					}
					typeOfPayment={"por mês"}
					handleClose={handlePaymentModal}
					isOpen={paymentModal}
					price={"27,90"}
					currentChallenge={currentChallenge}
				/>
			)}
			{!!data && (page === "projeto" || !page) && <Project data={data} />}
			{!!data && (page === "projetos" || !page) && <Projects data={data} />}
			{!!data && (page === "trilha" || !page) && <Trilha />}
			{!!data && (page === "forum" || !page) && <Forum />}
			{!!data && usertype === "empresa" && (page === "participantes" || !page) && (
				<Users />
			)}
		</>
	)
}

export { Challenge }
