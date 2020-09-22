import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socketService } from '../../services/socketService';

class _Chat extends Component {
    state = {
        msg: { from: 'Me', txt: '' },
        msgs: [],

    }

    componentDidMount() {
        console.log('Chat', this.props);
        // socketService.setup();
        // socketService.emit('chat trip', this.props.toyId);
        // socketService.emit('chat history');
        // socketService.on('load history', this.loadHistory)
        // socketService.on('chat addMsg', this.addMsg);
    }
    componentWillUnmount() {
        // socketService.off('chat addMsg', this.addMsg);
        // socketService.off('chat history', this.loadHistory)
        // socketService.terminate();
    }
    loadHistory = history => {
        this.setState({ msgs: history || [] });
        console.log('history:', history);
    }
    addMsg = newMsg => {
        this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
    }
    sendMsg = ev => {
        ev.preventDefault();
        // socketService.emit('chat newMsg', this.state.msg);
        this.addMsg(this.state.msg)//remove
        this.setState({ msg: { from: 'Me', txt: '' } });
    }
    msgHandleChange = ev => {
        const { name, value } = ev.target;
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
        console.log(this.state);
        return (
            <div className={`chat-container flex column  ${this.props.chatOpen ? 'open' : ''}`}>
                <div className="chat-header styled-header">
                    {this.props.trip.destinations[0].name} Chat
                </div>

                <ul className="chat-history">
                    {this.state.msgs.map((msg, idx) => (
                        <li key={idx}>
                            <div className="message-data">{msg.from}</div>
                            <div className="message">{msg.txt}</div>

                        </li>
                    ))}
                </ul>

                <form className="chat-send flex align-center" onSubmit={this.sendMsg}>
                    <input
                        type="text"
                        value={this.state.msg.txt}
                        onChange={this.msgHandleChange}
                        name="txt"
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

    }
}

const mapDispatchToProps = {

}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat);