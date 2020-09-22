
import React from 'react'
import { utils } from '../../services/utils'

export function OpenDaySlot({ act, getRowIdx, onRemoveAct, onEdit }) {
    const startTime = utils.getTimeDayStr(act.at)
    const endTime = utils.getTimeDayStr(act.at + (+act.duration / 2) * 60 * 60 * 1000)
    const rowIdx = getRowIdx(act.at)
    const activitieClass = (act.duration) ? 'activitie-assembly' : 'empty-assembly'
    const isFirstCol = (act.col === 0) ? 'first-col' : ''
    const isDayHeadClass = (act.literalDay) ? 'literal-day' : ''

    return (
        <div className={`activitie-prev-assembly empty-assembly ${isFirstCol}`} style={{ gridRow: `${rowIdx || 'auto'}/span 1` }} key={utils.makeId()}>
            
        </div>
    )
}
