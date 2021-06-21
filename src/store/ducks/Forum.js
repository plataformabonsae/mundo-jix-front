const Types = {
  FORUM_REQUEST: "forum/REQUEST",
  FORUM_SUCCESS: "forum/SUCCESS",
  FORUM_FAILURE: "forum/FAILURE",
  FORUM_CURRENT_REQUEST: "forumCurrent/REQUEST",
  FORUM_CURRENT_SUCCESS: "forumCurrent/SUCCESS",
  FORUM_CURRENT_FAILURE: "forumCurrent/FAILURE",
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
    case Types.FORUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FORUM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.FORUM_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    case Types.FORUM_CURRENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FORUM_CURRENT_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
      };
    case Types.FORUM_CURRENT_FAILURE:
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
  forumRequest: () => ({
    type: Types.FORUM_REQUEST,
  }),
  forumSuccess: (payload) => ({
    type: Types.FORUM_SUCCESS,
    payload,
  }),
  forumFailure: (payload) => ({
    type: Types.FORUM_FAILURE,
    payload,
  }),
  forumCurrentRequest: () => ({
    type: Types.FORUM_CURRENT_REQUEST,
  }),
  forumCurrentSuccess: (payload) => ({
    type: Types.FORUM_CURRENT_SUCCESS,
    payload,
  }),
  forumCurrentFailure: (payload) => ({
    type: Types.FORUM_CURRENT_FAILURE,
    payload,
  }),
};
