import React from 'react'
import { utils } from '../../services/utils'

export class AddDestination extends React.Component {
    state = {
        addDestOpen: false,
        destination: {
            name: '',
            days: ''
        }
    }
    componentDidMount(){
        this.setState({destination:{
            name:'',
            days:'',
            location:utils.getRandomLatLng()
        }})
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
