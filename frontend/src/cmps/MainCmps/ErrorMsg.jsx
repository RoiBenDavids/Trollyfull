import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeMsg, showMsg } from '../../store/actions/msgActions'



class _ErrorMsg extends Component {
    render() {
        const { msg, type } = this.props
        return (
            <React.Fragment>
                {(type === 'input') && <div className={this.props.isShown ? '' : 'hide'}>
                    <small className="error-msg"><i className="fas fa-exclamation-circle"></i>{msg}</small>
                </div>}
                {type === 'invalid-move' && <div className={this.props.isShown ? '' : 'hide'}>
                    <p className="invalid-move"><i className="fas fa-exclamation-triangle"></i>{msg}</p>
                </div>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        msg: state.msgReducer.msg,
        isShown: state.msgReducer.isShown,
        type: state.msgReducer.type

    }
}
const mapDispatchToProps = {
    showMsg,
    closeMsg
}

export const ErrorMsg = connect(mapStateToProps, mapDispatchToProps)(_ErrorMsg)
