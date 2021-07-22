import { Creators as TeamActions } from "store/ducks/Team"

import { TALENT, COMPANY } from "utils/api"
import axios from "axios"

export const searchPerson =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.CHALLENGES.my_challenges : TALENT.TEAM.search
	) =>
	async (dispatch) => {
		dispatch(TeamActions.teamRequest())
		const res = axios({
			url: url(body.challenge_id, body.name),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) => dispatch(TeamActions.teamSuccess(response)))
			.catch((error) => dispatch(TeamActions.teamFailure(error)))
		return res
	}

export const searchTeam =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.TEAM.teams : TALENT.TEAM.teams
	) =>
	async (dispatch) => {
		dispatch(TeamActions.teamRequest())
		const res = axios({
			url: url(body.challenge_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) => {
				dispatch(TeamActions.teamSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(TeamActions.teamFailure(error)))
		return res
	}

export const invite =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.CHALLENGES.my_challenges : TALENT.TEAM.invite
	) =>
	async (dispatch) => {
		// dispatch(TeamActions.teamRequest());
		const res = axios({
			method: "post",
			url: url(body.team_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
			data: body,
		})
		await res
		// .then((response) => dispatch(TeamActions.teamSuccess(response)))
		// .catch((error) => dispatch(TeamActions.teamFailure(error)));
		return res
	}

export const kick =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.CHALLENGES.my_challenges : TALENT.TEAM.kick
	) =>
	async (dispatch) => {
		// dispatch(TeamActions.teamRequest());
		const res = axios({
			method: "post",
			url: url(body.team_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				// "Content-Type": "multipart/form-data",
			},
			data: body,
		})
		await res
		// .then((response) => dispatch(TeamActions.teamSuccess(response)))
		// .catch((error) => dispatch(TeamActions.teamFailure(error)));
		return res
	}

export const leave =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.CHALLENGES.my_challenges : TALENT.TEAM.leave
	) =>
	async (dispatch) => {
		// dispatch(TeamActions.teamRequest());
		const res = axios({
			method: "post",
			url: url(body.team_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				// "Content-Type": "multipart/form-data",
			},
			// data: body,
		})
		await res
		// .then((response) => dispatch(TeamActions.teamSuccess(response)))
		// .catch((error) => dispatch(TeamActions.teamFailure(error)));
		return res
	}

export const transfer =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.CHALLENGES.my_challenges : TALENT.TEAM.transfer
	) =>
	async (dispatch) => {
		// dispatch(TeamActions.teamRequest());
		const res = axios({
			method: "post",
			url: url(body.team_id),
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
			data: body,
		})
		await res
		// .then((response) => dispatch(TeamActions.teamSuccess(response)))
		// .catch((error) => dispatch(TeamActions.teamFailure(error)));
		return res
	}
