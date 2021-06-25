const Types = {
  FEEDBACKS_REQUEST: "feedbacks/REQUEST",
  FEEDBACKS_SUCCESS: "feedbacks/SUCCESS",
  FEEDBACKS_FAILURE: "feedbacks/FAILURE",
  FEEDBACKS_CURRENT_REQUEST: "feedbacksCurrent/REQUEST",
  FEEDBACKS_CURRENT_SUCCESS: "feedbacksCurrent/SUCCESS",
  FEEDBACKS_CURRENT_FAILURE: "feedbacksCurrent/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  current: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FEEDBACKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FEEDBACKS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.FEEDBACKS_FAILURE:
      return {
        ...state,
        // data: null,
        error: action.payload,
      };
    case Types.FEEDBACKS_CURRENT_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
      };
    case Types.FEEDBACKS_CURRENT_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
      };
    case Types.FEEDBACKS_CURRENT_FAILURE:
      return {
        ...state,
        // data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  feedbacksRequest: () => ({
    type: Types.FEEDBACKS_REQUEST,
  }),
  feedbacksSuccess: (payload) => ({
    type: Types.FEEDBACKS_SUCCESS,
    payload,
  }),
  feedbacksFailure: (payload) => ({
    type: Types.FEEDBACKS_FAILURE,
    payload,
  }),
  feedbacksCurrentRequest: () => ({
    type: Types.FEEDBACKS_CURRENT_REQUEST,
  }),
  feedbacksCurrentSuccess: (payload) => ({
    type: Types.FEEDBACKS_CURRENT_SUCCESS,
    payload,
  }),
  feedbacksCurrentFailure: (payload) => ({
    type: Types.FEEDBACKS_CURRENT_FAILURE,
    payload,
  }),
};
