import { withRouter } from 'react-router-dom'
import { utils } from '../../services/utils'
import { connect } from 'react-redux'

import { reviewActions } from '../../store/actions/reviewActions'

import React, { Component } from 'react'

class _TripPreview extends Component {

    async componentDidMount() {
        const reviews = await this.props.loadReviews({ tripId: this.props.trip._id })
        this.setState({ reviews })

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

    getReviewsAvg = () => {
        try {
            let reviwers;
            const rating = this.state.reviews.reduce((acc, currRev) => {
                reviwers++
                acc = acc + (+currRev.rating)
                return acc
            }, 0)
            return rating
        }
        catch (err) {
        }
    }

    render() {
        const { trip, img, addClass } = this.props
        if (!trip) return <p>Loading Trip . . .</p>
        const price = this.getTripPrice(trip.activities)
        const days = utils.calculateDays(trip.destinations[0].startDate, trip.destinations[trip.destinations.length - 1].endDate)
        const style = (this.props.style ? this.props.style : '')
        // const reviews = this.getReviewsAvg()
        // console.log(reviews);

        return (
            <div style={{ pointerEvents: (style.pointerEvents ? style.pointerEvents : 'inherit') }} onClick={this.handleClick} className={'trip-preview flex column ' + (addClass ? addClass : '')} >
                < div className="img-wraper" >
                    <img src={img} alt="" />
                </div>
                <div className="trip-preview-details">
                    <h3>{trip.destinations[0].name}</h3>
                    <p>{days} days</p>
                    <p>Price:  ${price}</p>
                    <div>
                        <img className="rating-star" src="https://res.cloudinary.com/idanrozen/image/upload/v1600689776/450716_preview_uyyiz1.png" alt="" />
                        {/* <p>{this.getReviewsAvg()}</p> */}
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



