import React, { Component } from 'react'


export class NotificationMsg extends Component {
    state = {
        isShown: false,
        msg: '',
        type: ''
    }

    render() {
        return (
            <div>
                <h2>Are you sure you want to delete?</h2>
                <div className="flex notification-btns">
                    <button className="styled-button" onClick={() => this.props.props.removeAct(this.props.props.actId)}>Delete</button>
                    <button className="styled-button" onClick={() => this.props.closeModal()}>Cancel</button>
                </div>
            </div>
        )
        // const { isShown, msg, type } = this.state
        // const _hidden = (isShown)?'':'hidden-msg'
        // return (
        //     <div className={ `notification-box ${type} ${_hidden}` }  >
        //         { isShown && <span onClick={ () => this.setState({ isShown: false }) }>X</span> }
        //         { isShown && <h2> { msg }</h2> }
        //     </div>
    }
}
