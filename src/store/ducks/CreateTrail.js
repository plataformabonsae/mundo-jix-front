const Types = {
  CREATETRAIL_REQUEST: "createTrail/REQUEST",
  CREATETRAIL_SUCCESS: "createTrail/SUCCESS",
  CREATETRAIL_FAILURE: "createTrail/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
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
};
