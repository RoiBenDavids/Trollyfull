import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Login } from './Login';
import { Signup } from './Signup';
import { signup, login } from '../store/actions/userActions'
import { closeModal, showModal } from '../store/actions/modalActions'
import { loadTrip, addTrip } from '../store/actions/tripActions'
import { socketService } from '../services/socketService'

class _LoginSignupPage extends Component {
    state = {
        login: true
    }
    componentDidMount() {
        if (this.props.page !== this.state.login) {
            this.setState({ login: this.props.page })
        }
    }
    componentDidUpdate() {
        if (this.props.page !== this.state.login) {
            this.setState({ login: this.props.page })
        }
    }
    handleForm = async (props, action, tripIdToRed) => {
        if (action === 'signup') {
            if (tripIdToRed) {
                const [tripToRed, user] = await Promise.all([this.props.loadTrip(tripIdToRed), this.props.signup(props)])
                tripToRed.members.push({ username: user.username, imgUrl: user.imgUrl, id: user._id })
                await this.props.addTrip(tripToRed)
                socketService.emit('tripToUpdate', tripToRed._id);

                this.props.closeModal()
                return user
            }
            return await this.props.signup(props)
        } else {
            var user = await this.props.login(props)
            if (!user) return
            return user
        }
    }
    closeModal=()=> {
        this.props.closeModal()
    }
    render() {
        const tripToRed = this.props.tripId
        return (
            this.state.login ? <Login handleForm={this.handleForm} handleClick={this.props.handleClick}
                closeModal={this.closeModal} /> :
                <Signup handleForm={this.handleForm} handleClick={this.props.handleClick}
                    closeModal={this.closeModal} tripId={this.props.tripId} tripToRed={tripToRed} />
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = {
    signup,
    login,
    closeModal,
    showModal,
    loadTrip,
    addTrip

}

export const LoginSignupPage = connect(mapStateToProps, mapDispatchToProps)(_LoginSignupPage);
