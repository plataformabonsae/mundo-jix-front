const Types = {
  NEWCHALLENGE_REQUEST: "newChallenge/REQUEST",
  NEWCHALLENGE_SUCCESS: "newChallenge/SUCCESS",
  NEWCHALLENGE_FAILURE: "newChallenge/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.NEWCHALLENGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.NEWCHALLENGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.NEWCHALLENGE_FAILURE:
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
  newChallengeRequest: () => ({
    type: Types.NEWCHALLENGE_REQUEST,
  }),
  newChallengeSuccess: (payload) => ({
    type: Types.NEWCHALLENGE_SUCCESS,
    payload,
  }),
  newChallengeFailure: (payload) => ({
    type: Types.NEWCHALLENGE_FAILURE,
    payload,
  }),
};
