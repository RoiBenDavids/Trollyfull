import { utils } from '../../services/utils'
import { DestNamePrev } from './DestNamePrev'
import React from 'react'


export function DestinationsHeader({ destinations }) {
    return (
        <div className="destinations-header">
            {destinations.map((dest, idx) => {
                return <DestNamePrev idx={idx} className="dest-0" key={utils.makeId()} dest={dest} />
            })}
        </div>
    )

}
