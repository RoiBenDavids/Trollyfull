import React from 'react'
import { utils } from '../../services/utils'
// var gFreeDays = 14
export function DestNamePrev({ dest, updateFreeDays, freeDays, idx }) {

    // dest.duration = (dest.isSameEndDay || dest.isSameStartDay) ? dest.duration * 2 - 1 : dest.duration * 2
    // if (gFreeDays < dest.duration ) dest.duration = gFreeDays
    // gFreeDays -= dest.duration
    // updateFreeDays(freeDays)
    const display = (dest.duration)?'':'none'
    return (
        
        <div className={`dest-name-preview dest-${idx} `} style={{ gridColumn: `span ${dest.duration}`, display: display }}>
            {dest.name}
        </div>
    )
}
