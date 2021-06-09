const Types = {
  TRAIL_REQUEST: "trail/REQUEST",
  TRAIL_SUCCESS: "trail/SUCCESS",
  TRAIL_FAILURE: "trail/FAILURE",
  TRAIL_CURRENT_REQUEST: "trailCurrent/REQUEST",
  TRAIL_CURRENT_SUCCESS: "trailCurrent/SUCCESS",
  TRAIL_CURRENT_FAILURE: "trailCurrent/FAILURE",
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
    case Types.TRAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.TRAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.TRAIL_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    case Types.TRAIL_CURRENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.TRAIL_CURRENT_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
      };
    case Types.TRAIL_CURRENT_FAILURE:
      return {
        ...state,
        // current: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  trailRequest: () => ({
    type: Types.TRAIL_REQUEST,
  }),
  trailSuccess: (payload) => ({
    type: Types.TRAIL_SUCCESS,
    payload,
  }),
  trailFailure: (payload) => ({
    type: Types.TRAIL_FAILURE,
    payload,
  }),
  trailCurrentRequest: () => ({
    type: Types.TRAIL_CURRENT_REQUEST,
  }),
  trailCurrentSuccess: (payload) => ({
    type: Types.TRAIL_CURRENT_SUCCESS,
    payload,
  }),
  trailCurrentFailure: (payload) => ({
    type: Types.TRAIL_CURRENT_FAILURE,
    payload,
  }),
};
