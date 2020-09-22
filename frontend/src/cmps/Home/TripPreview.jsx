import { Link, withRouter } from 'react-router-dom'
import { utils } from '../../services/utils'

import React, { Component } from 'react'

class _TripPreview extends Component {

    componentDidMount() {
    }


    handleClick = () => {
        if (this.props.history.location.pathname === '/') {
            this.props.history.push(`/trip/${this.props.trip._id}/triproute`)
        }
        else {
            this.props.history.push(`/trip/${this.props.trip._id}`)
        }

    }

    getTripPrice = (activities) => {
        let price = activities.reduce((acc, currValue) => {
            acc = acc + currValue.price.amount
            return acc
        }, 0)
        return price
    }

    render() {
        const { trip, img, addClass } = this.props
        if (!trip) return <p>Loading Trip . . .</p>
        const price = this.getTripPrice(trip.activities)
        const days = utils.calculateDays(trip.destinations[0].startDate, trip.destinations[trip.destinations.length - 1].endDate)
        const style = (this.props.style ? this.props.style : '')

        return (
            <div style={{ pointerEvents: (style.pointerEvents ? style.pointerEvents : 'inherit') }} onClick={this.handleClick} className={'trip-preview flex column ' + (addClass ? addClass : '')} >
                < div className="img-wraper" >
                    <img src={img} alt="" />
                </div>
                <div className="trip-preview-details">
                    <h3>{trip.destinations[0].name}</h3>
                    <p>{days} days</p>
                    <p>Price:  ${price}</p>
                    <img className="rating-star" src="https://res.cloudinary.com/idanrozen/image/upload/v1600689776/450716_preview_uyyiz1.png" alt="" /> 
                </div>
            </div >
        )
    }
}



export const TripPreview = withRouter(_TripPreview)