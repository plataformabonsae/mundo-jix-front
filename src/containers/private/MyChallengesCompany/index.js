import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { Title } from "components/Text"
import { SubHeader } from "components/Header"
import { TabFlat } from "components/Tabs"
import { ChallengeCard } from "components/ChallengeCard"
import { Loading } from "components/Loading"
import { Banner } from "components/Banner"

import styles from "./styles.module.sass"
import { my } from "services/challenges"

const MyChallengesCompany = (props) => {
	const dispatch = useDispatch()
	// const location = useLocation();
	const { type } = useParams()
	const { data, loading } = useSelector((state) => state.myChallenges)
	const { data: usertype } = useSelector((state) => state.usertype)

	useEffect(() => {
		dispatch(my(usertype))
	}, [dispatch, usertype])

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Mundo Jix - Meus desafios</title>
				{/* <link rel="canonical" href="http://mysite.com/example" /> */}
			</Helmet>
			<SubHeader>
				<TabFlat to={`/meus-desafios/in_company`} color={"white"}>
					In company
				</TabFlat>
				<TabFlat to={`/meus-desafios/ultradesafio`} color={"white"}>
					Ultradesafio
				</TabFlat>
			</SubHeader>
			<section className={styles.container}>
				<Title className={styles.title}>Meus Desafios</Title>
				<Banner
					full
					title={"Encontre os melhores talentos para o seu negócio agora mesmo"}
					button={"Cadastrar desafio"}
					to={"/novo-desafio"}
				/>
				<section className={styles.content}>
					{loading && !data && <Loading />}

					{type === "in_company" &&
						!!data?.in_company?.data.length &&
						data?.in_company?.data?.map((item, index) => (
							<ChallengeCard
								// canSubscribe
								// noButton
								company
								status={item.payed_for}
								item={item}
								key={item.id}
								to={`/meus-desafios/${item.challenge_type}/${item.id}`}
							/>
						))}
					{type === "in_company" &&
						!data?.in_company?.data.length &&
						!loading && <>Sem desafios In Company cadastrados</>}

					{type === "ultradesafio" &&
						!!data?.ultradesafio?.data.length &&
						data?.ultradesafio?.data?.map((item, index) => (
							<ChallengeCard
								// canSubscribe
								// noButton
								company
								status={item.payed_for}
								item={item}
								key={item.id}
								to={`/meus-desafios/${item.challenge_type}/${item.id}`}
							/>
						))}
					{type === "ultradesafio" &&
						!data?.ultradesafio?.data.length &&
						!loading && <>Sem Ultradesafios cadastrados</>}
				</section>
			</section>
		</>
	)
}

export { MyChallengesCompany }
