const Types = {
  TERMS_REQUEST: "terms/REQUEST",
  TERMS_SUCCESS: "terms/SUCCESS",
  TERMS_FAILURE: "terms/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.TERMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.TERMS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.TERMS_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  termsRequest: () => ({
    type: Types.TERMS_REQUEST,
  }),
  termsSuccess: (payload) => ({
    type: Types.TERMS_SUCCESS,
    payload,
  }),
  termsFailure: (payload) => ({
    type: Types.TERMS_FAILURE,
    payload,
  }),
};
