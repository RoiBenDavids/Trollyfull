import React, { Component } from 'react'
import { utils } from '../../services/utils'
import { TripPreview } from './TripPreview'
import { connect } from 'react-redux';
import { loadTrips } from '../../store/actions/tripActions';


class _TripList extends Component {

    async componentDidMount() {
        if (!this.props.trips.length) {
            await this.props.loadTrips()
        }
    }
    render() {
        const { trips, addClass, showModal } = this.props
        if (!trips.length) return <p>Loading Trips . . . </p>
        return (
            <div className={'trip-list trips-container ' + (addClass ? addClass : '')}>

                {trips.length ? trips.map((trip, idx) =>
                    <TripPreview key={trip._id} trip={trip} showModal={showModal} addClass={addClass} img={utils.getRandomPic()} />
                ) :
                    <TripPreview key={trips._id} trip={trips} addClass={addClass} img={utils.getRandomPic()} />
                }


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

export const TripList = connect(mapStateToProps, mapDispatchToProps)(_TripList);