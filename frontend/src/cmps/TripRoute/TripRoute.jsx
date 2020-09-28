// import { GoogleApiWrapper } from 'google-maps-react';
import React from 'react'
import { useDrop } from 'react-dnd'

import { ItemTypes } from '../../services/dndItems.js'
import { MembersPreview } from '../TripApp/MemberPreview';
import { AddDestination } from './AddDestiantion';
import { RouteCalendar } from './RouteCalendar'
import { RouteTimeLine } from './RouteTimeLine'

export function TripRoute({ trip, updateDestinations, showModal, addDestination, toggleChat,  showDay ,setDestsMarkers}) {
    const [{isOn}, drop] = useDrop({
        accept: ItemTypes.DESTINATION,
        drop: (item, monitor) => {
            updateDestinations(item.id, -1)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })
    return (
        <div className="trip-route flex column">
            <div className="members-preview flex justify-between align-center">
                {trip.members.map((member, idx) => <MembersPreview key={idx} member={member} />)}
                <button className="ustyled-button add-user-btn" onClick={() => showModal('add-member', trip._id)}><i className="fas fa-user-plus "></i></button>
            </div>
            <RouteCalendar trip={trip} showDay={showDay} />
            <div className="all-destinations-area">
                <div className="trip-bar-icons trip-bar-destinations-icons flex justify-between">
                    <AddDestination addDestination={addDestination} />
                    <i ref={drop} className={`fas fa-trash `}></i>
                    <i className="fas fa-map-marked-alt" onClick={setDestsMarkers}></i>

                </div>
                <RouteTimeLine trip={trip} updateDestinations={updateDestinations}  />
            </div>
            <div className="trip-bar-icons flex justify-between flex1 align-end">
                <img onClick={()=>showModal('trip-reviews')} className="reviews-btn" src="https://res.cloudinary.com/idanrozen/image/upload/v1601286406/6719970451595452853_wdwgqc.svg" alt=""/>
                <i className="fas fa-comments" onClick={toggleChat} ></i>
            </div>

        </div>
    )


}
