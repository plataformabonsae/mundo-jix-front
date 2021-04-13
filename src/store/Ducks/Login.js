/* Actions Types */
export const Types = {
  LOGIN_REQUEST: 'login/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'login/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'login/LOGIN_FAILURE',
  LOGOUT_REQUEST: 'logout/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'logout/LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'logout/LOGOUT_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case Types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case Types.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: INITIAL_STATE.data,
      };
    case Types.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  loginRequest: (payload) => ({
    type: Types.LOGIN_REQUEST,
    payload,
  }),
  loginSuccess: (payload) => ({
    type: Types.LOGIN_SUCCESS,
    payload,
  }),
  loginFailure: (error) => ({
    type: Types.LOGIN_FAILURE,
    payload: {error},
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
    payload: {error},
  }),
};
