const Types = {
  PROJECT_REQUEST: "project/REQUEST",
  PROJECT_SUCCESS: "project/SUCCESS",
  PROJECT_FAILURE: "project/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.PROJECT_FAILURE:
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
  projectRequest: () => ({
    type: Types.PROJECT_REQUEST,
  }),
  projectSuccess: (payload) => ({
    type: Types.PROJECT_SUCCESS,
    payload,
  }),
  projectFailure: (payload) => ({
    type: Types.PROJECT_FAILURE,
    payload,
  }),
};
