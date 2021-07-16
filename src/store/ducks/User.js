// import { getLocalStorage } from "../helper/getLocalStorage";

/* Actions Types */
export const Types = {
  USER_REQUEST: "user/REQUEST",
  USER_UPDATE: "user/UPDATE",
  USER_SUCCESS: "user/SUCCESS",
  USER_FAILURE: "user/FAILURE",
  LOGOUT_REQUEST: "logout/REQUEST",
  LOGOUT_SUCCESS: "logout/SUCCESS",
  LOGOUT_FAILURE: "logout/FAILURE",
};

/* Reducer */
const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
  logged: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.USER_REQUEST:
      return {
        ...state,
        logged: false,
        loading: true,
      };
    case Types.USER_UPDATE:
      return {
        loading: true,
        logged: false,
        // data: action.payload,
      };
    case Types.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        logged: true,
        data: action.payload,
      };
    case Types.USER_FAILURE:
      return {
        ...state,
        loading: false,
        logged: false,
        error: action.payload.error,
      };
    case Types.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        logged: false,
      };
    case Types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        logged: false,
        error: null,
        data: INITIAL_STATE.data,
      };
    case Types.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        logged: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  userRequest: (payload) => ({
    type: Types.USER_REQUEST,
    payload,
  }),
  userUpdate: (payload) => ({
    type: Types.USER_UPDATE,
    payload,
  }),
  userSuccess: (payload) => ({
    type: Types.USER_SUCCESS,
    payload,
  }),
  userFailure: (error) => ({
    type: Types.USER_FAILURE,
    payload: { error },
  }),
  logoutRequest: () => ({
    type: Types.LOGOUT_REQUEST,
    payload: {},
  }),
  logoutSuccess: () => ({
    type: Types.LOGOUT_SUCCESS,
    payload: {},
  }),
  logoutFailure: (error) => ({
    type: Types.LOGOUT_FAILURE,
    payload: { error },
  }),
};
