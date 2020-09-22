const initialState = {
    users: [],
    loggedInUser: null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                users:[...state.users],
                loggedinUser: action.user
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}