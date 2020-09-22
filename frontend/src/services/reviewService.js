// import httpService from './httpService';
import { utils } from './utils';
import { storageService } from './asyncStorageService'


export const reviewService = {
    add,
    query,
    remove
};


async function query(filterBy) {

    if (filterBy) var queryStr = `?tripId=${filterBy.tripId}`;
    // return httpService.get(`review${queryStr}`);
    const reviews = await storageService.query(`review`);
    console.log(reviews);
    return reviews.filter(review => review.aboutTrip === filterBy.tripId)

}

function remove(reviewId) {
    return storageService.remove('review', reviewId);

    // return httpService.delete(`review/${reviewId}`);
}
async function add(review) {
    review.createdAt = Date.now()
    const addedReview = await storageService.post(`review`, review);
    console.log(addedReview);
    // const addedReview = await httpService.post(`review`, review);
    return addedReview
}
