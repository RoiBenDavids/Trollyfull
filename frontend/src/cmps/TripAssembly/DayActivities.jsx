import React from 'react'
import { utils } from '../../services/utils'
import { ActivitiePreview } from './ActivitiePreview'
import { OpenDaySlot } from './OpenDaySlot'

export function DayActivities({ day, getRowIdx, onRemoveAct, onEdit, destinations, onDragMove, onOpenDetails }) {

    function reCalcPos(day) {
        let newDay = []
        let i = 0;
        while (i < 35) {
            if (!day[i].id) {
                newDay.push(day[i])
                i++

            } else {
                newDay.push(day[i])
                i += day[i].duration
            }
        }
        return newDay
    }
    let newDay = reCalcPos(day)

   
    return (
        <div className="day-list-assembly">
            {newDay.map((act) => {
                if (act.id) {
                    return <ActivitiePreview
                        destinations={destinations} onEdit={onEdit} onRemoveAct={onRemoveAct}
                        getRowIdx={getRowIdx} key={utils.makeId()} act={act} onOpenDetails={onOpenDetails} />

                } else {
                    return <OpenDaySlot
                        destinations={destinations} onEdit={onEdit} onRemoveAct={onRemoveAct}
                        getRowIdx={getRowIdx} key={utils.makeId()} act={act} onDragMove={onDragMove} />
                }
            })}
        </div>
    )
}
