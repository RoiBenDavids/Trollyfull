import { utils } from '../../services/utils'
import { DestNamePrev } from './DestNamePrev'
import React from 'react'


export function DestinationsHeader({ destinations }) {
    destinations.sort((dest1, dest2) => dest1.time - dest2.time)
    console.log("DestinationsHeader -> destinations", destinations)
    return (
        <div className="destinations-header">
            {destinations.map((dest, idx) => {
                return <DestNamePrev idx={idx} className="dest-0" key={utils.makeId()} dest={dest} />
            })}
        </div>
    )

}
