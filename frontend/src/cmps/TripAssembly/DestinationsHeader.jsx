import { utils } from '../../services/utils'
import { DestNamePrev } from './DestNamePrev'
import React from 'react'


export function DestinationsHeader({ destinations, allDestinations, daysCount }) {
    // destinations.sort((dest1, dest2) => dest1.time.startDate - dest2.time.startDate)
    return (
        <div className="destinations-header" style={{gridTemplateColumns: `repeat(${daysCount*2}, minmax(25px, 1fr))`}}>
            {destinations.map((dest, idx) => {
                return <DestNamePrev destinations={allDestinations} idx={idx}  key={utils.makeId()} dest={dest} />
            })}
        </div>
    )

}
