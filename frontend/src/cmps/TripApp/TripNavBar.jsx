import React from 'react'
import { NavLink } from 'react-router-dom'
import { TripSettings } from './TripSettings'


export function TripNavBar({ tripId, settingsOpen,toggleSettings }) {
    return (
        <div className="trip-navbar flex align-center full styled-header">
            <div className="trip-routes flex justify-center">
                <NavLink to={`/trip/${tripId}/triproute`}>Route</NavLink>
                <NavLink to={`/trip/${tripId}/tripassembly`}>Assembly</NavLink>
            </div>
            <a className='see' onClick={toggleSettings}>settings</a>
            <TripSettings settingsOpen={settingsOpen} tripId={tripId}/>
        </div>
    )
}
