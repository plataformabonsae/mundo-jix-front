const Types = {
  ASSESSMENT_REQUEST: "assessment/REQUEST",
  ASSESSMENT_SUCCESS: "assessment/SUCCESS",
  ASSESSMENT_FAILURE: "assessment/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ASSESSMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.ASSESSMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.ASSESSMENT_FAILURE:
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
  assessmentRequest: () => ({
    type: Types.ASSESSMENT_REQUEST,
  }),
  assessmentSuccess: (payload) => ({
    type: Types.ASSESSMENT_SUCCESS,
    payload,
  }),
  assessmentFailure: (payload) => ({
    type: Types.ASSESSMENT_FAILURE,
    payload,
  }),
};
