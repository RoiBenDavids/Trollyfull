
import React from 'react'
import { utils } from '../../services/utils'

export function ActivitiePreview({ act, getRowIdx, onRemoveAct, onEdit }) {
    const startTime = utils.getTimeDayStr(act.at)
    const endTime = utils.getTimeDayStr(act.at + (+act.duration / 2) * 60 * 60 * 1000)
    const rowIdx = getRowIdx(act.at)
    const activitieClass = (act.duration) ? 'activitie-assembly' : 'empty-assembly'
    const isFirstCol = (act.col === 0) ? 'first-col' : ''
    const isDayHeadClass = (act.literalDay) ? 'literal-day' : ''

    return (
        <div className={`activitie-prev-assembly ${activitieClass} ${isDayHeadClass} ${isFirstCol}`} style={{ gridRow: `${rowIdx || 'auto'}/span ${act.duration}` }} key={utils.makeId()}>
            {act.duration && <h2>{act.name}</h2>}
            {act.date || ''}
            <p>{act.at && `${startTime}-${endTime}`}</p>
            <p>{act.destination}</p>
            {act.name && <button onClick={()=>{onEdit(act)}} className="edit-activitie styled-button">edit</button>}
            {act.name && <button onClick={()=>{onRemoveAct(act.id)}} className="delete-activitie styled-button">X</button>}
        </div>
    )
}
