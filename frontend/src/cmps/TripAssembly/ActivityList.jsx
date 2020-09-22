import React from 'react'
import { utils } from '../../services/utils'
import { ActivitiePreview } from './ActivitiePreview'


export function ActivityList({ day, getRowIdx, onRemoveAct, onEdit, destinations }) {
    return (
        <div className="day-list-assembly">

            {day.map((act) => {

                return <ActivitiePreview destinations={destinations} onEdit={onEdit} onRemoveAct={onRemoveAct} getRowIdx={getRowIdx} key={utils.makeId()} act={act} />
            })}
        </div>
    )
}
