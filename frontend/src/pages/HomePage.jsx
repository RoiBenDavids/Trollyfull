import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddTrip } from '../cmps/Home/AddTrip';
import { TripSlider } from '../cmps/Home/TripSlider';
import { UserFlow } from '../cmps/Home/UserFlow';
import { loadTrips } from '../store/actions/tripActions'
import { HashLink as Link } from 'react-router-hash-link';



class _HomePage extends Component {
    state = {
        trips: ''
    }


    async componentDidMount() {
        await this.props.loadTrips()
    }

    // getTripsForDisplay = () => {
    //     this.props.trips.filter(trip=> trip)
    // }


    render() {
        if (!this.props.trips[0]) return <p> </p>
        return (

            <div className="home-page ">
                <div className="home-page-hero" >
                </div>

                    <UserFlow id="userFlow"/>
                <div className="main-container main-home-page">
                    <AddTrip />
                    <div className="description-section">
                        <h3>Explore planned trips of professional travelers
                            </h3>
                        <h3>and personalize them</h3>
                        <Link smooth to="#userFlow" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                            <button className="styled-button"> Get Started</button>
                        </Link>
                    </div>
                    <h2>Our top rated planned trips</h2>
                    <section className="slideShow" >
                        <TripSlider trips={this.props.trips.slice(0, 4)} />
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        trips: state.tripReducer.trips
    }
}

const mapDispatchToProps = {
    loadTrips
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);