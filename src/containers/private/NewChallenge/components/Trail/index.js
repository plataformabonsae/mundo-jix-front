import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Button from "components/Button"
import { Text, Title } from "components/Text"

import { Material } from "./components/Material"
import { Video } from "./components/Video"
import { Question } from "./components/Question"

import styles from "./styles.module.sass"

const Trail = (props) => {
	const { handleTrails, setTrails, trails } = props

	const handleData = (index, data) => {
		const array = [...trails]
		array[index].data = data
		setTrails(array)
	}

	const handleDelete = (index) => {
		const array = [...trails]
		array.splice(index, 1)
		setTrails(array)
	}

	const handleCopy = (index) => {
		setTrails((prev) => [...prev, prev[index]])
	}

	return (
		<section className={styles.wrapper}>
			<section className={styles.trails}>
				{trails?.map((item, index) => {
					if (item.type === "material") {
						return (
							<Material
								trails={trails}
								index={index}
								handleData={handleData}
								handleCopy={handleCopy}
								handleDelete={handleDelete}
							/>
						)
					}
					if (item.type === "question")
						return (
							<Question
								trails={trails}
								index={index}
								handleData={handleData}
								handleCopy={handleCopy}
								handleDelete={handleDelete}
							/>
						)
					if (item.type === "video")
						return (
							<Video
								trails={trails}
								index={index}
								handleData={handleData}
								handleCopy={handleCopy}
								handleDelete={handleDelete}
							/>
						)
					return null
				})}
			</section>
			<div className={styles.buttons}>
				<Text>Deseja adicionar novo conteúdo para trilha?</Text>
				<div className={styles.buttons__wrapper}>
					<Button
						Tag={"span"}
						type={"primary"}
						onClick={() => handleTrails("video")}
					>
						Videoaula
					</Button>
					<Button
						Tag={"span"}
						type={"primary"}
						onClick={() => handleTrails("material")}
					>
						Material
					</Button>
					<Button
						Tag={"span"}
						type={"primary"}
						onClick={() => handleTrails("question")}
					>
						Questão
					</Button>
				</div>
			</div>
			<div className={styles.buttons}>
				<Text>Deseja adiciona a trilha?</Text>
				<div className={styles.buttons__wrapper}>
					<Button
						disabled={!trails.length}
						Tag={"span"}
						type={"green"}
						onClick={() => handleTrails("video")}
					>
						Enviar
					</Button>
				</div>
			</div>
		</section>
	)
}

export { Trail }
