import React, { Component } from 'react'
import { utils } from '../../services/utils';

export class EditActivity extends Component {
    state = {
        activitie: {
            name: 'nice place',
            at: '',
            time: '',
            labels: ['relax'],
            duration: 1,
            notes: '',
            price: 0,
            destination: '',
            id: null
        },
        minTime: '',
        maxTime: ''
    }

    async componentDidMount() {
        const { act, destinations } = this.props.props
        let minTime;
        let maxTime;

        if (act) {
            const destIdx = destinations.findIndex(dest => dest.name === act.destination)
            minTime = utils.getIsoTime(destinations[destIdx].startDate)
            maxTime = utils.getIsoTime(destinations[destIdx].endDate)
            this.setState({ activitie: { ...act, price: act.price.amount, at: utils.getIsoTime(act.at), 
                        destination: act.destination }, minTime, maxTime })
        } else {

            minTime = utils.getIsoTime(destinations[0].startDate)
            maxTime = utils.getIsoTime(destinations[destinations.length - 1].endDate)

            await this.setState({activitie: {...this.state.activitie, destination: destinations[0].name}, minTime, maxTime })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { destinations } = this.props.props
        const { destination } = this.state.activitie
        if (prevState.activitie.destination === destination) return
        if (destination && !this.state.activitie.id) {
            const destIdx = destinations.findIndex(dest => dest.name === destination)
            const minTime = utils.getIsoTime(destinations[destIdx].startDate)
            const maxTime = utils.getIsoTime(destinations[destIdx].endDate)
            this.setState({ minTime, maxTime })
        }
    }


    handleChange = ({ target }) => {
        const field = target.name;
        let value = target.value;

        if (field === 'at') {
            let time = value.substring(value.length - 5)
            let hours = +time.split(':')[0]
            let minuets = +time.split(':')[1]
            if (minuets <= 15) {
                minuets = 0
            } else if (minuets >= 45) {
                minuets = 0
                hours += 1
            } else {
                minuets = 30
            }
            if (hours >= 0 && hours < 7) {
                alert('Please choose events between 7:00 AM and 11:30 PM')
                return
            }
            minuets = ((minuets + '').length === 1) ? ('0' + minuets) : (minuets + '')
            hours = ((hours + '').length === 1) ? ('0' + hours) : (hours + '')
            value = value.substring(0, value.length - 5) + `${hours}:${minuets}`
        }

        if (target.type === 'checkbox') this.setState({ [field]: target.checked });
        else if (target.type === 'number') this.setState({ activitie: { ...this.state.activitie, [field]: +value } });
        else this.setState({ activitie: { ...this.state.activitie, [field]: value } });
    }

    onSaveAct = (ev) => {
        ev.preventDefault()
        var { saveAct, isOccTimeSlot } = this.props.props
        const { activitie } = this.state
        let datetime = new Date(activitie.at)
        activitie.at = datetime.getTime()
        if (isOccTimeSlot(activitie)) {
            alert('You aleardy have plans for that date! please choose a different one.')
            return
        }
        activitie.price = { amount: activitie.price, currency: '$' }
        saveAct(this.state.activitie)
    }


    render() {
        const { activitie, minTime, maxTime } = this.state
        const { destinations } = this.props.props
        return (
            <form className="edit-attraction flex column" onSubmit={this.onSaveAct}>
                <label htmlFor="name">Name</label>
                <input placeholder="name" name="name" id="name" value={this.state.activitie.name} onChange={this.handleChange}></input>
                <label htmlFor="dest-input">{(!activitie.id)?'Destination':activitie.destination}</label>
                {!activitie.id && <select value={this.state.activitie.destination} placeholder="destination" name="destination" id="dest-input" onChange={this.handleChange}>
                    <option value="" disabled selected>Select Destination</option>
                    {destinations.map((dest, idx) => {
                        return <option key={utils.makeId()} value={dest.name}>{dest.name}</option>

                    })}
                </select>}
                <label htmlFor="start-time-activity-input">Time</label>
                <input type="datetime-local" id="start-time-activity-input" min={minTime} max={maxTime} name="at"
                    onChange={this.handleChange} value={this.state.activitie.at}
                    required="required" id="date-activity-input" />
                <label htmlFor="duration">Duration</label>
                <input placeholder="duration" id="duration" type="number" name="duration" value={this.state.activitie.duration} onChange={this.handleChange}></input>
                <label htmlFor="notes">Notes</label>
                <textarea placeholder="notes" onChange={this.handleChange} name="notes" id="notes" value={this.state.activitie.notes} ></textarea>
                <label htmlFor="price" id="price">Price</label>
                <input type="number" placeholder="price" name="price" id="price" onChange={this.handleChange} placeholder="price" value={this.state.activitie.price}></input>
                <button className="styled-button" onClick={this.onSaveAct}>Save</button>
            </form>
        )
    }
}
