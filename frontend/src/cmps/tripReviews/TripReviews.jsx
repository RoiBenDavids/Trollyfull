import React, { Component } from 'react'
import { connect } from 'react-redux'

import { utils } from '../../services/utils'
import { TripPreview } from '../Home/TripPreview'
import { Link, withRouter } from 'react-router-dom'
import { ReviewList } from './ReviewList'
import { AddReview } from './AddReview'
import { reviewActions } from '../../store/actions/reviewActions'

class _TripReviews extends Component {

    state = {
        trip: '',
        isReviewOpen: false,
    }

    async componentDidMount() {
        console.log(this.props);
        const trip = this.props.props
        try {
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
        review.byUserId = this.props.loggedInUser._id
        review.trip = this.state.trip._id
        await reviewActions.addReview(review)
        await this.props.loadReviews({ toyId: this.state.toy._id })
    }

    render() {
        const { trip } = this.state
        if (!trip) return <p> Loading . . .</p>

        return (
            <div className="reviews-page">
                <TripPreview trip={trip} img={utils.getRandomPic()} style={{ pointerEvents: 'none' }} addClass={'review'}/>
                <ReviewList reviews={trip.reviews} />
                <div className="flex reviews-btns-container">
                    <button className="review-btns styled-button" onClick={this.onToggleExpend}>{this.state.isReviewOpen ? 'Close' : ' Add Review'}</button>
                    <button className="review-btns styled-button" onClick={() => { this.props.onToggleExpend(); this.props.history.push('/trip') }}>Back</button>
                </div>
                    <AddReview addReview={this.addReview} onToggleExpend={this.onToggleExpend} isReviewOpen={this.state.isReviewOpen}/>
                <Link to={`/trip/${trip._id}/triproute`}>
                    <button onClick={this.props.closeModal} className="styled-button">Explore this trip</button>
                </Link>
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
    loadReviews: reviewActions.loadReviews
}

export const TripReviews = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TripReviews))
