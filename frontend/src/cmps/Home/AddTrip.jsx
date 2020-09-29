import React, { Component } from 'react'
import { utils } from '../../services/utils'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addTrip } from '../../store/actions/tripActions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMsg } from '../MainCmps/ErrorMsg';
import { showMsg, closeMsg } from '../../store/actions/msgActions';
import { GooglePlaces } from '../MainCmps/GooglePlaces';
import {
    geocodeByAddress,
    // geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';


class _AddTrip extends Component {


    state = {
        tripName: '',
        currTrip: {
            name: '',
            location: { lat: null, lng: null },
            startDate: '',
            endDate: '',

        },
        destinations: '',
    }

    onSetDestinations = (ev) => {
        ev.preventDefault()
        const newtrip = this.state.currTrip
        newtrip.name = newtrip.name.toLowerCase()
        if (!newtrip.startDate && !newtrip.endDate) {
            newtrip.startDate = Date.now()
            newtrip.endDate = Date.now() + 1 * 1000 * 60 * 60 * 24
        }
        newtrip.startDate = (this.state.destinations.length && this.state.destinations[this.state.destinations.length - 1].endDate) || this.state.currTrip.startDate || Date.now()
        if (!this.state.currTrip.endDate) {
            newtrip.endDate = (newtrip.startDate)?newtrip.startDate+ 1 * 1000 * 60 * 60 * 24:Date.now()+ 1 * 1000 * 60 * 60 * 24
        }
        newtrip.id = utils.makeId()
        this.setState({
            destinations: [...this.state.destinations, newtrip],
            currTrip: {
                name: '',
                location: { lat: null, lng: null },
                startDate: '',
                endDate: '',
            }
        })
    }

    onSaveDestination = async (ev) => {
        ev.preventDefault();
        if (!this.state.destinations.length) {
            this.props.showMsg({ type: 'input', msg: 'At least one destination must be added' })
            return
        }
        const trip = {
            tripName: this.state.tripName,
            imgUrl: utils.getRandomPic(),
            activities: [],
            destinations: this.state.destinations
        }

        if (this.props.loggedInUser) {
            trip.members = [
                {
                    id: this.props.loggedInUser._id,
                    username: this.props.loggedInUser.username,
                    imgUrl: this.props.loggedInUser.imgUrl,
                }
            ]
        }

        else trip.members = []
        const newTrip = await this.props.addTrip(trip)
        this.props.history.push(`/trip/${newTrip._id}/tripRoute`)
    }

    // getRandomLatLng() {
    //     const LL = utils.getRandomLatLng()
    //     return LL
    // }


    handleAddress = (name) => {
        this.setState({ currTrip: { ...this.state.currTrip, name } })
    }

    handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0])
        this.setState({ currTrip: { ...this.state.currTrip, location: latlng, name: value } })
    }

    handleInput = (ev, name) => {
        let value;
        let targetName;
        if (ev.target && ev.target.name === 'tripName') {
            this.setState({ ...this.state, tripName: ev.target.value })
            return
        }
        if (ev.target) {
            value = ev.target.value;
            targetName = ev.target.name
        }
        else {

            value = new Date(ev).getTime();
            targetName = name
        }

        this.setState({ ...this.state, currTrip: { ...this.state.currTrip, [targetName]: value } })
    }


    formatDate = (date) => {
        return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`
    }
    render() {
        const startDate = (this.state.destinations.length && this.state.destinations[this.state.destinations.length - 1].endDate) ||
            Date.now()
        
        return (
            <div className="flex add-destination-form-wraper">
                <form className="flex column add-destination-form" onSubmit={this.onSetDestinations}>
                    <h3>Create your trip</h3>
                    <div className="flex column">
                        <input className="styled-input" type="text"
                            name="tripName"
                            placeholder="Enter Trip Name"
                            id="add-dest-name"
                            value={this.state.tripName}
                            required
                            autoComplete="off"
                            onChange={this.handleInput}
                        />
                    </div>
                    {/* <GooglePlaces
                        handleSelect={this.handleSelect}
                        handleAddress={this.handleAddress}
                        address={this.state.currTrip.name}
                        location={this.state.currTrip.location}
                    /> */}
                    <div className="flex column">
                        <input className="styled-input" type="text"
                            name="name"
                            placeholder="Enter City Name"
                            id="add-dest-city"
                            value={this.state.currTrip.name}
                            required
                            autocomplete="off"
                            onChange={this.handleInput}
                        />
                    </div>
                    <div className="flex">
                        <div className="flex column">
                            <label htmlFor="startdate-dest-input">Start</label>
                            <DatePicker
                                minDate={startDate}
                                id="startdate-dest-input"
                                name="startDate"
                                className="styled-input"
                                required
                                // selected={this.state.currTrip.startDate || Date.now()}
                                selected={this.state.destinations.length ? startDate : Date.now()}
                                onChange={date => { this.handleInput(date, 'startDate') }}
                            />
                        </div>
                        <div className="flex column">
                            <label htmlFor="enddate-dest-input">End </label>
                            <DatePicker
                                minDate={this.state.currTrip.startDate || Date.now()}
                                id="enddate-dest-input"
                                name="endDate"
                                className="styled-input"
                                required
                                selected={this.state.currTrip.endDate || Date.now()}
                                onChange={date => { this.handleInput(date, 'endDate') }}
                            />
                        </div>
                    </div>
                    <ErrorMsg />
                    <button className="styled-button" onSubmit={this.onSetDestinations}>Add destination</button>
                    {this.state.destinations.length ? <ol className="trip-list-add-form flex column">
                        {this.state.destinations.map(dest => <li key={utils.makeId()} className="flex justify-between">
                            <p>{dest.name}</p>
                            <div className="flex">
                                <p>{this.formatDate(dest.startDate)}</p> -
                                <p>{this.formatDate(dest.endDate)}</p>
                            </div>
                        </li>)}
                    </ol> : ''}
                    <button className="styled-button" onClick={this.onSaveDestination}>Ready To Plan!</button>
                </form>
                <div className="add-dest-img-wraper">
                    <img src="https://images.unsplash.com/photo-1484804959297-65e7c19d7c9f?ixlib=rb-1.2.1" alt="" />
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    addTrip,
    showMsg,
    closeMsg
}

export const AddTrip = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AddTrip));