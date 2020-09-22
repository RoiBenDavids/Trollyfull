import React, { Component } from 'react'
import { utils } from '../../services/utils';

export class EditActivity extends Component {
    state = {
        activity: {
            name: 'nice place',
            at: '',
            time: '',
            labels: ['relax'],
            duration: 1,
            notes: '',
            price: '',
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
            this.setState({ activity: { ...act, price: act.price.amount, at: utils.getIsoTime(act.at), 
                        destination: act.destination }, minTime, maxTime })
        } else {

            minTime = utils.getIsoTime(destinations[0].startDate)
            maxTime = utils.getIsoTime(destinations[destinations.length - 1].endDate)

            await this.setState({activity: {...this.state.activity, destination: destinations[0].name}, minTime, maxTime })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { destinations } = this.props.props
        const { destination } = this.state.activity
        if (prevState.activity.destination === destination) return
        if (destination && !this.state.activity.id) {
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
            minuets = ((minuets + '').length === 1) ? ('0' + minuets) : (minuets + '')
            hours = ((hours + '').length === 1) ? ('0' + hours) : (hours + '')
            value = value.substring(0, value.length - 5) + `${hours}:${minuets}`
        }

        if (target.type === 'checkbox') this.setState({ [field]: target.checked });
        else if (target.type === 'number') this.setState({ activity: { ...this.state.activity, [field]: +value } });
        else this.setState({ activity: { ...this.state.activity, [field]: value } });
    }

    onSaveAct = (ev) => {
        ev.preventDefault()
        var { saveAct, isOccTimeSlot } = this.props.props
        const { activity } = this.state
        let datetime = new Date(activity.at)
        activity.at = datetime.getTime()
        if (isOccTimeSlot(activity)) {
            alert('You aleardy have plans for that date! please choose a different one.')
            return
        }
        activity.price = { amount: activity.price, currency: '$' }
        saveAct(this.state.activity)
    }


    render() {
        const { activity, minTime, maxTime } = this.state
        const { destinations } = this.props.props
        return (
            <form className="edit-attraction flex column" onSubmit={this.onSaveAct}>
                <label htmlFor="name">Name</label>
                <input placeholder="name" name="name" id="name" value={this.state.activity.name} onChange={this.handleChange}></input>
                <label htmlFor="dest-input">{(!activity.id)?'Destination':activity.destination}</label>
                {!activity.id && <select value={this.state.activity.destination} placeholder="destination" name="destination" id="dest-input" onChange={this.handleChange}>
                    <option value="" disabled selected>Select Destination</option>
                    {destinations.map((dest, idx) => {
                        return <option key={utils.makeId()} value={dest.name}>{dest.name}</option>

                    })}
                </select>}
                <label htmlFor="start-time-activity-input">Time</label>
                <input type="datetime-local" id="start-time-activity-input" min={minTime} max={maxTime} name="at"
                    onChange={this.handleChange} value={this.state.activity.at}
                    required="required" id="date-activity-input" />
                <label htmlFor="duration">Duration</label>
                <input placeholder="duration" id="duration" type="number" name="duration" value={this.state.activity.duration} onChange={this.handleChange}></input>
                <label htmlFor="notes">Notes</label>
                <textarea placeholder="notes" onChange={this.handleChange} name="notes" id="notes" value={this.state.activity.notes} ></textarea>
                <label htmlFor="price" id="price">Price</label>
                <input type="number" placeholder="price" name="price" id="price" onChange={this.handleChange} placeholder="price" value={this.state.activity.price}></input>
                <button className="styled-button" onClick={this.onSaveAct}>Save</button>
            </form>
        )
    }
}
