const initialState = {
    isShown: false,
    type: '',
    msg: ''
}

export function msgReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MSG':
            return {
                isShown: true,
                msg: action.msg.msg,
                type: action.msg.type
            }
        case 'CLOSE_MSG':
            return {
                isShown: false,
                type: '',
                msg: ''
            }
        default:
            return state
    }
}