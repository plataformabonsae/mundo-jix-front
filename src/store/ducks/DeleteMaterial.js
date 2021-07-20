const Types = {
	DELETEMATERIAL_REQUEST: "deleteMaterial/REQUEST",
	DELETEMATERIAL_SUCCESS: "deleteMaterial/SUCCESS",
	DELETEMATERIAL_FAILURE: "deleteMaterial/FAILURE",
}

const INITIAL_STATE = {
	loading: false,
	data: null,
	error: null,
}

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case Types.DELETEMATERIAL_REQUEST:
			return {
				...state,
				loading: true,
			}
		case Types.DELETEMATERIAL_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
			}
		case Types.DELETEMATERIAL_FAILURE:
			return {
				...state,
				error: null,
			}
		default:
			return state
	}
}

/* Actions */
export const Creators = {
	deleteMaterialRequest: () => ({
		type: Types.DELETEMATERIAL_REQUEST,
	}),
	deleteMaterialSuccess: (payload) => ({
		type: Types.DELETEMATERIAL_SUCCESS,
		payload,
	}),
	deleteMaterialFailure: (payload) => ({
		type: Types.DELETEMATERIAL_FAILURE,
		payload,
	}),
}
