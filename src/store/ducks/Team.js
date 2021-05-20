const Types = {
  TEAM_REQUEST: "team/REQUEST",
  TEAM_SUCCESS: "team/SUCCESS",
  TEAM_FAILURE: "team/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.TEAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.TEAM_FAILURE:
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
  teamRequest: () => ({
    type: Types.TEAM_REQUEST,
  }),
  teamSuccess: (payload) => ({
    type: Types.TEAM_SUCCESS,
    payload,
  }),
  teamFailure: (payload) => ({
    type: Types.TEAM_FAILURE,
    payload,
  }),
};
