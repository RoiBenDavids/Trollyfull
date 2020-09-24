
import React from 'react'
import { useDrag } from 'react-dnd'
import { utils } from '../../services/utils'
import {ItemTypes} from '../../services/dndItems.js'

export function ActivitiePreview({ act, getRowIdx, onRemoveAct, onEdit }) {

    const[{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.ACTIVITIE,
            id: act.id
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    

    // if (isOver) {
        
    // }
    const startTime = utils.getTimeDayStr(act.at)
    const endTime = utils.getTimeDayStr(act.at + (+act.duration / 2) * 60 * 60 * 1000)
    const isFirstCol = (act.col === 0) ? 'first-col' : ''
    const isDayHeadClass = (act.literalDay) ? 'literal-day' : ''
    // const opc = (isDragging)?'0.6':'1'
    const isDrag = (isDragging)?'is-drag':''
    const isLenOne = (act.duration === 1)?'len-one':''

    return (
        <div ref={drag} className={`activity-prev-assembly activity-assembly ${isLenOne} ${isDayHeadClass} ${isFirstCol} ${isDrag}`} style={{ gridRow: `${act.row || 'auto'}/span ${act.duration}`}} key={utils.makeId()}>
            <h2>{act.name}</h2>
            <p>{act.at && `${startTime}-${endTime}`}</p>
            <p>{act.destination}</p>
            <button onClick={()=>{onEdit(act)}} className="edit-activity styled-button">edit</button>
            <button onClick={()=>{onRemoveAct(act.id)}} className="delete-activity styled-button">X</button>
        </div>
    )
}
