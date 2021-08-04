import { Creators as AssessmentActions } from "store/ducks/Assessment"
import { Creators as JudgeAssessmentActions } from "store/ducks/JudgeAssessment"

import { TALENT, COMPANY } from "utils/api"
import axios from "axios"

export const get =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.PROJECT.assessment : TALENT.PROJECT.assessment
	) =>
	async (dispatch) => {
		dispatch(AssessmentActions.assessmentRequest())
		const res = axios({
			url: url(body.project_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "Application/json",
			},
		})
		await res
			.then((response) => {
				dispatch(AssessmentActions.assessmentSuccess(response?.data?.data))
				console.log(response.message)
			})
			.catch((error) => dispatch(AssessmentActions.assessmentFailure(error)))
		return res
	}

export const getAsJudge =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa"
			? COMPANY.PROJECT.assessment
			: TALENT.PROJECT.judgeAssessment
	) =>
	async (dispatch) => {
		dispatch(AssessmentActions.assessmentRequest())
		const res = axios({
			url: url(body.challenge_id, body.project_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "Application/json",
			},
		})
		await res
			.then((response) =>
				dispatch(AssessmentActions.assessmentSuccess(response?.data?.data))
			)
			.catch((error) => dispatch(AssessmentActions.assessmentFailure(error)))
		return res
	}

export const avaliate =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.PROJECT.assessment : TALENT.PROJECT.avaliate
	) =>
	async (dispatch) => {
		const formData = new FormData()
		for (var key in body) {
			if (typeof key === "object") {
				formData.append(key, JSON.stringify(body[key]))
			} else {
				formData.append(key, body[key])
			}
		}
		dispatch(JudgeAssessmentActions.judgeAssessmentRequest())
		const res = axios({
			method: "post",
			url: url(body.challenge_id, body.project_id),
			data: body,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "Application/json",
			},
		})
		await res
			.then((response) => {
				dispatch(
					JudgeAssessmentActions.judgeAssessmentSuccess(response?.data?.data)
				)
			})
			.catch((error) =>
				dispatch(JudgeAssessmentActions.judgeAssessmentFailure(error))
			)
		return res
	}
