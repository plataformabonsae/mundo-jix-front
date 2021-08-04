import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Title, Text } from "components/Text"
import { Card } from "components/Card"
import { Loading } from "components/Loading"
import Button from "components/Button"
import { useHistory } from "react-router-dom"

import { invites, accept, refuse } from "services/invites"

import styles from "./styles.module.sass"

import person from "assets/components/Invites/person.svg"
import arrow from "assets/components/Notification/arrow.svg"

const Invites = ({ open, isOpen }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { data, loading } = useSelector((state) => state.invites)
	const { data: usertype } = useSelector((state) => state.usertype)

	useEffect(() => {
		dispatch(invites(usertype))
		let timer = setInterval(() => dispatch(invites(usertype)), 15 * 1000)
		return () => {
			clearInterval(timer)
		}
	}, [dispatch, usertype])

	const handleRefuse = (team_id) => {
		dispatch(refuse(usertype, { team_id })).then(() => dispatch(invites(usertype)))
	}

	const handleAccept = (team_id, challenge_id) => {
		dispatch(accept(usertype, { team_id })).then(() => dispatch(invites(usertype)))
		history.push(`/meus-desafios/`)
	}

	return (
		<span className={styles.wrapper}>
			<button
				onClick={() => (isOpen === "invites" ? open("") : open("invites"))}
				className={styles.invites}
			>
				<img src={person} alt="Notificações" />
				{data?.invites?.length > 0 && (
					<span className={styles.invites__count}>{data?.invites.length}</span>
				)}
				{isOpen === "invites" && (
					<img className={styles.card__arrow} src={arrow} alt="Arrow" />
				)}
			</button>
			{isOpen === "invites" && (
				<Card className={styles.card}>
					<header className={styles.card__header}>
						<Title size={18}>Convites</Title>
					</header>
					<div className={styles.card__wrapper}>
						{data?.invites?.length > 0 &&
							!loading &&
							data.invites.map((item) => (
								<div className={styles.invites__card}>
									{/* <img className={styles.invites__card__image} src="" alt="" /> */}
									<div className={styles.invites__content}>
										<Title style={{ lineHeigth: 1.5 }} size={14}>
											Convite para equipe <br /> {item.name} desafio
											<br />
											<strong>{item.challenge.name}</strong>
										</Title>
										{/* <Text size={12}>Desafio X na equipe Y</Text> */}
									</div>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											marginRight: 8,
										}}
									>
										<Button
											Tag={"span"}
											onClick={() =>
												handleRefuse(item.pivot.team_id)
											}
											style={{
												minWidth: "inherit",
												padding: 6,
												fontSize: 10,
												margin: 4,
											}}
											type="outlineGray"
										>
											Recusar
										</Button>
										<Button
											Tag={"span"}
											onClick={() =>
												handleAccept(
													item.pivot.team_id,
													item.challenge_id
												)
											}
											style={{
												margin: 4,
												minWidth: "inherit",
												padding: 6,
												fontSize: 10,
											}}
											type="outlineBlue"
										>
											Aceitar
										</Button>
									</div>
								</div>
							))}
					</div>
					{data?.invites?.length === 0 && !loading && (
						<div className={styles.card__empty}>
							<Text size={14}>Não há novos convites</Text>
						</div>
					)}
					{loading && (
						<div className={styles.card__empty}>
							<Loading />
						</div>
					)}
				</Card>
			)}
		</span>
	)
}

export { Invites }
