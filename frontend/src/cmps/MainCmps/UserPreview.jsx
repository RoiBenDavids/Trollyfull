import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export class UserPreview extends Component {
    state = {
        expand: false
    }
    toggleExpand = () => {
        console.log('toggleExpand');
        this.setState({ expand: !this.state.expand })
    }

    render() {
        return (
            <React.Fragment>


                <div >
                    <span onClick={this.toggleExpand}>{this.props.user.username}</span>
                    { <div className={`user-preview-expand flex column justify-around ${this.state.expand?'open':''}`} >
                        <Link to={`/user/${this.props.user._id}`} >My Trips</Link>
                        <button onClick={this.props.logout}>Logout</button>
                    </div>}
                </div>
            </React.Fragment>

        )
    }
}