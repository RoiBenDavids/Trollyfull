import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socketService } from '../../services/socketService';

class _Chat extends Component {
    state = {
        msg: {
            from: this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest',
            txt: ''
        },
        msgs: [],
        isTyping: ''

    }

    componentDidMount() {
        socketService.emit('chat topic', this.props.trip._id);
        socketService.on('chat addMsg', this.addMsg);
        socketService.on('isTyping', this.userTyping);
        socketService.on('notTyping', this.userTyping);

        // socketService.emit('chat history');
        // socketService.on('load history', this.loadHistory)
    }
    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.off('isTyping', this.userTyping);
        socketService.off('notTyping', this.userTyping);


        // socketService.off('chat history', this.loadHistory)
        socketService.terminate();
    }
    loadHistory = history => {
        this.setState({ msgs: history || [] });
    }
    addMsg = newMsg => {
        this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
    }
    sendMsg = ev => {
        ev.preventDefault();
        socketService.emit('chat newMsg', this.state.msg);
        socketService.emit("stopTyping", "");

        // this.addMsg(this.state.msg)//remove
        const user = this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'
        this.setState({ msg: { from: user, txt: '' } });
    }
    userTyping = isTyping => {
        this.setState({ isTyping });
    }

    msgHandleChange = ev => {
        const { name, value } = ev.target;
        if ((value.trim()).length > 0) {
            const user = this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'
            socketService.emit('user typing', user);

        }
        else {
            socketService.emit("stopTyping", "");
        }
        this.setState(prevState => {
            return {
                msg: {
                    ...prevState.msg,
                    [name]: value
                }
            }
        })


    }
    render() {
        console.log(this.props.loggedInUser, this.state.isTyping);
        return (
            <div className={`chat-container flex column  ${this.props.chatOpen ? 'open' : ''}`}>
                <div className="chat-header styled-header">
                    {this.props.trip.destinations[0].name} Chat
                </div>

                <ul className="chat-history">
                    {this.state.msgs.map((msg, idx) => (
                        <li key={idx}>
                            <div className="message-data">{this.props.loggedInUser? ((this.props.loggedInUser.username === msg.from)? 'Me' : msg.from) : ((msg.from === 'Guest')? 'Me' : msg.from)}</div>
                            <div className="message">{msg.txt}</div>

                        </li>
                    ))}
                </ul>

                {this.props.loggedInUser ? ((this.state.isTyping && this.state.isTyping !== this.props.loggedInUser.username) ? <p>{this.state.isTyping} is Typing</p> : '') : ((this.state.isTyping && this.state.isTyping !== 'Guest') ? <p>{this.state.isTyping} is Typing</p> : '')}


                <form className="chat-send flex align-center" onSubmit={this.sendMsg}>
                    <input
                        type="text"
                        value={this.state.msg.txt}
                        onChange={this.msgHandleChange}
                        name="txt"
                        autoComplete="off"
                        placeholder="New message"

                    />
                    <button><i class="far fa-paper-plane"></i></button>
                </form>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {

}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat);