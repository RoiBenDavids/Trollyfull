const initialState = {
    isShown: false,
    msg: ''
}

export function msgReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MSG':
            return {
                isShown: true,
                msg: action.msg
            }
        case 'CLOSE_MSG':
            return {
                isShown: false,
                msg:''
            }
        default:
            return state
    }
}