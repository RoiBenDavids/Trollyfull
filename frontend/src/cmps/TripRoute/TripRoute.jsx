// import { GoogleApiWrapper } from 'google-maps-react';
import React from 'react'
import { utils } from '../../services/utils';
import { MapContainer } from '../MainCmps/Map';
import { MembersPreview } from '../TripApp/MemberPreview';
import { RouteCalendar } from './RouteCalendar'
import { RouteTimeLine } from './RouteTimeLine'

export class TripRoute extends React.Component {
    state = {
        addDestOpen: false,
        destination: {
            name: '',
            days: 0
        }
    }
    onAddDestination = () => {
        this.setState({ addDestination: !this.state.addDestination })
    }

    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ destination: { ...this.state.destination, [name]: value } })

    }
    onSubmit = (ev) => {
        ev.preventDefault()
        this.props.addDestination(this.state.destination)

    }
    toggleAddDestination=()=>{
        this.setState({addDestOpen:!this.state.addDestOpen})
    }


    render() {
        return (
            <div className="trip-route flex column">
                <div className="members-preview flex justify-between">
                    {this.props.trip.members.map((member, idx) => <MembersPreview key={idx} member={member} />)}
                    <button className="ustyled-button add-user-btn" onClick={() => this.props.showModal('add-member', this.props.trip._id)}><i className="fas fa-user-plus "></i></button>
                </div>
                <RouteCalendar trip={this.props.trip} />
                <RouteTimeLine trip={this.props.trip} updateDestinations={this.props.updateDestinations} />
                {this.state.addDestOpen &&
                    <form onSubmit={this.onSubmit} className={`add-destination-form`}>
                        <input
                            type="text"
                            placeholder="Enter destination"
                            className="styled-input"
                            name="name"
                            value={this.state.destination.name}
                            onChange={this.handleChange}
                        ></input>
                        <input
                            type="number"
                            placeholder="Number of days"
                            className="styled-input"
                            name="days"
                            value={this.state.destination.days}
                            onChange={this.handleChange}
                        ></input>
                        <button>Add!</button>
                    </form>}
                <div className="trip-bar-icons flex justify-between">
                    <i className="fas fa-plus add-destination-button" onClick={this.toggleAddDestination}></i>
                    <i className="fas fa-comments" onClick={this.props.toggleChat} ></i>
                </div>

            </div>
        )

    }

}
