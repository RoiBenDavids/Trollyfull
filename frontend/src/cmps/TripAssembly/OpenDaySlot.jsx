
import React from 'react'
import { useDrop } from 'react-dnd'
import { utils } from '../../services/utils'
import { ItemTypes } from '../../services/dndItems'
export function OpenDaySlot({ act, getRowIdx, onDragMove }) {

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.ACTIVITIE,
        drop: (item, monitor) => { onDragMove(act, item.id) },

        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    const rowIdx = getRowIdx(act.at)
    const isFirstCol = (act.col === 0) ? 'first-col' : ''
    const isDayHeadClass = (act.literalDay) ? 'literal-day' : ''
    const bgc = (isOver) ? 'blue' : 'inherit'
    if (isOver) {
        // console.log("act", act)
    }
    return (
        <div ref={drop} className={`activity-prev-assembly empty-assembly ${isFirstCol} ${isDayHeadClass}`} style={{ gridRow: `${rowIdx || 'auto'}/span 1`, backgroundColor: bgc }} key={utils.makeId()}>
            {act.literalDay && act.date}
        </div>
    )
}
