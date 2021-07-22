import React from "react"

import { Card } from "components/Card"
import { Title, Text } from "components/Text"
// import { ProfileCard } from "components/ProfileCard";
import parse from "html-react-parser"

import profile from "assets/logo/JixProfile.png"

import { BASEURL } from "utils/api"

import styles from "./styles.module.sass"

const InviteCard = (props) => {
	const { data } = props
	return (
		<Card noShadow className={styles.invitecard}>
			<header className={styles.header}>
				<img src={data.file ? BASEURL + data.file : profile} alt={data.name} />
				<Title size={24}>{data.name || "..."}</Title>
			</header>
			<div className={styles.section}>
				{!!data.skills.length && (
					<>
						<Text size={12} className={styles.title}>
							Skills
						</Text>
						<Text>{data.skills.map((item) => ` •  ${item.title}`)}</Text>
					</>
				)}
			</div>
			{!!data.description && (
				<div className={styles.section}>
					<Text size={12} className={styles.title}>
						Biografia
					</Text>
					<Text Tag={"span"} style={{ textAlign: "justify" }}>
						{parse(data.description)}
					</Text>
				</div>
			)}
			<div className={styles.content}>{props.children}</div>
		</Card>
	)
}

export { InviteCard }
