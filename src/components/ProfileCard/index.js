import React from "react"

import { Card } from "components/Card"
import { Title, Text } from "components/Text"

import styles from "./styles.module.sass"

import profile from "assets/logo/JixProfile.png"

import { BASEURL } from "utils/api"

// import profileDefault from "assets/components/ProfileCard/default.png";
import guardia from "assets/components/ProfileCard/guardia.svg"
import parse from "html-react-parser"

const ProfileCard = (props) => {
	const { data } = props
	return (
		<Card
			border={props.border}
			noShadow={!props.small && true}
			className={styles.card}
			style={!props.small && { paddingTop: 42, marginTop: 30 }}
		>
			{!props.small ? (
				<>
					<div className={styles.image}>
						<img
							src={data?.file ? BASEURL + data.file : profile}
							alt={data?.name}
						/>
						{!!props.keeper && (
							<img
								className={styles.keeper}
								src={guardia}
								alt="Guardiã(o)"
							/>
						)}
					</div>
					<Title size={18}>{data?.name || ""}</Title>
					{!!data?.skills?.length && (
						<div className={styles.section}>
							<Title size={12} className={styles.title}>
								Skills
							</Title>
							<Text>
								{!!data?.skills &&
									data?.skills.map(
										(item, index) =>
											`${!!index ? " •" : ""} ${item.title}`
									)}
							</Text>
						</div>
					)}
					{!!data?.description && (
						<div className={styles.section}>
							<Title size={12} className={styles.title}>
								Biografia
							</Title>
							<Text style={{ justifyContent: "center" }}>
								{!!data?.description &&
									(parse(data?.description) || data?.description)}
							</Text>
						</div>
					)}
					{props?.data?.pivot?.is_approved &&
					props?.data?.pivot?.is_accepted &&
					props?.data?.pivot?.is_effective ? (
						<div
							style={{
								marginTop: 5,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<strong style={{ marginRight: 5 }}>Convite:</strong>
							<p> Aceito</p>
						</div>
					) : null}
					{(props?.data?.pivot?.is_approved &&
						!props?.data?.pivot?.is_accepted &&
						!props?.data?.pivot?.is_effective) ||
					(props?.data?.pivot?.is_accepted &&
						!props?.data?.pivot?.is_approved &&
						!props?.data?.pivot?.is_effective) ? (
						<div
							style={{
								marginTop: 5,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<strong style={{ marginRight: 5 }}>Convite:</strong>
							<p>Pendente</p>
						</div>
					) : null}
				</>
			) : (
				<>
					<div className={styles.imagename}>
						<img
							src={data?.file ? BASEURL + data.file : profile}
							alt={data?.name}
						/>
						<Title size={16}>{data?.name || ""}</Title>
					</div>
					<Text style={{ textAlign: "justify" }}>
						{data?.description || ""}
					</Text>
				</>
			)}
		</Card>
	)
}

export { ProfileCard }
