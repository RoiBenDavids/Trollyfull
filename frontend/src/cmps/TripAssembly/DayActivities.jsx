import React from 'react'
import { utils } from '../../services/utils'
import { ActivitiePreview } from './ActivitiePreview'
import { OpenDaySlot } from './OpenDaySlot'

export function DayActivities({ day, getRowIdx, onRemoveAct, onEdit, destinations, onDragMove }) {
    return (
        <div className="day-list-assembly">

            {day.map((act, idx, day) => {
                
                if (act.id) {
                    if (act.col === 3) {
                    }
                    return <ActivitiePreview
                        destinations={destinations} onEdit={onEdit} onRemoveAct={onRemoveAct}
                        getRowIdx={getRowIdx} key={utils.makeId()} act={act} />
                } else {
                    if (act.pos && act.pos.j === 3) {

                    }
                    return <OpenDaySlot
                        destinations={destinations} onEdit={onEdit} onRemoveAct={onRemoveAct}
                        getRowIdx={getRowIdx} key={utils.makeId()} act={act} onDragMove={onDragMove} />
                }

            })}
        </div>
    )
}
