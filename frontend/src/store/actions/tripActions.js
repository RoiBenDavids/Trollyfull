import { tripService } from "../../services/tripService"
import { socketService } from '../../services/socketService'




export function loadTrip(tripId) {
    return async dispatch => {
        dispatch({ type: 'SET_LOADER' })
        var trip = await tripService.getById(tripId)
        dispatch({ type: 'SET_TRIP', trip })
        dispatch({ type: 'CLOSE_LOADER' })
        return trip

    }
}
export function setTrip(trip) {
    console.log("setTrip -> trip", trip)
    return async dispatch => {
        dispatch({ type: 'SET_LOADER' })
        dispatch({ type: 'SET_TRIP', trip })
        dispatch({ type: 'CLOSE_LOADER' })
        return trip

    }
}

export function loadTrips(filterBy) {
    // console.log("loadTrips -> filterBy", filterBy)
    return async dispatch => {
        dispatch({ type: 'SET_LOADER' })
        const trips = await tripService.query(filterBy)
        dispatch({ type: 'SET_TRIPS', trips })
        dispatch({ type: 'CLOSE_LOADER' })
    }
}


export function addTripFast(trip) {
    return async dispatch => {
        try {
            dispatch({ type: 'EDIT_TRIP', trip })
            await tripService.save(trip)
        }

        catch (err) {
        }
    }
}

export function addTrip(newTrip) {
    return async dispatch => {
        try {
            // socketService.emit('tripToUpdate', newTrip);
            dispatch({ type: 'SET_LOADER' })
            const trip = await tripService.save(newTrip)
            dispatch({ type: 'EDIT_TRIP', trip })
            dispatch({ type: 'CLOSE_LOADER' })
            return trip
        }
        catch (err) {
        }
    }
}