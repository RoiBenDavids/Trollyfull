
let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
    users: [],
    loggedInUser: localLoggedinUser
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                users:[...state.users],
                loggedInUser: action.user
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