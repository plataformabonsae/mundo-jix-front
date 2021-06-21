const Types = {
  NOTIFICATIONS_REQUEST: "notifications/REQUEST",
  NOTIFICATIONS_SUCCESS: "notifications/SUCCESS",
  NOTIFICATIONS_FAILURE: "notifications/FAILURE",
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case Types.NOTIFICATIONS_FAILURE:
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
  notificationsRequest: () => ({
    type: Types.NOTIFICATIONS_REQUEST,
  }),
  notificationsSuccess: (payload) => ({
    type: Types.NOTIFICATIONS_SUCCESS,
    payload,
  }),
  notificationsFailure: (payload) => ({
    type: Types.NOTIFICATIONS_FAILURE,
    payload,
  }),
};
