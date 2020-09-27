import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Router, Switch, withRouter } from 'react-router-dom'
import { loadTrip, addTrip, addTripFast, setTrip } from '../store/actions/tripActions'
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
import { MapContainer } from '../cmps/MainCmps/Map';
import { closeMsg, showMsg } from '../store/actions/msgActions'
import { ErrorMsg } from '../cmps/MainCmps/ErrorMsg'
import { eventBus } from '../services/eventBusService'
// import locationCevtorRed from 'https://res.cloudinary.com/roidinary/image/upload/v1600377967/locationVectorRed_vzufx4.png'

class _TripApp extends Component {

    state = {
        chatOpen: false,
        settingsOpen: false,
        isSocketSetup: false,
        trashOpen: false,
        markers: [],
        sideBar: false
    }

    async componentDidMount() {
        const { setTrip, loadTrip, addTrip } = this.props
        socketService.setup();
        // socketService.on('tripUpdated', setTrip);
        // socketService.on('tripUpdated', loadTrip);


        socketService.on('tripUpdated', addTrip);
        const { id } = this.props.match.params
        socketService.emit('enter trip', id);
        try {
            await loadTrip(id)
            if (this.props.match.params.openSignup === 'true') {
                this.props.showModal('signup', id)
            }
            const markers = this.getMarkersOfDests()
            this.setState({ isSocketSetup: true, markers })
        }
        catch (err) {
        }
        // socketService.emit('tripToUpdate', newTrip);

        // socketService.on('tripUpdated', setTrip);
    }

