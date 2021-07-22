import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import ReactQuill from "react-quill"
import parse from "html-react-parser"
import "react-quill/dist/quill.snow.css"

import { Title, Text } from "components/Text"
import {
	Input,
	Textarea,
	InputFile,
	InputGroup,
	AddGroup,
	RemoveGroup,
} from "components/Inputs"
import { Card } from "components/Card"
import { ForumCard } from "components/ForumCard"
import Button from "components/Button"
import { Dialog } from "components/Dialog"
import { Loading } from "components/Loading"

import { Header } from "./components/Header"

import styles from "./styles.module.sass"

import { BASEURL } from "utils/api"

import { forum, publication, create, comment } from "services/forum"
import { get } from "services/project"

import defaultImage from "assets/logo/JixProfile.png"

import edit from "assets/icons/edit-gray.svg"

const Forum = (props) => {
	const dispatch = useDispatch()
	const { data: forumData, loading } = useSelector((state) => state.forum)
	const { data } = useSelector((state) => state.project)
	const { data: user } = useSelector((state) => state.user)
	const [forumPosts, setForumPosts] = useState([])
	const [modal, setModal] = useState(false)
	const { data: usertype } = useSelector((state) => state.usertype)
	const { id, trail_type, type } = useParams()

	useEffect(() => {
		setForumPosts(forumData?.forums)
	}, [dispatch, forumData])

	useEffect(() => {
		dispatch(get(usertype, { challenge_id: id }))
	}, [dispatch, usertype, id])

	useEffect(() => {
		dispatch(forum(usertype, { challenge_id: id }))
	}, [dispatch, usertype, id])

	// const handleCreate = (event) => {
	//   setForumPosts((state) =>
	//     [...forumData?.forums].filter(
	//       (user) =>
	//         user.name.toLowerCase().includes(event.target.value.toLowerCase())
	//       // ||
	//       // user.description
	//       //   .toLowerCase()
	//       //   .includes(event.target.value.toLowerCase())
	//     )
	//   );
	// };

	// const handleEditorData = (data) => console.log(data);

	const handleSearch = (event) => {
		setForumPosts((state) =>
			[...forumData?.forums].filter(
				(forumPost) =>
					forumPost.name
						.toLowerCase()
						.includes(event.target.value.toLowerCase()) ||
					forumPost.description
						.toLowerCase()
						.includes(event.target.value.toLowerCase())
			)
		)
	}

	const handleModal = () => setModal((prev) => !prev)

	return (
		<>
			<Header noBack={!trail_type} data={data?.challenge} />
			<section className={styles.forum}>
				{!trail_type ? (
					<>
						<section className={styles.search}>
							<Input
								fontSize={20}
								disabled={loading}
								onChange={handleSearch}
								placeholder={"Digite para procurar publicações"}
							>
								Pesquisar
							</Input>
						</section>
						<Text className={styles.warning}>
							Este Fórum é um espaço para todos os participantes do desafio.
							Qualquer conteúdo postado aqui será compartilhado para todos
							os participantes, sejam eles de sua equipe ou não.
						</Text>
						<Card
							onClick={() => handleModal()}
							noShadow
							border
							className={styles.new}
							style={{ background: "#f9f9f9" }}
						>
							<img
								src={
									user?.user?.file
										? BASEURL + user?.user?.file
										: defaultImage
								}
								alt={user?.data?.name || user?.name}
							/>
							<Card
								noShadow
								border
								className={styles.new}
								style={{ width: "100%" }}
							>
								<img
									style={{ borderRadius: 0 }}
									src={edit}
									alt={"Editar"}
								/>
								<Text>Criar post</Text>
							</Card>
						</Card>
						<section className={styles.list}>
							{loading && <Loading />}
							{forumPosts?.map((item) => (
								<ForumCard
									item={item}
									to={`/meus-desafios/${type}/${id}/forum/${item.id}`}
								/>
							))}
						</section>
						{modal && <NewPost handleClose={handleModal} />}
					</>
				) : (
					<Comment />
				)}
			</section>
		</>
	)
}

