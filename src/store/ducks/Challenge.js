const Types = {
  CHALLENGE_REQUEST: "challenge/REQUEST",
  CHALLENGE_SUCCESS: "challenge/SUCCESS",
  CHALLENGE_FAILURE: "challenge/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHALLENGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.CHALLENGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.CHALLENGE_FAILURE:
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
  challengeRequest: () => ({
    type: Types.CHALLENGE_REQUEST,
  }),
  challengeSuccess: (payload) => ({
    type: Types.CHALLENGE_SUCCESS,
    payload,
  }),
  challengeFailure: (payload) => ({
    type: Types.CHALLENGE_FAILURE,
    payload,
  }),
};
