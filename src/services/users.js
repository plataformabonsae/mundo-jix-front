import { TALENT, COMPANY } from "utils/api"
import { Creators as UsersActions } from "store/ducks/Users"
import axios from "axios"

export const get =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.CHALLENGES.users : TALENT.CHALLENGES.users
	) =>
	async (dispatch) => {
		dispatch(UsersActions.usersRequest())
		const res = axios({
			url: url(body.challenge_id),
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		await res
			.then((response) => {
				dispatch(UsersActions.usersSuccess(response?.data?.data))
			})
			.catch((error) => {
				dispatch(UsersActions.usersFailure(error))
				console.log(error)
			})
		return res
	}
