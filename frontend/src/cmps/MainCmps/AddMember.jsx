import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export class AddMember extends Component {

    state = {
        value: '',
        copied: false,
        // emailToSend: {
        //     subject: '',
        //     body: '',
        //     email: ''

        // }
    }

    componentDidMount() {
    this.setState({value:`http://localhost:3000/#/trip/5f69033fbd018f1ed4ae24ba/triproute/true`})
    }
    

    handleInput = (value, name) => {
        console.log(name, value);
        this.setState({ emailToSend: { ...this.state.emailToSend, [name]: value } })
    }

    onAddMember(ev, mail) {
        ev.preventDefault()
        console.log(mail);

        this.props.closeModal()

    }


    render() {
            return (
            <div className="flex column share-trip">
                <h3>Share this link with your trip partners and start planning together!</h3>
                <img src="https://thumbs.dreamstime.com/b/group-young-people-friends-celebrating-successful-hiking-expedition-group-young-people-friends-celebrating-successful-hiking-123552345.jpg" alt=""/>
                <input disabled className="styled-input" value={this.state.value}
                    onChange={({ target: { value } }) => this.setState({ value, copied: false })} />

                {/* <CopyToClipboard text={this.state.value}
                    onCopy={() => this.setState({ copied: true })}>
                    <span>Copy to clipboard with span</span>
                </CopyToClipboard> */}

                <CopyToClipboard text={this.state.value}
                    onCopy={() => this.setState({ copied: true })}>
                    <button className="styled-button">Copy and share</button>
                </CopyToClipboard>

                {this.state.copied ? <span style={{ color: 'orange' }}>Copied!</span> : null}
            </div>

            // <div className={'add-member'}>
            //     <form className="flex column" onSubmit={(ev) => { this.onAddMember(ev, this.state.emailToSend) }}>
            //         <div className="headline">
            //             <h2>Add Member</h2>
            //         </div>
            //         <input className="styled-input"
            //             placeholder="Enter your friend Email"
            //             type="email"
            //             name="email"
            //             required
            //             value={this.state.emailToSend.email}
            //             onChange={(ev) => { this.handleInput(ev.target.value, ev.target.name) }} />
            //         <input className="styled-input"
            //             placeholder="Enter subject"
            //             type="text"
            //             name="subject"
            //             required
            //             value={this.state.emailToSend.subject}
            //             onChange={(ev) => { this.handleInput(ev.target.value, ev.target.name) }} />
            //         <textarea
            //             required
            //             name="body"
            //             placeholder="Enter your review here"
            //             value={this.state.emailToSend.body}
            //             onChange={(ev) => { this.handleInput(ev.target.value, ev.target.name) }}>
            //         </textarea>
            //         {/* <ErrorMsg /> */}
            //         <button onSubmit={(ev) => { this.onAddMember(ev, this.state.emailToSend) }}>Save</button>
            //     </form>
            // </div>
        )
    }
}


const appRoot = document.createElement('div');
document.body.appendChild(appRoot);
// ReactDOM.render(<App />, appRoot);