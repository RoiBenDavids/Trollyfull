import React from 'react'
import { utils } from '../../services/utils'
import { RouteTimeLinePreview } from './RouteTimeLinePreview'

// export function RouteTimeLine({ trip, changeOrder,onAddDestination }) {
export class RouteTimeLine extends React.Component {
    state = {
        addDestination: false,
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

    render() {
        return (
            <div className="time-line-container">

                <div className="route-time-line">
                    {this.props.trip.destinations.map((destination, idx) => {
                        return (
                            <RouteTimeLinePreview
                                key={utils.makeId()}
                                destination={destination}
                                idx={idx}
                                isLast={(idx + 1) === this.props.trip.destinations.length ? true : false}
                                changeOrder={this.props.changeOrder}
                            />)
                    })}
                    <i class="fas fa-plus-circle add-destination-button" onClick={this.onAddDestination}></i>
                    {this.state.addDestination && <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Enter destination"
                            className="styled-input"
                            name="name"
                            value={this.state.destinationName}
                            onChange={this.handleChange}
                        ></input>
                        <input
                            type="number"
                            placeholder="Number of days"
                            className="styled-input"
                            name="days"
                            value={this.state.destinationName}
                            onChange={this.handleChange}
                        ></input>
                        <button>Add!</button>
                    </form>}
                </div>
            </div>
        )
    }

}
