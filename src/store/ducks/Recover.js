const Types = {
  RECOVER_REQUEST: "recover/REQUEST",
  RECOVER_SUCCESS: "recover/SUCCESS",
  RECOVER_FAILURE: "recover/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RECOVER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.RECOVER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.RECOVER_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  recoverRequest: () => ({
    type: Types.RECOVER_REQUEST,
  }),
  recoverSuccess: (payload) => ({
    type: Types.RECOVER_SUCCESS,
    payload,
  }),
  recoverFailure: (payload) => ({
    type: Types.RECOVER_FAILURE,
    payload,
  }),
};
