const Types = {
  CHALLENGES_REQUEST: "challenges/REQUEST",
  CHALLENGES_SUCCESS: "challenges/SUCCESS",
  CHALLENGES_FAILURE: "challenges/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHALLENGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.CHALLENGES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.CHALLENGES_FAILURE:
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
  challengesRequest: () => ({
    type: Types.CHALLENGES_REQUEST,
  }),
  challengesSuccess: (payload) => ({
    type: Types.CHALLENGES_SUCCESS,
    payload,
  }),
  challengesFailure: (payload) => ({
    type: Types.CHALLENGES_FAILURE,
    payload,
  }),
};
