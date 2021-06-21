const Types = {
  INVITES_REQUEST: "invites/REQUEST",
  INVITES_SUCCESS: "invites/SUCCESS",
  INVITES_FAILURE: "invites/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.INVITES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.INVITES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.INVITES_FAILURE:
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
  invitesRequest: () => ({
    type: Types.INVITES_REQUEST,
  }),
  invitesSuccess: (payload) => ({
    type: Types.INVITES_SUCCESS,
    payload,
  }),
  invitesFailure: (payload) => ({
    type: Types.INVITES_FAILURE,
    payload,
  }),
};
