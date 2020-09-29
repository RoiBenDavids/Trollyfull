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
        isReviewOpen: false,
    }

    async componentDidMount() {
        const trip =this.props.trip
        try {
            await this.props.loadReviews({ tripId: trip._id })
        }
        catch (err) {
        }
    }

    onToggleExpend = () => {
        this.setState({ isReviewOpen: !this.state.isReviewOpen})
    }


    addReview = async (review) => {
        review.trip = this.props.trip._id
        await reviewActions.addReview(review)
        await this.props.loadReviews({ tripId: this.props.trip._id })
        this.onToggleExpend()
    }

    render() {
        const { trip } = this.props
        if (!trip) return <p> Loading . . .</p>

        return (
            <div className="reviews-page">
                <ReviewList reviews={this.props.reviews} />
                <div className="flex reviews-btns-container">
                    <button className="review-btns styled-button" onClick={this.onToggleExpend}>{this.state.isReviewOpen ? 'Close' : ' Add Review'}</button>
                </div>
                    <AddReview addReview={this.addReview} msg={this.props.msg} showMsg={this.props.showMsg} closeMsg={this.props.closeMsg}  isReviewOpen={this.state.isReviewOpen}/>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.reviewReducer.reviews,
        trip: state.tripReducer.currTrip
    }
}

const mapDispatchToProps = {
    addReview: reviewActions.addReview,
    loadReviews: reviewActions.loadReviews
}

export const TripReviews = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TripReviews))
