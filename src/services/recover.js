import { Creators as RecoverActions } from "store/ducks/Recover"
import { TALENT, COMPANY } from "utils/api"
// import { loginFetch } from "services/login";
// import { tokenFetch } from "services/token";
import axios from "axios"

export const request =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.AUTH.reset : TALENT.AUTH.reset
	) =>
	async (dispatch) => {
		// dispatch(UserActions.userUpdate());
		const res = axios({
			url,
			method: "post",
			data: body,
			// headers: {
			//   Authorization: `Bearer ${token}`,
			//   Accept: "application/json",
			// },
		})
		await dispatch(RecoverActions.recoverRequest())
		await res
			.then(function (response) {
				dispatch(RecoverActions.recoverSuccess(response))
			})
			.catch((error) => dispatch(RecoverActions.recoverFailure(error)))
		return res
	}

export const change =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.AUTH.change : TALENT.AUTH.change
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
		const res = axios({
			url,
			method: "post",
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data",
				// "Content-Type": "application/json",
				// Authorization: `Bearer ${token}`,
			},
		})
		await dispatch(RecoverActions.recoverRequest())
		await res
			.then(function (response) {
				dispatch(RecoverActions.recoverSuccess(response))
			})
			.catch((error) => dispatch(RecoverActions.recoverFailure(error)))
		return res
	}

// export const login = (type, user) => async (dispatch) => {
//   const { token } = await dispatch(tokenFetch(type, user));
//   if (token && type) {
//     window.localStorage.setItem("token", token);
//     window.localStorage.setItem("usertype", type);
//     await dispatch(loginFetch(type, token));
//   }
// };

// export const newuser =
//   (
//     type,
//     body,
//     url = type === `talento` ? TALENT.AUTH.register : COMPANY.AUTH.register
//   ) =>
//   async (dispatch) => {
//     return dispatch(tokenFetch(type, body, url)).then((res) =>
//       dispatch(loginFetch(type, res.data.data.token))
//     );
//   };

// export const edit =
//   (
//     type,
//     body,
//     url = type === "empresa" ? COMPANY.AUTH.update : TALENT.AUTH.update
//   ) =>
//   async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     await dispatch(editFetch(type, body, url, token));
//   };

// export const editFetch =
//   (
//     type = `talento`,
//     body,
//     url = (type = `empresa` ? COMPANY.AUTH.update : TALENT.AUTH.update),
//     token
//   ) =>
//   async (dispatch) => {
//     const formData = new FormData();
//     for (var key in body) {
//       if (typeof key === "object") {
//         formData.append(key, JSON.stringify(body[key]));
//       } else {
//         formData.append(key, body[key]);
//       }
//     }
//     const res = axios({
//       url,
//       method: "post",
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     await res.then(function (response) {
//       dispatch(get(type, token));
//     });
//     return res;
//   };
