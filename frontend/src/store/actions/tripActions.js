import { tripService } from "../../services/tripService"

export function loadTrip(tripId, flag) {
    return async dispatch => {
        try {
            let trip = {}
            if (flag) {
                dispatch({ type: 'SET_LOADER' })
                trip = await new Promise((resolve, reject) => {
                    setTimeout(async () => {
                        var tripLoad = await tripService.getById(tripId)
                        resolve(tripLoad)
                    }, 3500)
                })
                dispatch({ type: 'SET_TRIP', trip })
            }
            else {
                trip = await tripService.getById(tripId)
                dispatch({ type: 'SET_TRIP', trip })
            }
            return trip
        } catch (err) {
            console.log(err);
        } finally {
            dispatch({ type: 'CLOSE_LOADER' })

        }

    }
}
export function setTrip(trip) {
    
    return async dispatch => {
        dispatch({ type: 'SET_LOADER' })
        dispatch({ type: 'SET_TRIP', trip })
        dispatch({ type: 'CLOSE_LOADER' })
        return trip

    }
}

export function resetTrip() {
    const trip = null
    return dispatch => {
        dispatch({ type: 'SET_TRIP', trip })
    }
}

export function loadTrips(filterBy) {
    return async dispatch => {
        const trips = await tripService.query(filterBy)
        dispatch({ type: 'SET_TRIPS', trips })
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
            
            const trip = await tripService.save(newTrip)
            // socketService.emit('tripToUpdate', trip);
            // socketService.emit('tripToUpdate', newTrip);
            dispatch({ type: 'EDIT_TRIP', trip })
            return trip
        }
        catch (err) {
        }
    }
}
export function removeTrip(tripId) {
    return async dispatch => {
        try {
            const trip = await tripService.remove(tripId)
            dispatch({ type: 'REMOVE_TRIP', trip })
            return trip
        }
        catch (err) {
        }
    }
}
