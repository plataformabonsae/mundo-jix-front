
const Types = {
    DASHBOARD_REQUEST: 'dashboard/REQUEST',
    DASHBOARD_SUCCESS: 'dashboard/SUCCESS',
    DASHBOARD_FAILURE: 'dashboard/FAILURE',
}


const INITIAL_STATE = {
    loading: false,
    data: null,
}

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) { 
    switch( action.type ) {
        case Types.DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case Types.DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case Types.DASHBOARD_FAILURE:
            return {
                ...state,
                dashboard: null
            }
        default:
            return state
    }
}

/* Actions */
export const Creators = {
    dashboardRequest: () => ({
        type: Types.DASHBOARD_REQUEST
    }),
    dashboardSuccess: (payload) => ({
        type: Types.DASHBOARD_SUCCESS,
        payload,
    }),
    dashboardFailure: (payload) => ({
        type: Types.DASHBOARD_FAILURE,
        payload
    })
}
