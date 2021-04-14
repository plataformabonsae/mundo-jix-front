
const Types = {
    PROFILE_REQUEST: 'profile/REQUEST',
    PROFILE_SUCCESS: 'profile/SUCCESS',
    PROFILE_FAILURE: 'profile/FAILURE',
}


const INITIAL_STATE = {
    loading: false,
    data: null,
}

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) { 
    switch( action.type ) {
        case Types.PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case Types.PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case Types.PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                profile: null
            }
        default:
            return state
    }
}

/* Actions */
export const Creators = {
    profileRequest: () => ({
        type: Types.PROFILE_REQUEST
    }),
    profileSuccess: (payload) => ({
        type: Types.PROFILE_SUCCESS,
        payload,
    }),
    profileFailure: (payload) => ({
        type: Types.PROFILE_FAILURE,
        payload
    })
}