    getMarkersOfDests() {
        return this.props.trip.destinations.map(dest => {
            return { location: dest.location, name: dest.name }
        })

    }
    componentWillUnmount() {
        socketService.off('tripUpdated', this.props.addTrip);
    }

    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.trip === this.props.trip) return
        const markers = this.getMarkersOfDests()
        this.setState({ markers })
        // socketService.on('tripUpdated', addTrip);
        // socketService.on('tripUpdated', loadTrip);
        // socketService.on('tripUpdated', this.props.setTrip);

        // socketService.emit('tripUpdated', this.props.trip);
    }

    updateDestinations = async (destIdxToMove, moveToIdx) => {
        let destinations = [...this.props.trip.destinations]
        let activities = [...this.props.trip.activities]
        const moveDifference = utils.calculateDays(destinations[destIdxToMove].startDate, destinations[destIdxToMove].endDate)
        const destTomove = destinations.splice(destIdxToMove, 1)[0]
        const constant = (1000 * 60 * 60 * 24 * (moveDifference - 1))
        if (moveToIdx === -1) {
            activities = activities.reduce((acc, act, idx) => {
                if (act.destination === destTomove.name) return acc
                acc.push(act)
                return acc
            }, [])
            destinations.forEach((dest, idx) => {
                if (idx >= destIdxToMove) {
                    dest.startDate = dest.startDate - constant
                    dest.endDate = dest.endDate - constant
                    activities.forEach(act => {
                        if (act.destination === dest.name) act.at -= constant
                    })
                }
            })

        } else {
            if (destIdxToMove > moveToIdx) {
                const passDifference = utils.calculateDays(this.props.trip.destinations[moveToIdx].startDate, this.props.trip.destinations[destIdxToMove - 1].endDate)
                const constant2 = (1000 * 60 * 60 * 24 * (passDifference - 1))
                destTomove.startDate = destTomove.startDate - constant2;
                destTomove.endDate = destTomove.endDate - constant2;
                activities.forEach(act => {
                    if (act.destination === destTomove.name) act.at -= constant2
                })
                destinations.splice(moveToIdx, 0, destTomove)
                destinations.forEach((dest, idx) => {
                    if (idx > moveToIdx && idx <= destIdxToMove) {
                        dest.startDate = dest.startDate + constant
                        dest.endDate = dest.endDate + constant
                        activities.forEach(act => {
                            if (act.destination === dest.name) act.at += constant
                        })
                    }
                })
            } else {
                const passDifference = utils.calculateDays(this.props.trip.destinations[destIdxToMove + 1].startDate, this.props.trip.destinations[moveToIdx].endDate)
                const constant2 = (1000 * 60 * 60 * 24 * (passDifference - 1))
                destTomove.startDate = destTomove.startDate + constant2;
                destTomove.endDate = destTomove.endDate + constant2;
                activities.forEach(act => {
                    if (act.destination === destTomove.name) act.at += constant2
                })
                destinations.splice(moveToIdx, 0, destTomove)
                destinations.forEach((dest, idx) => {
                    if (idx < moveToIdx && idx >= destIdxToMove) {
                        dest.startDate = dest.startDate - constant
                        dest.endDate = dest.endDate - constant
                        activities.forEach(act => {
                            if (act.destination === dest.name) act.at -= constant
                        })
                    }
                })

            }
        }
        const newTrip = { ...this.props.trip, activities, destinations }
        await this.props.addTrip(newTrip)
        // socketService.emit('tripToUpdate', newTrip);
        socketService.emit('tripToUpdate', newTrip);

    }

    updateTripAct = async (activities) => {
        let _newTrip = { ...this.props.trip, activities }
        let newTrip = await this.props.addTrip(_newTrip)
        socketService.emit('tripToUpdate', newTrip);

    }

    toggleChat = () => {
        this.setState({ chatOpen: !this.state.chatOpen })
    }
    toggleSettings = () => {
        this.setState({ settingsOpen: !this.state.settingsOpen })
    }
    allowTrash = () => {
        this.setState({ trashOpen: true })
        setTimeout(() => {
            this.denyTrash()
        }, 3000)
    }
    denyTrash = () => {
        ;
        this.setState({ trashOpen: false })
    }
    getMarkers() {
        return this.props.trip.destinations.map(dest => {
            return { location: dest.location, name: dest.name }
        })
    }

    addDestination = async (newDest) => {
        const { destinations } = { ...this.props.trip }
        newDest.startDate = destinations[destinations.length - 1].endDate
        newDest.endDate = newDest.startDate + 1000 * 60 * 60 * 24 * (+newDest.days - 1)
        newDest.id = utils.makeId()
        newDest.location = { lat: 53.5511, lng: 9.9937 }
        destinations.push(newDest)
        const _newTrip = { ...this.props.trip, destinations }
        const newTrip = await this.props.addTrip(_newTrip)
        // const markers = this.getMarkersOfDests()
        // console.log(markers);
        // this.setState({ markers })

        socketService.emit('tripToUpdate', newTrip);
    }

    showDay = (day) => {
        const actToRender = this.props.trip.activities.reduce((acc, act) => {
            if (new Date(act.at).getDate() === day.day.getDate()) {
                acc.push(act)
            }
            return acc
        }, [])
        eventBus.emit('markDay', day)
    }

    openSideBar = () => {
        console.log('togglenuid');
        this.setState({ sideBar: !this.state.sideBar })
    }

    render() {
        const { trip } = this.props
        const sideBarClass = this.state.sideBar ? 'open-side-bar' : ''
        console.log(sideBarClass, 'add class');
        if (!trip) return <div>Loading....</div>
        return (
            <div className="trip-app  ">
                <ErrorMsg />
                <div className="trip-app-area flex ">
                    <button onClick={this.openSideBar} className={`side-bar-bars ${sideBarClass}`}><i class="fas fa-bars " ></i></button>
                    <div className={`trip-side-bar flex column ${sideBarClass} `}>
                        <TripRoute
                            trip={trip}
                            addDestination={this.addDestination}
                            updateDestinations={this.updateDestinations}
                            showModal={this.props.showModal}
                            toggleChat={this.toggleChat}
                            allowTrash={this.allowTrash}
                            trashOpen={this.state.trashOpen}
                            showDay={this.showDay}
                            openSideBar={this.openSideBar}
                        />
                    </div>
                    <div className="trip-app-main full">
                        {/* {this.state.markers[0] && <MapContainer markers={this.state.markers} />} */}
                        <TripAssembly
                            showMsg={this.props.showMsg}
                            closeMsg={this.props.closeMsg}
                            trip={trip} updateTripAct={this.updateTripAct}
                            showModal={this.props.showModal}
                            closeModal={this.props.closeModal}
                        />
                    </div>
                </div>
                {this.state.isSocketSetup && <Chat chatOpen={this.state.chatOpen} trip={trip} />}
            </div >
        )
    }
}


const mapStateToProps = state => {
    return {
        trip: state.tripReducer.currTrip
    }
}
const mapDispatchToProps = {
    loadTrip,
    showModal,
    closeModal,
    addTrip,
    showMsg,
    closeMsg,
    setTrip



}
export const TripApp = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TripApp))


