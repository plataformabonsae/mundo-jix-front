const Types = {
  CREATETRAIL_REQUEST: "createTrail/REQUEST",
  CREATETRAIL_SUCCESS: "createTrail/SUCCESS",
  CREATETRAIL_FAILURE: "createTrail/FAILURE",
  GETTRAIL_REQUEST: "getTrail/REQUEST",
  GETTRAIL_SUCCESS: "getTrail/SUCCESS",
  GETTRAIL_FAILURE: "getTrail/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  trail: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATETRAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.CREATETRAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.CREATETRAIL_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    case Types.GETTRAIL_REQUEST:
      return {
        ...state,
        trail: null,
        loading: true,
      };
    case Types.GETTRAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        trail: action.payload,
      };
    case Types.GETTRAIL_FAILURE:
      return {
        ...state,
        trail: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  createTrailRequest: () => ({
    type: Types.CREATETRAIL_REQUEST,
  }),
  createTrailSuccess: (payload) => ({
    type: Types.CREATETRAIL_SUCCESS,
    payload,
  }),
  createTrailFailure: (payload) => ({
    type: Types.CREATETRAIL_FAILURE,
    payload,
  }),
  getTrailRequest: () => ({
    type: Types.GETTRAIL_REQUEST,
  }),
  getTrailSuccess: (payload) => ({
    type: Types.GETTRAIL_SUCCESS,
    payload,
  }),
  getTrailFailure: (payload) => ({
    type: Types.GETTRAIL_FAILURE,
    payload,
  }),
};
