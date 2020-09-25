
import React from 'react'
import { useDrop } from 'react-dnd'
import { utils } from '../../services/utils'
import { ItemTypes } from '../../services/dndItems'
export function OpenDaySlot({ act, getRowIdx, onDragMove }) {

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.ACTIVITIE,
        drop: (item, monitor) => { 
            console.log(item, act, 'item, act');
            onDragMove(act, item.id) 
        },

        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    const rowIdx = null
    const isFirstCol = (act.col === 0) ? 'first-col' : ''
    const isDayHeadClass = (act.literalDay) ? 'literal-day' : ''
    const _isOver = (isOver) ? 'is-over' : ''
    if (isOver) {
        console.log(act);
    }
    return (
        <div ref={drop} className={`activity-prev-assembly empty-assembly ${isFirstCol} ${isDayHeadClass}  ${_isOver}`} style={{ gridRow: `${rowIdx || 'auto'}/span 1` }} key={utils.makeId()}>
            {act.literalDay && act.date}
        </div>
    )
}
