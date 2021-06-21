import { getLocalStorage } from "../helper/getLocalStorage";

const Types = {
  TOKEN_EXTERNAL_REQUEST: "tokenExternal/REQUEST",
  TOKEN_EXTERNAL_SUCCESS: "tokenExternal/SUCCESS",
  TOKEN_EXTERNAL_FAILURE: "tokenExternal/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: getLocalStorage("token", null),
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.TOKEN_EXTERNAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.TOKEN_EXTERNAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.TOKEN_EXTERNAL_FAILURE:
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
  tokenExternalRequest: () => ({
    type: Types.TOKEN_EXTERNAL_REQUEST,
  }),
  tokenExternalSuccess: (payload) => ({
    type: Types.TOKEN_EXTERNAL_SUCCESS,
    payload,
    localStorage: "token",
  }),
  tokenExternalFailure: (payload) => ({
    type: Types.TOKEN_EXTERNAL_FAILURE,
    payload,
  }),
};
