import React from 'react'

import { utils } from '../../services/utils'

export function RouteTimeLinePreview({ destination, idx, isLast, changeOrder }) {



    return (
        <React.Fragment>
         

            <div className="time-line-area">
                <div className="icons">
                    {<i className={`fas fa-chevron-circle-up  trips-pagination trips-pagination-forward ${idx === 0 ? 'visi-none' : ''}`} onClick={() => changeOrder(idx, true)}></i>}
                    {<i className={`fas fa-chevron-circle-down  trips-pagination trips-pagination-forward ${isLast ? 'visi-none' : ''}`} onClick={() => changeOrder(idx, false)}></i>}
                </div>
                <div className="route-time-line-context flex align-center ">
                    <div className={`index-ball dest-${idx} flex align-center justify-center `} >{idx + 1}</div>
                    <div>{destination.name}</div>
                    <div>{utils.calculateDays(destination.startDate, destination.endDate) - 1} Nights</div>
                </div>
            </div>
            { !isLast && <div className="line"></div>}
        </React.Fragment>
    )
}