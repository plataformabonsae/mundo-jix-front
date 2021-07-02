const Types = {
  SKILLS_REQUEST: "skills/REQUEST",
  SKILLS_SUCCESS: "skills/SUCCESS",
  SKILLS_FAILURE: "skills/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.SKILLS_FAILURE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
}

/* Actions */
export const Creators = {
  skillsRequest: () => ({
    type: Types.SKILLS_REQUEST,
  }),
  skillsSuccess: (payload) => ({
    type: Types.SKILLS_SUCCESS,
    payload,
  }),
  skillsFailure: (payload) => ({
    type: Types.SKILLS_FAILURE,
    payload,
  }),
};
