import { utils } from '../../services/utils'
import { DestNamePrev } from './DestNamePrev'
import React from 'react'


export function DestinationsHeader({ destinations, allDestinations }) {
    destinations.sort((dest1, dest2) => dest1.time - dest2.time)
    return (
        <div className="destinations-header">
            {destinations.map((dest, idx) => {
                return <DestNamePrev destinations={allDestinations} idx={idx}  key={utils.makeId()} dest={dest} />
            })}
        </div>
    )

}
