import React from 'react'
import { useDrag } from 'react-dnd'

import { useDrop } from 'react-dnd'

import { ItemTypes } from '../../services/dndItems.js'
import { utils } from '../../services/utils'

export function RouteTimeLinePreview({ destination, idx, isLast, updateDestinations}) {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.DESTINATION,
            id: idx
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.DESTINATION,
        drop: (item, monitor) => {
            if(item.id===idx)return
            updateDestinations(item.id, idx)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })
    if(isDragging===true){
    }

    const _isOver = (isOver)?'is-dragging':''
    const letFire = isDragging? 'on':'';
    return (
        <React.Fragment>
            { <div className={`fire-ring ${letFire}`}></div>}
            <div ref={drop} className="time-line-area flex align-center">
                <div className="route-time-line-context flex align-center ">
                    <div ref={drag} className={`index-ball dest-${idx} flex align-center justify-center  ${_isOver} `} ><p>{idx + 1}</p></div>
                    <div className="time-line-text">
                        <p>{destination.name}</p>
                        <p>{utils.calculateDays(destination.startDate, destination.endDate) - 1} Nights</p>
                    </div>
                </div>
            </div>
            { !isLast && <div className="line"></div>}
        </React.Fragment>
    )
}