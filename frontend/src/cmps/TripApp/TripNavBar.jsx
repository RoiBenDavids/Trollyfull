import React from 'react'
import { NavLink } from 'react-router-dom'
import { MembersPreview } from './MemberPreview'
import { TripSettings } from './TripSettings'



export function TripNavBar({ trip, settingsOpen, toggleSettings }) {
    return (
        <div className="trip-navbar flex align-center justify-center full styled-header">
            <div className="members-preview flex">
                {trip.members.map(member=><MembersPreview member={member}/>)}
            </div>
            <div className="trip-routes flex justify-center">
                <NavLink to={`/trip/${trip.tripId}/triproute`}>Route</NavLink>
                <NavLink to={`/trip/${trip.tripId}/tripassembly`}>Assembly</NavLink>
            </div>
            <a className='see' onClick={toggleSettings}>settings</a>
            <TripSettings settingsOpen={settingsOpen} />
        </div>
    )
}
