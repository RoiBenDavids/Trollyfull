import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom'

import { UserPreview } from '../MainCmps/UserPreview'

import { resetTrip } from '../../store/actions/tripActions'
import { showModal } from '../../store/actions/modalActions'
import { logout } from '../../store/actions/userActions'

class _MainNavBar extends Component {
    state = {
        navBar: '',
        isNavbarOpen: false
    }

    componentDidMount() {
        const path = this.props.location.pathname.match('/')
        const match = path && this.props.location.pathname === path[0]
        if (!match) this.backgroundChanged()
        window.addEventListener('scroll', this.backgroundChanged);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.backgroundChanged()
            if (this.props.location.pathname === '/') {
                this.props.resetTrip()
            }
        }


    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.backgroundChanged);
    }


    backgroundChanged = () => {
        const path = this.props.location.pathname.match('/')
        const match = path && this.props.location.pathname === path[0]
        if (window.pageYOffset >= 80 || !match) {
            this.setState({ navBar: true })
        } else { this.setState({ navBar: false }) }
    }

    openMainNavbar = () => {
        this.setState({ isNavbarOpen: !this.state.isNavbarOpen })
    }

    closemainNavbar = () => {
        this.setState({ isNavbarOpen: false })
    }

    render() {
        return (
            <React.Fragment>
                <div className={'main-navbar flex justify-between align-center full  ' + (this.state.navBar ? 'navBar-background' : '')}>
                    <Link to="/" onClick={this.closemainNavbar}> <h1 className="logo">Trolly</h1></Link>
                    <div className={`flex justify-between main-navbar-links ${this.state.isNavbarOpen ? 'mainbar-open' : ''}`}>
                        <Link to="/trip" onClick={this.closemainNavbar} >Trips</Link>
                        <NavLink to="/about" onClick={this.closemainNavbar} >About</NavLink>
                        {this.props.usersData.loggedInUser ? <UserPreview closemainNavbar={this.closemainNavbar} openMainNavbar={this.closemainNavbar} logout={this.props.logout} user={this.props.usersData.loggedInUser} /> : <div onClick={() => { this.props.showModal('login') }}>Login</div>}

                    </div>
                    <button className="mobile-hamburger " onClick={this.openMainNavbar}> ☰</button>
                </div>
                <div className={`navbar-screen ${this.state.isNavbarOpen ? 'screen-open' : ''}`} onClick={this.closemainNavbar}></div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        usersData: state.userReducer

    }
}

const mapDispatchToProps = {
    showModal,
    logout,
    resetTrip
}

export const MainNavBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MainNavBar));