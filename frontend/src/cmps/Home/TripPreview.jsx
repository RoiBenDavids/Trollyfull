import { withRouter } from 'react-router-dom'
import { utils } from '../../services/utils'
import { connect } from 'react-redux'

import { reviewActions } from '../../store/actions/reviewActions'

import React, { Component } from 'react'

class _TripPreview extends Component {

    async componentDidMount() {
        // const reviews = await this.props.loadReviews({ tripId: this.props.trip._id })
        // if (!reviews) reviews = []
        // this.setState({ reviews })

    }


    handleClick = () => {
        this.props.history.push(`/trip/${this.props.trip._id}/triproute`)
    }

    getTripPrice = (activities) => {
        let price = activities.reduce((acc, currValue) => {
            acc = acc + currValue.price.amount
            return acc
        }, 0)
        return price
    }

    getReviewsAvg = () => {
        try {
            const rating = this.state.reviews.reduce((acc, currRev) => {
                if (this.state.reviews.length) acc = acc + (+currRev.rating)
                else acc = 0
                return acc
            }, 0)
            return rating ? (rating / this.state.reviews.length).toFixed(1) : 0
        }
        catch (err) {
        }
    }

    render() {
        const { trip, addClass } = this.props
        if (!trip) return <p>Loading Trip . . .</p>
        const price = this.getTripPrice(trip.activities)
        const days = utils.calculateDays(trip.destinations[0].startDate, trip.destinations[trip.destinations.length - 1].endDate)
        const style = (this.props.style ? this.props.style : '')
        const reviews = this.getReviewsAvg()

        return (
            <div style={{ pointerEvents: (style.pointerEvents ? style.pointerEvents : 'inherit') }} onClick={this.handleClick} className={'trip-preview flex column ' + (addClass ? addClass : '')} >
                < div className="img-wraper" >
                    <img src={trip.imgUrl} alt="" />
                </div>
                <div className="trip-preview-details">
                    <h3>{trip.tripName}</h3>
                    <div className="flex details-container">
                        {trip.createdBy && < div className="flex align-center column img-container">
                            <img className="user-img" src={trip.createdBy.imgUrl} alt="user-img" />
                            <p> {trip.createdBy.username}</p>
                        </div>}
                        <div className="flex justify-between column">
                            <p><i className="fas fa-hourglass-half"></i>{days} days</p>
                            <p>Est Price: <i className="fas fa-dollar-sign"></i>{price}</p>
                            <div className="flex rating-star">
                                <img src="https://res.cloudinary.com/idanrozen/image/upload/v1600689776/450716_preview_uyyiz1.png" alt="" />
                                <div className="flex justify-between">
                                    {reviews ? <span>{reviews} <span>({this.state.reviews.length} reviews) </span></span> : '(0)'}
                                </div>

                            </div>
                            <p>{`Trollied by Roi and ${utils.getRandomInt(50, 220)} others`}</p>
                        </div>
                    </div>

                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.reviewReducer.reviews,
    }
}

const mapDispatchToProps = {
    loadReviews: reviewActions.loadReviews
}

export const TripPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TripPreview))



