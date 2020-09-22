import { ReviewPreview } from './ReviewPreview.jsx'
import React from 'react'


export function ReviewList({ reviews }) {
    return (
        <ul className="review-list flex column container">
            <h3>What people Saying about this trip: </h3>
            {(!reviews || !reviews.length)? 'No reviews have been written for this trip yet' : reviews.map((review) =>
                <li className="review flex column" key={review.id}>
                    <ReviewPreview key={review._id} review={review} />
                </li>

            )}
        </ul>
    )
}