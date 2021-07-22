import { Creators as PaymentActions } from "store/ducks/Payment"

import { TALENT, COMPANY } from "utils/api"
import axios from "axios"

export const intent =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.PAYMENT.intent : TALENT.PAYMENT.intent
	) =>
	async (dispatch) => {
		dispatch(PaymentActions.paymentRequest())
		const res = axios({
			url,
			method: "post",
			data: body,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "Application/json",
			},
		})
		await res
			.then((response) => {
				dispatch(PaymentActions.paymentSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(PaymentActions.paymentFailure(error)))
		return res
	}

export const success =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa" ? COMPANY.PAYMENT.success : TALENT.PAYMENT.success
	) =>
	async (dispatch) => {
		dispatch(PaymentActions.paymentRequest())
		const res = axios({
			url: url,
			data: body,
			method: "post",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		})
		await res
			.then((response) =>
				dispatch(PaymentActions.paymentSuccess(response?.data?.data))
			)
			.catch((error) => dispatch(PaymentActions.paymentFailure(error)))
		return res
	}

export const subscription =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa"
			? COMPANY.PAYMENT.subscription
			: TALENT.PAYMENT.subscription
	) =>
	async (dispatch) => {
		dispatch(PaymentActions.paymentRequest())
		const res = axios({
			url,
			method: "post",
			data: body,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "Application/json",
			},
		})
		await res
			.then((response) => {
				dispatch(PaymentActions.paymentSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(PaymentActions.paymentFailure(error)))
		return res
	}

export const cancelSubscription =
	(
		type = "talento",
		body,
		token = window.localStorage.getItem("token"),
		url = type === "empresa"
			? COMPANY.PAYMENT.cancelSubscription
			: TALENT.PAYMENT.cancelSubscription
	) =>
	async (dispatch) => {
		dispatch(PaymentActions.paymentRequest())
		const res = axios({
			url,
			method: "post",
			data: body,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "Application/json",
			},
		})
		await res
			.then((response) => {
				dispatch(PaymentActions.paymentSuccess(response?.data?.data))
			})
			.catch((error) => dispatch(PaymentActions.paymentFailure(error)))
		return res
	}
