const initialState = {
    isShown: false,
    props: null,
    cmp: null,
    msg:null,
    loaderOn: false
}

export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MODAL':
            return {
                isShown: true,
                props: action.props,
                cmp: action.cmp
            }
        case 'CLOSE_MODAL':
            return {
                isShown: false,
                props: null,
                cmp: null
            }
        case 'LOGIN_PROBLEML':
            return {
                ...state,
                msg:'wrong email or password'
            }
        case 'SET_LOADER':
            return {
                loaderOn: true,
            }
        case 'CLOSE_LOADER':
            return {
                loaderOn: false,
            }

        default:
            return state
    }
}