const NewPost = (props) => {
	const { register, errors, handleSubmit } = useForm({
		reValidateMode: "onChange",
	})
	const [links, setLinks] = useState([0])
	const dispatch = useDispatch()
	const { data: usertype } = useSelector((state) => state.usertype)
	// const { data: usertype } = useSelector((state) => state.forum);
	const { id } = useParams()

	const onSubmit = async (data) => {
		const { file, links } = data
		await dispatch(
			create(usertype, {
				...data,
				links: JSON.stringify(links),
				file: file[0],
			})
		)
			.then((response) => {
				toast.success("Publicado com sucesso", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
			.then(() => props.handleClose())
			.then(() => dispatch(forum(usertype, { challenge_id: id })))
			.catch((error) => {
				console.log(error.response.data)
				toast.error("Tente novamente", {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			})
	}

	return (
		<Dialog
			style={{ width: 600 }}
			header={"Criar post"}
			handleClose={props.handleClose}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type={"hidden"}
					ref={register()}
					name={"challenge_id"}
					value={id}
				/>
				<Card>
					<Title style={{ marginBottom: 32 }}>Post</Title>
					<InputGroup>
						<Input
							defaultValue={""}
							ref={register({ required: true })}
							errors={errors}
							errorMessage="Digite o título da publicação"
							name="name"
							placeholder="Digite o título da publicação"
						>
							Título <span style={{ color: "#f84731" }}>*</span>{" "}
						</Input>
					</InputGroup>
					<InputGroup>
						<Textarea
							defaultValue={``}
							ref={register()}
							errors={errors}
							name={`description`}
							placeholder="Digite o texto"
						>
							Texto
						</Textarea>
					</InputGroup>
				</Card>
				<Card>
					<Title style={{ marginBottom: 32 }}>Links</Title>
					{links.map((field, index) => {
						return (
							<InputGroup>
								<Input
									defaultValue={field.link}
									// disabled={loading}
									ref={register()}
									type="text"
									name={`links.${index}.link`}
									errors={errors}
									errorMessage="Cole o link"
									placeholder="Cole o link"
								/>
							</InputGroup>
						)
					})}

					<InputGroup style={{ flexWrap: "nowrap", width: "100%" }}>
						<AddGroup
							onClick={() => setLinks((prev) => [...prev, prev++])}
							text="Adicionar link"
						/>
						{links?.length > 1 && (
							<RemoveGroup
								onClick={() =>
									setLinks((state) => [...state].slice(0, -1))
								}
								text="Remover link"
							/>
						)}
					</InputGroup>
				</Card>
				<Card>
					<Title size={18}>Anexo</Title>
					<InputFile
						// disabled={loading}
						ref={register()}
						// type="text"
						name="file"
						errors={errors}
						// errorMessage="Selecione uma imagem para a capa"
						// placeholder="Selecione uma imagem para a capa"
					/>
				</Card>
				<InputGroup>
					<Button
						style={{ marginTop: 16, width: "100%" }}
						type={"green"}
						submit
						Tag={"button"}
					>
						Postar
					</Button>
				</InputGroup>
			</form>
		</Dialog>
	)
}

const Comment = (props) => {
	const dispatch = useDispatch()
	const { current, loading } = useSelector((state) => state.forum)
	const { data: user } = useSelector((state) => state.user)
	const { data: usertype } = useSelector((state) => state.usertype)
	const [editorState, setEditorState] = useState("")
	const { id, trail_type } = useParams()

	useEffect(() => {
		dispatch(publication(usertype, { forum_id: trail_type }))
	}, [dispatch, usertype, trail_type])
	useEffect(() => {}, [editorState])

	const handleComment = () => {
		dispatch(
			comment(usertype, {
				challenge_id: id,
				user_id: user.user.id,
				forum_id: current.forum.id,
				description: editorState,
			})
		).then(() =>
			dispatch(publication(usertype, { forum_id: trail_type })).then(
				setEditorState("")
			)
		)
	}

	return (
		<>
			{current?.forum && (
				<ForumCard item={current}>
					{loading && <Loading />}
					<section className={styles.comments}>
						{current?.posts?.map((item) => (
							<div className={styles.comments__item}>
								<header className={styles.comments__header}>
									<img
										src={
											item?.user?.file
												? BASEURL + item?.user?.file
												: defaultImage
										}
										alt={"item?.name"}
									/>
									<span style={{ fontWeight: "bold" }}>
										{item?.user?.name || "Nome"}
									</span>
									<span className={styles.comments__date}>
										Postado {current?.forum?.created_at}
									</span>
								</header>
								<div style={{ marginLeft: 42 }}>
									{!!item.description && parse(item.description)}
								</div>
							</div>
						))}
					</section>
					<section className={styles.comment__box}>
						<ReactQuill
							className={styles.editor}
							value={editorState}
							onChange={setEditorState}
						/>
						<Button
							style={{ marginTop: 16 }}
							type={"green"}
							Tag="span"
							disabled={
								!editorState.length ||
								editorState === "<p><br></p>" ||
								loading
							}
							onClick={() => handleComment()}
						>
							Comentar
						</Button>
					</section>
				</ForumCard>
			)}
		</>
	)
}

export { Forum }
