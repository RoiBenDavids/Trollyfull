import { ReviewPreview } from './ReviewPreview.jsx'
import React from 'react'


export function ReviewList({ reviews }) {
    return (
        <ul className="review-list flex column container">
            {(!reviews || !reviews.length)? 'No reviews have been written for this trip yet' : reviews.map((review,idx) =>
                <li className="review flex column" key={idx}>
                    <ReviewPreview key={review._id} review={review} />
                </li>

            )}
        </ul>
    )
}