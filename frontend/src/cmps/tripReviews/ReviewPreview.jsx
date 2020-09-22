
import React from 'react'
import { utils } from '../../services/utils';
import { LongTxt } from '../MainCmps/LongText';


export function ReviewPreview({ review }) {
    const rating = '⭐'.repeat(review.rating);
    

    function getStars() {
        let stars = [];
        for (let i = 0; i < review.rating; i++) {
            stars.push(<img className="rating-star" key={utils.makeId()} src="https://res.cloudinary.com/idanrozen/image/upload/v1600689776/450716_preview_uyyiz1.png" alt="" />)
        }
        for (let i = 0; i < 5 - review.rating; i++) {
            stars.push(<img className="rating-star" key={utils.makeId()} src="https://res.cloudinary.com/idanrozen/image/upload/v1600690459/450716_preview1_pvoieq.png" alt="" />)
        }
        return stars
    }


    const time = `${new Date(review.createdAt).getDate()}/${new Date(review.createdAt).getMonth() + 1}/${new Date(review.createdAt).getFullYear()}`
    return (
        < React.Fragment >
            <div className="review-details flex Justify-between">
                <div>{getStars()} </div>
                <p>{time}</p>
            </div>
            <h3>{review.name || 'Traveler'}</h3>
            {review.content && <LongTxt text={review.content} />}

        </React.Fragment >
    )
}
