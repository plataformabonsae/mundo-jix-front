import { Creators as ProjectsActions } from "store/ducks/Projects"

import { TALENT, COMPANY } from "utils/api"
import axios from "axios"

export const projects =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.PROJECTS.projects : TALENT.PROJECTS.projects
	) =>
	async (dispatch) => {
		dispatch(ProjectsActions.projectsRequest())
		const res = axios({
			url: url(body.challenge_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) =>
				dispatch(ProjectsActions.projectsSuccess(response?.data?.data))
			)
			.catch((error) => dispatch(ProjectsActions.projectsFailure(error)))
		return res
	}

export const project =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.PROJECTS.project : TALENT.PROJECTS.project
	) =>
	async (dispatch) => {
		dispatch(ProjectsActions.projectsCurrentRequest())
		const res = axios({
			url: url(body.challenge_id, body.project_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) => {
				dispatch(ProjectsActions.projectsCurrentSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(ProjectsActions.projectsCurrentFailure(error)))
		return res
	}
