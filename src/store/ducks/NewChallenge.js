const Types = {
  NEWCHALLENGE_REQUEST: "newChallenge/REQUEST",
  NEWCHALLENGE_SUCCESS: "newChallenge/SUCCESS",
  NEWCHALLENGE_FAILURE: "newChallenge/FAILURE",
  UPDATECHALLENGE_REQUEST: "updateChallenge/REQUEST",
  UPDATECHALLENGE_SUCCESS: "updateChallenge/SUCCESS",
  UPDATECHALLENGE_FAILURE: "updateChallenge/FAILURE",
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
        loading: false,
        error: action.payload,
      };
    case Types.UPDATECHALLENGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.UPDATECHALLENGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.UPDATECHALLENGE_FAILURE:
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
  updateChallengeRequest: () => ({
    type: Types.UPDATECHALLENGE_REQUEST,
  }),
  updateChallengeSuccess: (payload) => ({
    type: Types.UPDATECHALLENGE_SUCCESS,
    payload,
  }),
  updateChallengeFailure: (payload) => ({
    type: Types.UPDATECHALLENGE_FAILURE,
    payload,
  }),
};
