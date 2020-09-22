import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeMsg, showMsg } from '../../store/actions/msgActions'



class _ErrorMsg extends Component {

    render() {
        const { msg } = this.props
        return (
            <div className={this.props.isShown ? '' : 'hide'}>
                <small className="error-msg">{msg}</small>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        msg: state.msgReducer.msg,
        isShown: state.msgReducer.isShown
    }
}
const mapDispatchToProps = {
    showMsg,
    closeMsg
}

export const ErrorMsg = connect(mapStateToProps, mapDispatchToProps)(_ErrorMsg)
