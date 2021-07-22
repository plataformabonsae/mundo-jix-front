import { Creators as CepActions } from "store/ducks/Cep"
const { default: axios } = require("axios")

export const cep = (cep) => async (dispatch) => {
	dispatch(CepActions.cepRequest())
	axios({
		url: `https://viacep.com.br/ws/${cep}/json/`,
		method: "get",
	})
		.then(function (response) {
			dispatch(CepActions.cepSuccess(response.data))
		})
		.catch(function (response) {
			//handle error
			dispatch(CepActions.cepFailure(response.data))
		})
}
export const cepReset = (cep) => async (dispatch) => {
	dispatch(CepActions.cepFailure({}))
}
