import React from 'react'
import { utils } from '../../services/utils'
// var gFreeDays = 14
export function DestNamePrev({ dest, updateFreeDays, freeDays, destinations }) {
    
    const idx = destinations.findIndex(_dest => _dest.name === dest.name)
    const display = (dest.duration) ? '' : 'none'
    return (

        <div className={`dest-name-preview dest-head-${idx} `} style={{ gridColumn: `span ${dest.duration}`, display: display }}>
            {dest.name}
        </div>
    )
}
