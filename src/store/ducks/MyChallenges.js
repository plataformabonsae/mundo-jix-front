const Types = {
  MYCHALLENGES_REQUEST: "myChallenges/REQUEST",
  MYCHALLENGES_SUCCESS: "myChallenges/SUCCESS",
  MYCHALLENGES_FAILURE: "myChallenges/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.MYCHALLENGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.MYCHALLENGES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.MYCHALLENGES_FAILURE:
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
  myChallengesRequest: () => ({
    type: Types.MYCHALLENGES_REQUEST,
  }),
  myChallengesSuccess: (payload) => ({
    type: Types.MYCHALLENGES_SUCCESS,
    payload,
  }),
  myChallengesFailure: (payload) => ({
    type: Types.MYCHALLENGES_FAILURE,
    payload,
  }),
};
