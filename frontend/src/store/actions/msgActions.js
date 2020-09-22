export function showMsg(msg) {
    return dispatch => {
        setTimeout(() => {
            this.closeMsg()
        }, 3000)
        dispatch({ type: 'SET_MSG', msg })
        
    }
    
}

export function closeMsg() {
    return dispatch => {
        dispatch({ type: 'CLOSE_MSG' })
    }
}