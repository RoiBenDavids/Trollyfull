import React from 'react'

import { utils } from '../../services/utils'
import { RouteTimeLinePreview } from './RouteTimeLinePreview'

export function RouteTimeLine({ trip, updateDestinations,allowTrash }) {
    // export class RouteTimeLine extends React.Component {
    return (
        <div  className="route-time-line">
            {trip.destinations.map((destination, idx) => {
                return (
                    <RouteTimeLinePreview
                        key={utils.makeId()}
                        destination={destination}
                        idx={idx}
                        isLast={(idx + 1) === trip.destinations.length ? true : false}
                        updateDestinations={updateDestinations}
                        allowTrash={allowTrash}
                    />)
            })}
        </div>
    )

}
