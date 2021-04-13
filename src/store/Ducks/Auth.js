export const Types = {
  RESET_PASSWORD_REQUEST: 'auth/RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS: 'auth/RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE: 'auth/RESET_PASSWORD_FAILURE',
  VALID_PIN_REQUEST: 'auth/VALID_PIN_REQUEST',
  VALID_PIN_SUCCESS: 'auth/VALID_PIN_SUCCESS',
  VALID_PIN_FAILURE: 'auth/VALID_PIN_FAILURE',
  CHANGE_PASSWORD_REQUEST: 'auth/CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS: 'auth/CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'auth/CHANGE_PASSWORD_FAILURE',
};

/* Reducer */
const INITIAL_STATE = {
  resetPassword: {
    isLoading: false,
    data: '',
    email: '',
    error: null,
  },
  validPin: {
    isLoading: false,
    data: '',
    pin: '',
    error: null,
  },
  changePassword: {
    isLoading: false,
    data: '',
    error: null,
  },
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isLoading: true,
          email: action.payload.email,
        },
      };
    case Types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isLoading: false,
          error: null,
          data: action.payload.data,
        },
      };

    case Types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isLoading: false,
          error: action.payload.error,
        },
      };

    case Types.VALID_PIN_REQUEST:
      return {
        ...state,
        validPin: {
          ...state.validPin,
          isLoading: true,
          pin: action.payload.pin,
        },
      };
    case Types.VALID_PIN_SUCCESS:
      return {
        ...state,
        validPin: {
          ...state.validPin,
          isLoading: false,
          error: null,
          data: action.payload.data,
        },
      };

    case Types.VALID_PIN_FAILURE:
      return {
        ...state,
        validPin: {
          ...state.validPin,
          isLoading: false,
          error: action.payload.error,
        },
      };

    case Types.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          isLoading: true,
        },
      };
    case Types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          isLoading: false,
          error: null,
          data: action.payload.data,
        },
      };

    case Types.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          isLoading: false,
          error: action.payload.error,
        },
      };

    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  resetPasswordRequest: (email) => ({
    type: Types.RESET_PASSWORD_REQUEST,
    payload: {email},
  }),
  resetPasswordSuccess: (data) => ({
    type: Types.RESET_PASSWORD_SUCCESS,
    payload: {data},
  }),
  resetPasswordFailure: (error) => ({
    type: Types.RESET_PASSWORD_FAILURE,
    payload: {error},
  }),
  validPinRequest: (email, pin) => ({
    type: Types.VALID_PIN_REQUEST,
    payload: {email, pin},
  }),
  validPinSuccess: (data) => ({
    type: Types.VALID_PIN_SUCCESS,
    payload: {data},
  }),
  validPinFailure: (error) => ({
    type: Types.VALID_PIN_FAILURE,
    payload: {error},
  }),
  changePasswordRequest: (email, pin, password) => ({
    type: Types.CHANGE_PASSWORD_REQUEST,
    payload: {email, pin, password},
  }),
  changePasswordSuccess: (data) => ({
    type: Types.CHANGE_PASSWORD_SUCCESS,
    payload: {data},
  }),
  changePasswordFailure: (error) => ({
    type: Types.CHANGE_PASSWORD_FAILURE,
    payload: {error},
  }),
};


