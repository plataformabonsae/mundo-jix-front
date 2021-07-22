import { Creators as ForumActions } from "store/ducks/Forum"

import { TALENT, COMPANY } from "utils/api"
import axios from "axios"

export const forum =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FORUM.forum : TALENT.FORUM.forum
	) =>
	async (dispatch) => {
		dispatch(ForumActions.forumRequest())
		const res = axios({
			url: url(body.challenge_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) => dispatch(ForumActions.forumSuccess(response?.data?.data)))
			.catch((error) => dispatch(ForumActions.forumFailure(error)))
		return res
	}

export const publication =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FORUM.publication : TALENT.FORUM.publication
	) =>
	async (dispatch) => {
		dispatch(ForumActions.forumCurrentRequest())
		const res = axios({
			url: url(body.forum_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) => {
				dispatch(ForumActions.forumCurrentSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(ForumActions.forumCurrentFailure(error)))
		return res
	}

export const create =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FORUM.create : TALENT.FORUM.create
	) =>
	async (dispatch) => {
		dispatch(ForumActions.forumRequest())
		const formData = new FormData()
		for (var key in body) {
			formData.append(key, body[key])
		}
		const res = axios({
			url,
			method: "post",
			data: formData,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		})
		await res
			.then((response) => dispatch(ForumActions.forumSuccess(response?.data?.data)))
			.catch((error) => dispatch(ForumActions.forumFailure(error)))
		return res
	}

export const comment =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FORUM.comment : TALENT.FORUM.comment
	) =>
	async (dispatch) => {
		// dispatch(ForumActions.forumRequest());
		const formData = new FormData()
		for (var key in body) {
			formData.append(key, body[key])
		}
		const res = axios({
			url,
			method: "post",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		})
		await res.then((response) => {
			console.log(response, "comment")
			// dispatch(ForumActions.forumSuccess(response?.data?.data));
		})
		// .catch((error) => dispatch(ForumActions.forumFailure(error)));
		return res
	}
