const Types = {
  USERS_REQUEST: "users/REQUEST",
  USERS_SUCCESS: "users/SUCCESS",
  USERS_FAILURE: "users/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.USERS_FAILURE:
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
  usersRequest: () => ({
    type: Types.USERS_REQUEST,
  }),
  usersSuccess: (payload) => ({
    type: Types.USERS_SUCCESS,
    payload,
  }),
  usersFailure: (payload) => ({
    type: Types.USERS_FAILURE,
    payload,
  }),
};
