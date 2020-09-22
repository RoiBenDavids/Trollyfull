import React, { Component } from 'react'
import { connect } from 'react-redux'

import { utils } from '../services/utils'
import { TripPreview } from '../cmps/Home/TripPreview'
import { Link, withRouter } from 'react-router-dom'
import { ReviewList } from '../cmps/tripReviews/ReviewList'
import { reviewActions } from '../store/actions/reviewActions'
import { loadTrip } from '../store/actions/tripActions'
import { showModal } from '../store/actions/modalActions'

class _TripDetails extends Component {

    state = {
        trip: '',
        isReviewOpen: false,
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        try {
            const trip = await this.props.loadTrip(id)
            await this.setState({ trip })
            await this.props.loadReviews({ tripId: this.state.trip._id })
        }
        catch (err) {
        }
    }

    onToggleExpend = () => {
        this.setState({ isReviewOpen: true })
    }


    addReview = async (review) => {
        // review.byUserId = this.props.loggedInUser._id
        console.log(this.state.trip);
        review.aboutTrip = this.state.trip._id
        await reviewActions.addReview(review)
        await this.props.loadReviews({ tripId: this.state.trip._id })
    }

    render() {
        const { trip } = this.state
        if (!trip) return <p> Loading . . .</p>
        const days = utils.calculateDays(trip.destinations[0].startDate, trip.destinations[trip.destinations.length - 1].endDate)


        return (
            <div className="trip-preview reviews-page">
                <div className="img-wraper">
                    <img src={utils.getRandomPic()} alt="" />
                </div>
                <h2>{days} days to {trip.destinations[0].name}</h2>
                <p>By: Moshe544</p>
                {/* <TripPreview trip={trip} img={utils.getRandomPic()} style={{ pointerEvents: 'none' }} addClass={'details'} /> */}
                <div className="addreview-container">
                    <Link to={`/trip/${trip._id}/triproute`}>
                        <button onClick={this.props.closeModal} className="styled-button">Explore this trip</button>
                    </Link>
                    <ReviewList reviews={this.props.reviews} />
                    <div className="flex reviews-btns-container">
                        <button className="review-btns styled-button" onClick={() => this.props.showModal('add-review', { addReview: this.addReview })}>Add Review</button>
                        <button className="review-btns styled-button" onClick={() => { this.props.history.push('/trip') }}>Back</button>
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
    addReview: reviewActions.addReview,
    loadReviews: reviewActions.loadReviews,
    loadTrip,
    showModal,
}

export const TripDetails = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TripDetails))
