
import httpService from './httpService'

export const tripService = {
    query,
    getById,
    remove,
    save
}


const user = {
    _id: 'u101',
    fullName: 'Orly Amdadi',
    userName: 'orly@amdadi.com',
    password: 'tinkerbell',
    imgUrl: 'http://some-img',
}

async function query(filterBy={name:''}) {
    const queryStr = `?search=${filterBy.name}`;
    return httpService.get(`trip${queryStr}`);
    
}


async function getById(tripId) {
    return httpService.get(`trip/${tripId}`,tripId)

}

function remove(tripId) {
    return httpService.delete(`trip/${tripId}`)
}

function save(trip) {
    if (trip._id) {
        return httpService.put(`trip/${trip._id}`, trip)

    } else {
        return httpService.post('trip', trip)
    }
}