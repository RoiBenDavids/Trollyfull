import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TripFilter } from '../cmps/Home/TripFilter';
import { TripList } from '../cmps/Home/TripList';
import { showModal } from '../store/actions/modalActions';
import { loadTrips } from '../store/actions/tripActions';


class _TripStock extends Component {
    state = {
        name: ''
    }

    componentDidMount() {
        this.props.loadTrips()
    }


    onsetFilter = (name) => {
        this.setState({ name })
    }

    getTripsForDisplay = () => {
        const tripList = this.props.trips.filter(trip => {
          return trip.destinations[0].name.includes(this.state.name)
        })
        return tripList
    }

    render() {
        const trips = this.getTripsForDisplay()
        return (
            <div>
                <h2>All Trips</h2>
                <TripFilter onsetFilter={this.onsetFilter} />
                <TripList showModal={this.props.showModal} trips={trips} />
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
    loadTrips,
    showModal
}

export const TripStock = connect(mapStateToProps, mapDispatchToProps)(_TripStock);