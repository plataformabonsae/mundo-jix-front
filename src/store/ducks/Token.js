import { getLocalStorage } from "../helper/getLocalStorage";

const Types = {
  TOKEN_REQUEST: "token/REQUEST",
  TOKEN_SUCCESS: "token/SUCCESS",
  TOKEN_FAILURE: "token/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: getLocalStorage("token", null),
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  tokenRequest: () => ({
    type: Types.TOKEN_REQUEST,
  }),
  tokenSuccess: (payload) => ({
    type: Types.TOKEN_SUCCESS,
    payload,
    localStorage: "token",
  }),
  tokenFailure: (payload) => ({
    type: Types.TOKEN_FAILURE,
    payload,
  }),
};
