import React from 'react'
import { utils } from '../../services/utils'
// var gFreeDays = 14
export function DestNamePrev({ dest, updateFreeDays, freeDays, idx }) {

    // dest.duration = (dest.isSameEndDay || dest.isSameStartDay) ? dest.duration * 2 - 1 : dest.duration * 2
    // if (gFreeDays < dest.duration ) dest.duration = gFreeDays
    // console.log("gFreeDays", gFreeDays)
    // gFreeDays -= dest.duration
    // updateFreeDays(freeDays)

    return (

        <div className={`dest-name-preview dest-${idx} `} style={{ gridColumn: `span ${dest.duration}` }}>
            {dest.name}
        </div>
    )
}
