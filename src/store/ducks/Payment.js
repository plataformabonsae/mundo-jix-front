const Types = {
  PAYMENT_REQUEST: "payment/REQUEST",
  PAYMENT_SUCCESS: "payment/SUCCESS",
  PAYMENT_FAILURE: "payment/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.PAYMENT_FAILURE:
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
  paymentRequest: () => ({
    type: Types.PAYMENT_REQUEST,
  }),
  paymentSuccess: (payload) => ({
    type: Types.PAYMENT_SUCCESS,
    payload,
  }),
  paymentFailure: (payload) => ({
    type: Types.PAYMENT_FAILURE,
    payload,
  }),
};
