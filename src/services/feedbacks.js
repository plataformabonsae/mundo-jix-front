import { Creators as FeedbackActions } from "store/ducks/Feedbacks"

import { TALENT, COMPANY } from "utils/api"
import axios from "axios"

export const get =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FEEDBACK.get : TALENT.FEEDBACK.get
	) =>
	async (dispatch) => {
		dispatch(FeedbackActions.feedbacksRequest())
		const res = axios({
			url: url(body.challenge_id, body.project_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) => {
				console.log(response)
				dispatch(FeedbackActions.feedbacksSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(FeedbackActions.feedbacksFailure(error)))
		return res
	}

export const getTalente =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FEEDBACK.get : TALENT.FEEDBACK.getTalente
	) =>
	async (dispatch) => {
		dispatch(FeedbackActions.feedbacksRequest())
		const res = axios({
			url: url(body.challenge_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) => {
				console.log(response)
				dispatch(FeedbackActions.feedbacksSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(FeedbackActions.feedbacksFailure(error)))
		return res
	}

export const getOne =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FEEDBACK.getOne : TALENT.FEEDBACK.getOne
	) =>
	async (dispatch) => {
		dispatch(FeedbackActions.feedbacksCurrentRequest())
		const res = axios({
			url: url(body.challenge_id, body.feedback_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) => {
				console.log(response)
				dispatch(FeedbackActions.feedbacksCurrentSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(FeedbackActions.feedbacksCurrentFailure(error)))
		return res
	}

export const comment =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FEEDBACK.comment : TALENT.FEEDBACK.comment
	) =>
	async (dispatch) => {
		// dispatch(FeedbackActions.feedbacksCurrentRequest());
		const formData = new FormData()
		for (var key in body) {
			formData.append(key, body[key])
		}
		const res = axios({
			method: "post",
			url: url(body.challenge_id, body.project_id),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		})
		await res
			.then((response) => {
				console.log(response, "feedbacks current")
				// dispatch(FeedbackActions.feedbacksCurrentSuccess(response?.data?.data));
			})
			.catch(
				(error) => console.log(error)
				// dispatch(FeedbackActions.feedbacksCurrentFailure(error))
			)
		return res
	}

export const create =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.FEEDBACK.create : TALENT.FEEDBACK.create
	) =>
	async (dispatch) => {
		// dispatch(FeedbackActions.feedbacksRequest());
		const formData = new FormData()
		for (var key in body) {
			formData.append(key, body[key])
		}
		const res = axios({
			url: url(body.challenge_id, body.project_id),
			method: "post",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		})
		await res
		// .then((response) =>
		//   // dispatch(FeedbackActions.feedbacksSuccess(response?.data?.data))
		// )
		// .catch((error) => dispatch(FeedbackActions.feedbacksFailure(error)));
		return res
	}

export const reset = () => async (dispatch) => {
	dispatch(FeedbackActions.feedbacksCurrentSuccess())
}
