import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TripFilter } from '../cmps/Home/TripFilter';
import { TripList } from '../cmps/Home/TripList';
import { showModal } from '../store/actions/modalActions';
import { loadTrips } from '../store/actions/tripActions';


class _TripStock extends Component {
    state = {
        filterBy: {
            name: ''
        }
    }

    componentDidMount() {
        this.props.loadTrips(this.state.filterBy)
    }

    getMostOccDests = () => {
        const { trips } = this.props
        let destinations = [];
        trips.forEach(trip => {
            destinations = destinations.concat(trip.destinations)
        })

        const numOfOccMap = destinations.reduce((acc, dest) => {
            acc[dest.name] = (acc[dest.name]) ? acc[dest.name] + 1 : 1
            return acc
        }, {})
        
        let numOfOccArr = Object.entries(numOfOccMap)
        numOfOccArr.sort((dest1, dest2) => {
            return dest2[1] - dest1[1]
        })

        return numOfOccArr.slice(0, 5).map(destOcc => {
            let destName = destOcc[0][0].toLocaleUpperCase() + destOcc[0].substring(1)
            return destName
        })
    }

    // renderSrcOpt = () => {

    // }

    handleInput = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            this.props.loadTrips(this.state.filterBy)
        });
    }

    getTripsForDisplay = () => {
        const tripList = this.props.trips.filter(trip => {
            return trip.destinations[0].name.includes(this.state.name)
        })
        return tripList
    }

    render() {
        const trips = this.props.trips
        const mostOccDests = this.getMostOccDests()
        this.getMostOccDests()
        return (
            <div>
                <h2>All Trips</h2>
                <TripFilter mostOccDests={mostOccDests} handleInput={this.handleInput} onsetFilter={this.onsetFilter} />
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