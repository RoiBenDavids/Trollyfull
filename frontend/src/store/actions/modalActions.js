

export function showModal(cmp,props) {
    return dispatch => {
        dispatch({type:'SET_MODAL',cmp,props})
    }
}

export function closeModal() {
    return  dispatch => {
        dispatch({ type: 'CLOSE_MODAL' })
    }
}