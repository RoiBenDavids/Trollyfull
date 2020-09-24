import { tripService } from "../../services/tripService"




export function loadTrip(tripId) {
    return async dispatch => {
        dispatch({ type: 'SET_LOADER' })
        var trip = await tripService.getById(tripId)
        dispatch({ type: 'SET_TRIP',trip })
        dispatch({ type: 'CLOSE_LOADER' })

    }
}

export function loadTrips() {
    return async dispatch => {
        dispatch({ type: 'SET_LOADER' })
        const trips = await tripService.query()
        dispatch({ type: 'SET_TRIPS', trips })
        dispatch({ type: 'CLOSE_LOADER' })
    }
}


export function addTripFast(newTrip) {
    return async dispatch => {
        try {
            const trip = await tripService.save(newTrip)
            dispatch({ type: 'EDIT_TRIP', newTrip })

            return trip
        }
        catch (err) {
            console.log('TripAction: Could not save trip', err);
        }
    }
}
export function addTrip(newTrip) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_LOADER' })
            const trip = await tripService.save(newTrip)
            dispatch({ type: 'EDIT_TRIP', trip })
            dispatch({ type: 'CLOSE_LOADER' })
            return trip
        }
        catch (err) {
            console.log('TripAction: Could not save trip', err);
        }
    }
}