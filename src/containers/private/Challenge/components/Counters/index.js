import React, { useState, useEffect } from "react"

import { Card } from "components/Card"
import { Title, Text } from "components/Text"
import Button from "components/Button"

import styles from "./styles.module.sass"

const Counters = (props) => {
	const [expired, setExpired] = useState(false)

	useEffect(() => {
		if (props?.deadline) {
			const array = props.item.deadline?.split("/").map((x) => +x)
			const today = new Date()
			const date = new Date(array[2], array[1] - 1, array[0])

			setExpired(date < today)
			console.log(expired)
		}
	}, [props?.deadline])

	return (
		<div className={styles.wrapper}>
			<Card style={{ textAlign: "center" }} border>
				<Title style={{ lineHeight: 1 }} size={48}>
					{props.data.users_count}
				</Title>
				<Text size={32} style={{ margin: "24px 12px" }}>
					Participantes
				</Text>
				<Button
					disabled={() => expired == true}
					to={`/meus-desafios/${props.data.challenge_type}/${props.data.id}/participantes`}
					type={"green"}
				>
					Gerar lista
				</Button>
			</Card>
			<Card style={{ textAlign: "center" }} border>
				<Title style={{ lineHeight: 1 }} size={48}>
					{props.data.projects_count}
				</Title>
				<Text size={32} style={{ margin: "24px 12px" }}>
					Projetos
				</Text>
				<Button
					to={`/meus-desafios/${props.data.challenge_type}/${props.data.id}/projetos`}
					type={"green"}
				>
					Visualizar
				</Button>
			</Card>
		</div>
	)
}

export { Counters }
