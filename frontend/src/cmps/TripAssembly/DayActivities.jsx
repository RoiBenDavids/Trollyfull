import React from 'react'
import { utils } from '../../services/utils'
import { ActivitiePreview } from './ActivitiePreview'
import { OpenDaySlot } from './OpenDaySlot'

export function DayActivities({ day, getRowIdx, onRemoveAct, onEdit, destinations, onDragMove }) {


    if (day[1].pos.j === 0) {
    }
    var isAfterActs = false;
    var currActsLength = 0
    return (
        <div className="day-list-assembly">

            {day.map((act, idx, day) => {
                if (act.id) {
                    isAfterActs = true
                    currActsLength += act.duration
                    return <ActivitiePreview
                        destinations={destinations} onEdit={onEdit} onRemoveAct={onRemoveAct}
                        getRowIdx={getRowIdx} key={utils.makeId()} act={act} />

                } else {
                    // if (isAfterActs) {s

                    //     day[idx].pos.i = day[idx].pos.i + currActsLength - 1



                    // }
                    return <OpenDaySlot
                        destinations={destinations} onEdit={onEdit} onRemoveAct={onRemoveAct}
                        getRowIdx={getRowIdx} key={utils.makeId()} act={act} onDragMove={onDragMove} />
                }

            })}
        </div>
    )
}
