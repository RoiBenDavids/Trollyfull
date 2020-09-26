import React from 'react'

import { utils } from '../../services/utils'

export function RouteTimeLinePreview({ destination, idx, isLast, changeOrder ,updateDestinations}) {



    return (
        <React.Fragment>
         

            <div className="time-line-area flex align-center">
                <div className="time-line-icons flex column">
                    {<i className={`fas fa-chevron-circle-up  trips-pagination trips-pagination-forward ${idx === 0 ? 'visi-none' : ''}`} onClick={() =>updateDestinations(idx,idx-1)}></i>}
                    {<i className={`fas fa-chevron-circle-down  trips-pagination trips-pagination-forward ${isLast ? 'visi-none' : ''}`} onClick={() =>updateDestinations(idx,idx+1) }></i>}
                    <i className="far fa-calendar-times" onClick={() =>updateDestinations(idx,-1) }></i>
                </div>
                <div className="route-time-line-context flex align-center ">
                    <div className={`index-ball dest-${idx} flex align-center justify-center `} ><p>{idx + 1}</p></div>
                    <div>{destination.name}</div>
                    <div>{utils.calculateDays(destination.startDate, destination.endDate) - 1} Nights</div>
                </div>
            </div>
            { !isLast && <div className="line"></div>}
        </React.Fragment>
    )
}