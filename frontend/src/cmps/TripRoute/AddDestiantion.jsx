import React from 'react'
import { utils } from '../../services/utils'
import { GooglePlaces } from '../MainCmps/GooglePlaces'
import {
    geocodeByAddress,
    // geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

export class AddDestination extends React.Component {
    state = {
        addDestOpen: false,
        destination: {
            name: '',
            days: '',
            location: null
        }
    }
    componentDidMount() {
        this.setState({
            destination: {
                name: '',
                days: '',
                location: null
                // location: utils.getRandomLatLng()
            }
        })
    }

    // onAddDestination = () => {
    //     this.setState({ addDestination: !this.state.addDestination })
    // }

    handleAddress = (name) => {
        console.log(name);
        this.setState({ destination: { ...this.state.destination, name } }, console.log(this.state))
    }

    handleSelect = async (value) => {
        console.log(value);
        try {
            const results = await geocodeByAddress(value);
            const latlng = await getLatLng(results[0])
            this.setState({ destination: { ...this.state.destination, location: latlng, name: value } }, () => { console.log(this.state) })

        }
        catch (err) {
            console.log(err, 'err');
        }
    }

    handleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ destination: { ...this.state.destination, [name]: value } })

    }
    onSubmit = (ev) => {
        ev.preventDefault()
        this.toggleAddDestination()
        this.props.addDestination(this.state.destination)

    }
    toggleAddDestination = () => {
        this.setState({ addDestOpen: !this.state.addDestOpen })
    }

    render() {
        const addDestOpen = this.state.addDestOpen ? 'form-open' : ''
        return (
            <React.Fragment>
                <i className="fas fa-plus add-destination-button" onClick={this.toggleAddDestination}></i>
                <div className={`add-destination column ${addDestOpen}`}>
                    <div className="styled-header">Add destination</div>
                    <form onSubmit={this.onSubmit} className={`add-destination-form  `}>
                        <input
                            type="text"
                            placeholder="Enter destination"
                            // className="styled-input"
                            name="name"
                            value={this.state.destination.name}
                            onChange={this.handleChange}
                        ></input>
                        {/* <GooglePlaces
                            handleSelect={this.handleSelect}
                            handleAddress={this.handleAddress}
                            address={this.state.destination.name}
                            location={this.state.destination.location}
                        /> */}


                        <input
                            type="number"
                            placeholder="Number of days"
                            // className="styled-input"
                            name="days"
                            value={this.state.destination.days}
                            onChange={this.handleChange}
                        ></input>
                        <button className="styled-button">Add!</button>
                    </form>
                    <div className="add-destination-footer"></div>
                </div>
            </React.Fragment>
        )
    }



}
