import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Login } from './Login';
import { Signup } from './Signup';
import { signup,login } from '../store/actions/userActions'
import { closeModal } from '../store/actions/modalActions'

class _LoginSignupPage extends Component {
    state = {
        login: true
    }
    componentDidMount() {
    }
    componentDidUpdate() {
        if (this.props.page !== this.state.login)
            this.setState({ login: this.props.page })
    }
    handleForm = async (props, action) => {
        if (action === 'signup') {
            var user = await this.props.signup(props)
        }else{
            var user = await this.props.login(props)
            if(!user) return
        }
        return user
    }
    closeModal(){
        this.props.closeModal()
    }
    render() {
        return (
            this.state.login ? <Login handleForm={this.handleForm} handleClick={this.props.handleClick} closeModal={()=>this.closeModal()} /> :
             <Signup handleForm={this.handleForm} handleClick={this.props.handleClick} closeModal={()=>this.closeModal()}/>

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
    closeModal

}

export const LoginSignupPage = connect(mapStateToProps, mapDispatchToProps)(_LoginSignupPage);
