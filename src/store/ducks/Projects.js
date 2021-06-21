const Types = {
  PROJECTS_REQUEST: "projects/REQUEST",
  PROJECTS_SUCCESS: "projects/SUCCESS",
  PROJECTS_FAILURE: "projects/FAILURE",
  PROJECTS_CURRENT_REQUEST: "projectsCurrent/REQUEST",
  PROJECTS_CURRENT_SUCCESS: "projectsCurrent/SUCCESS",
  PROJECTS_CURRENT_FAILURE: "projectsCurrent/FAILURE",
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
    case Types.PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.PROJECTS_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    case Types.PROJECTS_CURRENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.PROJECTS_CURRENT_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
      };
    case Types.PROJECTS_CURRENT_FAILURE:
      return {
        ...state,
        current: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  projectsRequest: () => ({
    type: Types.PROJECTS_REQUEST,
  }),
  projectsSuccess: (payload) => ({
    type: Types.PROJECTS_SUCCESS,
    payload,
  }),
  projectsFailure: (payload) => ({
    type: Types.PROJECTS_FAILURE,
    payload,
  }),
  projectsCurrentRequest: () => ({
    type: Types.PROJECTS_CURRENT_REQUEST,
  }),
  projectsCurrentSuccess: (payload) => ({
    type: Types.PROJECTS_CURRENT_SUCCESS,
    payload,
  }),
  projectsCurrentFailure: (payload) => ({
    type: Types.PROJECTS_CURRENT_FAILURE,
    payload,
  }),
};
