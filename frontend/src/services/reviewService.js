import httpService from './httpService';
import { utils } from './utils';
import { storageService } from './asyncStorageService'


export const reviewService = {
    add,
    query,
    remove
};


async function query(filterBy) {

    if (filterBy) var queryStr = `?tripId=${filterBy.tripId}`;
    // const reviews = await storageService.query(`review`);
    // return reviews.filter(review => review.aboutTrip === filterBy.tripId)
    return httpService.get(`review${queryStr}`);

}

function remove(reviewId) {
    return httpService.delete(`review/${reviewId}`);
}
async function add(review) {
    review.createdAt = Date.now();
    const addedReview = await httpService.post(`review`, review);
    return addedReview
}
