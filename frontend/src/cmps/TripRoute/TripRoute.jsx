// import { GoogleApiWrapper } from 'google-maps-react';
import React from 'react'
import { MapContainer } from '../MainCmps/Map';
import { RouteCalendar } from './RouteCalendar'
import { RouteTimeLine } from './RouteTimeLine'



export function TripRoute({ trip,changeOrder }) {
    function getMarkers(){
        return trip.destinations.map(dest=>{
            return {location:dest.location,name:dest.name}})
        
    }
    console.log(trip);

    return (
        <div className="trip-route flex justify-center align-center">
            <RouteTimeLine trip={trip} changeOrder={changeOrder} />

                <MapContainer markers={getMarkers()} />
                <RouteCalendar trip={trip} />
           
            {/* <img className="hot-balloon" src="https://res.cloudinary.com/roidinary/image/upload/v1600627563/Asset4_qt7ydl.png"></img> */}


        </div>
    )
}
