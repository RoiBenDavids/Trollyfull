// async function query(filterBy) {
//     // const queryParams
//     // return httpService.get('trip', filterBy)

//     // const queryStr = `?search=${filterBy.search}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&type=${filterBy.type}&inStock=${filterBy.inStock}
//     // `;
//     // return httpService.get(`trip${queryStr}`);
//     let tripsToReturn = await storageService.query('trips')
//     if (!tripsToReturn.length) {
//         tripsToReturn = await storageService.postAll('trips', trips)
//         console.log(tripsToReturn, 'query');
//     }
//     return Promise.resolve(tripsToReturn)
// }


// async function getById(tripId) {
//     const trip = await storageService.getById('trips', tripId)
//     return Promise.resolve(trip)
//     // return httpService.get(`trip/${tripId}`)

// }

// function remove(tripId) {
//     return storageService.remove('trips', tripId)
//     // return httpService.delete(`trip/${tripId}`)
// }

// function save(trip) {
//     if (trip._id) {
//         return storageService.put('trips', trip)
//         // return httpService.put(`trip/${trip._id}`, trip)

//     } else {
//         trip._id = utils.makeId()
//         return storageService.post('trips', trip)
//         // return httpService.post('trip', trip)
//     }
// }