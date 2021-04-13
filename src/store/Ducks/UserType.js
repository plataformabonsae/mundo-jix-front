import { getLocalStorage } from '../helper/getLocalStorage'

/* Actions Types */
export const Types = {
    USERTYPE_REQUEST: 'usertype/REQUEST',
    USERTYPE_SUCCESS: 'usertype/SUCCESS',
    USERTYPE_FAILURE: 'usertype/FAILURE',
  };
  
  /* Reducer */
  const INITIAL_STATE = {
    loading: false,
    data: getLocalStorage('usertype', null),
    error: null,
  };
  
  export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case Types.USERTYPE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case Types.USERTYPE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          data: action.payload,
        };
      case Types.USERTYPE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  }
  
  /* Actions */
  export const Creators = {
    userTypeRequest: (payload) => ({
      type: Types.USERTYPE_REQUEST,
      payload,
    }),
    userTypeSuccess: (payload) => ({
      type: Types.USERTYPE_SUCCESS,
      payload,
    }),
    userTypeFailure: (error) => ({
      type: Types.USERTYPE_FAILURE,
      payload: {error},
    }),
  };
  