import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Router, Switch, withRouter } from 'react-router-dom'
import { loadTrip, addTrip } from '../store/actions/tripActions'
import { closeModal, showModal } from '../store/actions/modalActions'
// import { TripRoute } from '../cmps/TripRoute'
import { tripService } from '.././services/tripService'
import { TripAssembly } from '../cmps/TripAssembly/TripAssembly'
import { TripNavBar } from '../cmps/TripApp/TripNavBar'
import { TripRoute } from '../cmps/TripRoute/TripRoute'
import { utils } from '../services/utils'
import { logDOM } from '@testing-library/react'
import { Chat } from '../cmps/TripApp/Chat'
import { socketService } from '../services/socketService'
// import locationCevtorRed from 'https://res.cloudinary.com/roidinary/image/upload/v1600377967/locationVectorRed_vzufx4.png'


class _TripApp extends Component {

    state = {
        trip: '',
        chatOpen: false,
        settingsOpen: false
    }

    async componentDidMount() {
        socketService.setup();
        // socketService.on('tripUpdated', this.loadTrip());
  

        const { id } = this.props.match.params
        try {
            const trip = await this.props.loadTrip(id)
            if(this.props.match.params.openSignup==='true'){
                this.props.showModal('signup',id)
            }
            this.setState({ trip })
        }
        catch (err) {
        }
    }

    componentWillUnmount() {
        // socketService.off('tripUpdated', this.loadTrip());
    }

    async componentDidUpdate(prevProps,prevState){
        if(prevProps!==this.props){
            const trip = await this.props.loadTrip(this.props.match.params.id)
            this.setState({ trip })
        }

        
    }
    changeDates(newTrip, direction, newDest, by) {
        const constant = 1000 * 60 * 60 * 24 * (by - 1)
        if (direction) {
            newDest.startDate -= (constant)
            newDest.endDate -= (constant)
            if (newTrip.activities) {
                newTrip.activities = newTrip.activities.map(act => {
                    if (act.destination === newDest.name) act.at -= constant
                    return act
                })
            }
        } else {
            newDest.startDate += (constant)
            newDest.endDate += (constant)
            if (newTrip.activities) {
                newTrip.activities = newTrip.activities.map((act, idx) => {
                    if (act.destination === newDest.name) act.at += constant
                    return act
                })
            }
        }
        if (!newTrip) return { newDest }
        return { newDest, newTrip }
    }


    swapDestinations(dests, newTrip) {
        const swapped = []
        const temp = { ...newTrip }
        const ans = this.changeDates(temp, false, dests[0], utils.calculateDays(dests[1].startDate, dests[1].endDate))
        swapped.push(ans.newDest)
        const ans2 = this.changeDates(ans.newTrip, true, dests[1], utils.calculateDays(dests[0].startDate, dests[0].endDate))
        swapped.unshift(ans2.newDest)
        return { swapped, newTrip: ans2.newTrip }
    }

    changeOrder = (dest, direction) => {
        const destinations = [...this.state.trip.destinations]
        if (direction) {
            const destinationsToSwap = destinations.splice(dest - 1, 2)
            const ans = this.swapDestinations(destinationsToSwap, this.state.trip)
            ans.newTrip.destinations[dest - 1] = ans.swapped[0]
            ans.newTrip.destinations[dest] = ans.swapped[1]
            this.setState({ trip: ans.newTrip })
            this.props.addTrip(ans.newTrip)

        }
        else {
            const destinationsToSwap = destinations.splice(dest, 2)
            const ans2 = this.swapDestinations(destinationsToSwap, this.state.trip)
            ans2.newTrip.destinations[dest] = ans2.swapped[0]
            ans2.newTrip.destinations[dest + 1] = ans2.swapped[1]
            this.setState({ trip: ans2.newTrip })
            this.props.addTrip(ans2.newTrip)
        }
    }

    updateTripAct = (activities) => {
        let newTrip = { ...this.state.trip, activities }
        this.setState({ trip: newTrip }, () => {
            this.props.addTrip(newTrip)
            // socketService.emit('tripToUpdate', this.state.trip);
        })
    }

    toggleChat = () => {
        this.setState({ chatOpen: !this.state.chatOpen })
    }
    toggleSettings = () => {
        this.setState({ settingsOpen: !this.state.settingsOpen })
    }

    render() {
        const { trip } = this.state
        if (!trip) return <div>Loading....</div>
        return (
            <div className="trip-app main-container ">
                <Switch>
                    <Route path="/trip/:id/triproute">
                        <img className="trip-main-img full" src={this.state.trip.imgUrl}></img>
                        <TripNavBar trip={trip} settingsOpen={this.state.settingsOpen} toggleSettings={this.toggleSettings} />
                        <TripRoute trip={trip} changeOrder={this.changeOrder}></TripRoute>
                    </Route>
                    <Route path="/trip/:id/tripassembly">
                        <TripNavBar trip={trip} settingsOpen={this.state.settingsOpen} toggleSettings={this.toggleSettings} />
                        <TripAssembly trip={trip} updateTripAct={this.updateTripAct} showModal={this.props.showModal} closeModal={this.props.closeModal}></TripAssembly>
                    </Route>
                </Switch>
                <Chat chatOpen={this.state.chatOpen} trip={this.state.trip} />
                <button className="chat-button styled-button" onClick={this.toggleChat}>C</button>
            </div >
        )
    }
}


const mapStateToProps = state => {
    return {
        trips: state.tripReducer.trips
    }
}
const mapDispatchToProps = {
    loadTrip,
    showModal,
    closeModal,
    addTrip
}
export const TripApp = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TripApp))