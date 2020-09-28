const initialState = {
    trips: [],
    currTrip: null

}


export function tripReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TRIPS':
            return {
                ...state,
                trips: action.trips
            }
        case 'EDIT_TRIP':
            return {
                ...state, currTrip: { ...action.trip }, trips: state.trips.map(trip => {
                    if (action.trip._id === trip._id) return action.trip
                    return trip;
                })
            }
        case 'SET_TRIP':
            // console.log(state.currTrip);
            console.log("tripReducer -> action.trip", action.trip)
            console.log("tripReducer -> state", state)
            return {
                ...state,
                currTrip: { ...action.trip }
            }




        default:
            return state
    }
}