const Types = {
  CEP_REQUEST: "cep/REQUEST",
  CEP_SUCCESS: "cep/SUCCESS",
  CEP_FAILURE: "cep/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CEP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.CEP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.CEP_FAILURE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  cepRequest: () => ({
    type: Types.CEP_REQUEST,
  }),
  cepSuccess: (payload) => ({
    type: Types.CEP_SUCCESS,
    payload,
  }),
  cepFailure: (payload) => ({
    type: Types.CEP_FAILURE,
    payload,
  }),
};
