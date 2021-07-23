const Types = {
  JUDGE_ASSESSMENT_REQUEST: "judgeAssessment/REQUEST",
  JUDGE_ASSESSMENT_SUCCESS: "judgeAssessment/SUCCESS",
  JUDGE_ASSESSMENT_FAILURE: "judgeAssessment/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.JUDGE_ASSESSMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.JUDGE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.JUDGE_ASSESSMENT_FAILURE:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  judgeAssessmentRequest: () => ({
    type: Types.JUDGE_ASSESSMENT_REQUEST,
  }),
  judgeAssessmentSuccess: (payload) => ({
    type: Types.JUDGE_ASSESSMENT_SUCCESS,
    payload,
  }),
  judgeAssessmentFailure: (payload) => ({
    type: Types.JUDGE_ASSESSMENT_FAILURE,
    payload,
  }),
};
