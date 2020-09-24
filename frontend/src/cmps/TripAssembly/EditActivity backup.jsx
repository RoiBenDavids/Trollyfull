import { act } from '@testing-library/react';
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
            this.setState({ activity: { ...act, price: act.price.amount, at: utils.getIsoTime(act.at), destination: act.destination }, minTime, maxTime })
        } else {

            minTime = utils.getIsoTime(destinations[0].startDate)
            maxTime = utils.getIsoTime(destinations[destinations.length - 1].endDate)

            await this.setState({ minTime, maxTime })
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

    getActivityTimeSlots = () => {
        let times = []
        for (let i = 0; i < 35; i++) {

            let value = (i % 2 === 0) ? `${7 + i / 2}:00` : `${7 + (i - 1) / 2}:30`
            let time = <option key={utils.makeId()} value={value}>
                {value}
            </option>
            times.push(time)
        }
        return times
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        if (target.type === 'checkbox') this.setState({ [field]: target.checked });
        else if (target.type === 'number') this.setState({ activity: { ...this.state.activity, [field]: +value } });
        else this.setState({ activity: { ...this.state.activity, [field]: value } });
    }

    onSaveAct = (ev) => {
        ev.preventDefault()
        var { saveAct } = this.props.props
        const { activity } = this.state
        let datetime = new Date(activity.at)
        activity.at = datetime.getTime()
        activity.price = { amount: activity.price, currency: '$' }
        saveAct(this.state.activity)
    }


    render() {
        const { activity, minTime, maxTime } = this.state
        // if (!activity.id) return <div>Loading...</div>
        return (
            <form className="edit-attraction flex column" onSubmit={this.onSaveAct}>
                <input placeholder="name" name="name" value={this.state.activity.name} onChange={this.handleChange}></input>
                {/* <input placeholder="destination" name="destination" id="dest-input" value={this.state.activity.destination} onChange={this.handleChange}></input> */}
                <label htmlFor="dest-input">destination</label>
                {!activity.id && <select required value={activity.destination} placeholder="destination" name="destination" id="dest-input" onChange={this.handleChange}>
                    <option value="" disabled selected>Select Destination</option>
                    {this.props.props.destinations.map((dest) => {
                        return <option key={utils.makeId()} value={dest.name}>{dest.name}</option>
                    })}
                </select>}

                <input type="datetime-local" step="1800000" min={minTime} max={maxTime} name="at"
                    onChange={this.handleChange} value={this.state.activity.at}
                    required="required" id="date-activity-input" />

                <label htmlFor="date-activity-input">date</label>
                <input type="date" name="date" onChange={this.handleChange} />

                <label htmlFor="start-time-activity-input">time</label>
                <select onChange={this.handleChange} name="time" id="">
                    {this.getActivityTimeSlots()}
                </select>
                
                {/* <input type="time" min="07:00" onChange={this.handleChange} max="24:00" step={`${30 * 60}`} name="time" value={this.state.activity.time} required id="start-time-activity-input" /> */}
                <input placeholder="duration" placeholder="duration" type="number" name="duration" value={this.state.activity.duration} onChange={this.handleChange}></input>
                <textarea placeholder="notes" onChange={this.handleChange} name="notes" value={this.state.activity.notes} ></textarea>
                <input type="number" placeholder="price" name="price" onChange={this.handleChange} placeholder="price" value={this.state.activity.price}></input>
                <button onClick={this.onSaveAct}>Save</button>
            </form>
        )
    }
}
