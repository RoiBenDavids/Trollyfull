import { reviewService } from '../../services/reviewService';


export const reviewActions = {
    loadReviews,
    addReview
}

function loadReviews(tripId) {
    return async dispatch => {
        try {
            const reviews = await reviewService.query(tripId);
            console.log(reviews);
            dispatch({ type: 'SET_REVIEWS', reviews });
            return reviews

        } catch (err) {
            console.log('ReviewActions: err in loadReviews', err);
        }
    };
}

async function addReview(review) {
    console.log(review,"actionssssss");
    await reviewService.add(review)
    return async dispatch => {
        try {
            const addedReview = await reviewService.add(review);
            dispatch({ type: 'REVIEW_ADD', review: addedReview });
        }
        catch (err) {
            console.log('ReviewActions: err in addReview', err);
        }
    }
}
