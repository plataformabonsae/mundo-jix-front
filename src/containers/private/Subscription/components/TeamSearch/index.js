import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "react-toastify"

import { TeamCard } from "components/TeamCard"
import { Dialog } from "components/Dialog"
// import { Dialog } from "components/Dialog";
import { Title, Text } from "components/Text"
import Button from "components/Button"
import { Input } from "components/Inputs"

import { subscribe } from "services/challenges"

import { searchTeam } from "services/team"

import styles from "./styles.module.sass"

const TeamSearch = (props) => {
	const dispatch = useDispatch()
	const [teams, setTeams] = useState()
	const [teamId, setTeamId] = useState()
	const { data, loading } = useSelector((state) => state.team)
	const [dialog, setDialog] = useState(false)
	// const { control, register, errors, handleSubmit } = useForm();
	const { data: usertype } = useSelector((state) => state.usertype)
	const { id } = useParams()

	useEffect(() => {
		dispatch(searchTeam(usertype, { challenge_id: id }))
	}, [dispatch, usertype, id])

	useEffect(() => {
		setTeams(data?.teams)
	}, [data?.teams])

	const handleSearch = (event) => {
		setTeams((state) =>
			[...data?.teams].filter(
				(user) =>
					user.name.toLowerCase().includes(event.target.value.toLowerCase())
				// ||
				// user.description
				//   .toLowerCase()
				//   .includes(event.target.value.toLowerCase())
			)
		)
	}

	const handleDialog = (id) => {
		setDialog((prev) => !prev)
	}

	const handleSolicitate = (data) => {
		setTeamId(data)
		handleDialog()
	}

	const onSubmit = async (data) => {
		const req = dispatch(subscribe(usertype, { team_id: teamId.id }))
		await req
			.then((res) => console.log(res))
			.then((res) => {
				toast.success("Solicitação enviada com sucesso", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
				console.log(res)
			})
			.catch((error) => {
				toast.error("Algum erro ocorreu ao enviar solicitação", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
				console.log(error)
			})
	}

	return (
		<>
			<section className={styles.search}>
				<Input
					// fontSize={20}
					style={{ fontSize: 20 }}
					disabled={loading}
					onChange={handleSearch}
					placeholder={"Digite nome do time ou guardião para procurar times"}
				>
					Pesquisar
				</Input>
			</section>
			<section className={styles.teams}>
				{teams?.map((item, index) => (
					<TeamCard data={item} handleClick={handleSolicitate} />
				))}
				{teams?.length === 0 && <>Não encontramos este time</>}
			</section>
			{dialog && (
				<Dialog header={"Solicitar entrada"} handleClose={handleDialog}>
					{/* <form noValidate onSubmit={handleSubmit(onSubmit)}> */}
					{/* <input
              type={"hidden"}
              ref={register()}
              name={"team_id"}
              value={teamId.id} */}
					{/* /> */}
					{console.log(teamId.id)}
					<Title>Deseja solicitar entrada no time {teamId.name}?</Title>
					<Text style={{ margin: "12px 0" }}>
						O guardião precisará aceitar sua solicitação.
					</Text>
					<div style={{ display: "flex", justifyContent: "space-around" }}>
						<Button
							style={{ marginRight: 12, minWidth: 100 }}
							type={"primary"}
							Tag={"span"}
							onClick={handleDialog}
						>
							Cancelar
						</Button>
						<Button
							submit
							style={{ marginLeft: 12, minWidth: 100 }}
							Tag={"button"}
							type={"green"}
							onClick={() => onSubmit()}
						>
							Enviar
						</Button>
					</div>
					{/* </form> */}
				</Dialog>
			)}
		</>
	)
}

export { TeamSearch }
