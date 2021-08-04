import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

// import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs"
import { Banner } from "components/Banner"
import { Title, Text } from "components/Text"
import Button from "components/Button"
import { Loading } from "components/Loading"
import { Dialog } from "components/Dialog"
import { Payment } from "components/Payment"

import { Header } from "./components/Header"
import { TrilhaItem } from "components/TrilhaItem"

import styles from "./styles.module.sass"

import { normal, premium } from "services/trail"

const Trilha = (props) => {
	const dispatch = useDispatch()
	const { data: trail, loading } = useSelector((state) => state.trail)
	const { data: usertype } = useSelector((state) => state.usertype)
	const { data } = useSelector((state) => state.challenge)
	const { type, id, trail_type } = useParams()
	const [controlledTrail, setControlledTrail] = useState([])
	const [premiumDialog, setPremiumDialog] = useState(false)
	// const { type, id, trail_type, trail_id } = useParams();
	// const [activeTab, setActiveTab] = useState("normal");

	useEffect(() => {
		trail_type === "normal" && dispatch(normal(usertype, { challenge_id: id }))
		trail_type === "premium" && data?.user?.pivot?.is_payed
			? dispatch(premium(usertype, { challenge_id: id }))
			: setControlledTrail([])
	}, [dispatch, usertype, id, trail_type, data.user?.pivot?.is_payed])

	useEffect(() => {
		setControlledTrail(trail)
	}, [trail])

	const handlePremumDialog = () => setPremiumDialog((prev) => !prev)

	return (
		<section className={styles.trilha}>
			<Header data={data.challenge} />
			<header className={styles.header}>
				<div className={styles.header__links}>
					<TabFlat to={`/meus-desafios/${type}/${id}/trilha/normal`}>
						Normal
					</TabFlat>
					<TabFlat to={`/meus-desafios/${type}/${id}/trilha/premium`}>
						Premium
					</TabFlat>
				</div>
				<section className={styles.trilha__list}>
					{loading ? (
						<Loading />
					) : (
						<>
							{trail_type === "premium" && !controlledTrail?.length && (
								<div style={{ marginTop: 20, marginLeft: 20 }}>
									<p>Este desafio não possui trilha premium</p>
								</div>
							)}
							{(trail_type === "premium" && !data?.user?.pivot?.is_payed) ||
								(trail_type === "premium" && controlledTrail?.length && (
									<Banner
										full
										Tag={"span"}
										title={
											"Adquira agora mesmo uma trilha especial com um aprofundamento mais rico deste desafio."
										}
										button={"Comprar"}
										onClick={handlePremumDialog}
									/>
								))}
							{controlledTrail?.map((item, index) => (
								<TrilhaItem
									to={`/meus-desafios/${type}/${id}/trilha/${trail_type}/${
										item.video_id ||
										item.question_id ||
										item.material_id
									}`}
									// locked={data.?user}
									item={item}
									trailType={item.type}
									key={
										item.video_id ||
										item.question_id ||
										item.material_id
									}
									index={index + 1}
									video={item.video}
									file={item.material}
									question={item.question}
								/>
							))}
						</>
					)}
				</section>
				{premiumDialog && (
					<Payment
						handleClose={handlePremumDialog}
						price={"187,00"}
						typeOfPayment={"pagamento único"}
						title={
							"Adquira agora mesmo uma trilha especial com um aprofundamento mais rico deste desafio. "
						}
						type={"trail"}
						id={data.challenge.id}
					/>
				)}
			</header>
		</section>
	)
}

export { Trilha }
