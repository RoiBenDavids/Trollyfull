import React, { Component } from 'react'
import { utils } from '../../services/utils';
import { ErrorMsg } from '../MainCmps/ErrorMsg';

export class PrevEditActivity extends Component {
    state = {
        activitie: {
            name: '',
            at: '',
            time: '',
            labels: '',
            duration: '',
            notes: '',
            price: '',
            currency: '',
            destination: '',
            id: null
        },
        minTime: '',
        maxTime: '',
        isInputOpen: false
    }

    async componentDidMount() {
        console.log(this.props.props);
        const { act, destinations } = this.props.props
        let minTime;
        let maxTime;

        const destIdx = destinations.findIndex(dest => dest.name === act.destination)
        minTime = utils.getIsoTime(destinations[destIdx].startDate)
        maxTime = utils.getIsoTime(destinations[destIdx].endDate)
        this.setState({

            activitie: {
                ...act, name: act.name, currency: act.price.currency, price: act.price.amount, at: utils.getIsoTime(act.at),
                destination: act.destination
            }, minTime, maxTime
        }, () => console.log(this.state))
    }

    // componentDidUpdate(prevProps, prevState) {
    //     const { destinations } = this.props.props
    //     const { destination } = this.state.activitie
    //     if (prevState.activitie.destination === destination) return
    //     if (destination && !this.state.activitie.id) {
    //         const destIdx = destinations.findIndex(dest => dest.name === destination)
    //         const minTime = utils.getIsoTime(destinations[destIdx].startDate)
    //         const maxTime = utils.getIsoTime(destinations[destIdx].endDate)
    //         this.setState({ minTime, maxTime })
    //     }
    // }


    handleChange = (ev) => {
        const field = ev.target.name;
        let value = ev.target.value;
        console.log(field, value);

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
                this.props.showMsg({ type: 'input', msg: 'Please choose events between 7:00 AM and 11:30 PM' })
                return
            }
            minuets = ((minuets + '').length === 1) ? ('0' + minuets) : (minuets + '')
            hours = ((hours + '').length === 1) ? ('0' + hours) : (hours + '')
            value = value.substring(0, value.length - 5) + `${hours}:${minuets}`
            this.setState({ activitie: { ...this.state.activitie, [field]: value } });
        }

        else if (field === 'duration') this.setState({ activitie: { ...this.state.activitie, [field]: +value } });
        else this.setState({ activitie: { ...this.state.activitie, [field]: value } });
    }

    handleContentEditable = (ev) => {
        console.log(ev.target, 'contenteditable');
        const field = ev.currentTarget.dataset.name
        let value = ev.target.innerText
        if (field === 'price') this.setState({ activitie: { ...this.state.activitie, [field]: +value } });
        else this.setState({ activitie: { ...this.state.activitie, [field]: value } });

    }

    onSaveAct = (ev) => {
        ev.preventDefault()
        var { saveAct, isOccTimeSlot } = this.props.props
        const { activitie } = this.state
        let datetime = new Date(activitie.at)
        activitie.at = datetime.getTime()
        if (isOccTimeSlot(activitie)) {
            this.props.showMsg({ type: 'input', msg: 'You aleardy have plans for that date! please choose a different one.'})
            return
        }
        activitie.price = { amount: activitie.price, currency: '$' }
        saveAct(this.state.activitie)
    }



    render() {
        const { activitie, minTime, maxTime } = this.state
        const { destinations } = this.props.props
        console.log(destinations);
        const startTime = utils.getTimeDayStr(new Date(this.state.activitie.at).getTime())
        const endTime = utils.getTimeDayStr(new Date(this.state.activitie.at).getTime() + (this.state.activitie.duration / 2) * 60 * 60 * 1000)

        return (


            <form className="preview-activity-form flex column" >
                <h2 contentEditable={true} suppressContentEditableWarning={true} autoCorrect="off" data-name="name" onInput={this.handleContentEditable}>{this.state.activitie.name}</h2>
                <div className="flex">
                    <small>in: {this.state.activitie.destination}</small>
                    <small>{`${startTime}-${endTime}`} <i onClick={() => { this.setState({ isInputOpen: !this.state.isInputOpen }) }} className="fas fa-edit"></i></small>
                </div>

                <ErrorMsg />

                <div  className={`flex time-container ${this.state.isInputOpen ? 'openHeight': ''} `}>
                    <div className="flex column">
                        <h4 >Beginning time:</h4>
                        <input className="styled-input date" type="datetime-local" id="start-time-activity-input" min={minTime} max={maxTime} name="at"
                            onChange={this.handleChange} value={this.state.activitie.at}
                            required="required" id="date-activity-input" />
                    </div>
                    <div className="flex column">
                        <h4 >Duration (Half hours)</h4>
                        <input className="styled-input" placeholder="duration" id="duration" type="number" name="duration" value={this.state.activitie.duration} onChange={this.handleChange}></input>
                    </div>

                </div>

                <h4 htmlFor="notes">Notes</h4>
                <textarea placeholder="notes" onChange={this.handleChange} name="notes" id="notes" value={this.state.activitie.notes} ></textarea>
                <div className="flex">
                    <h4>Price:</h4>
                    <p>{this.state.activitie.currency}</p>
                    <p contentEditable={true} suppressContentEditableWarning={true} data-name="price" onBlur={this.handleContentEditable}>{this.state.activitie.price}</p>
                </div>
                <button className="styled-button" onClick={this.onSaveAct}>Save</button>
            </form >
        )
    }
}
