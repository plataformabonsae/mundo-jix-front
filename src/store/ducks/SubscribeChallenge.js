const Types = {
  SUBSCRIBECHALLENGE_REQUEST: "subscribeChallenge/REQUEST",
  SUBSCRIBECHALLENGE_SUCCESS: "subscribeChallenge/SUCCESS",
  SUBSCRIBECHALLENGE_FAILURE: "subscribeChallenge/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SUBSCRIBECHALLENGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.SUBSCRIBECHALLENGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.SUBSCRIBECHALLENGE_FAILURE:
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
  subscribeChallengeRequest: () => ({
    type: Types.SUBSCRIBECHALLENGE_REQUEST,
  }),
  subscribeChallengeSuccess: (payload) => ({
    type: Types.SUBSCRIBECHALLENGE_SUCCESS,
    payload,
  }),
  subscribeChallengeFailure: (payload) => ({
    type: Types.SUBSCRIBECHALLENGE_FAILURE,
    payload,
  }),
};
