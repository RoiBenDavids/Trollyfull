
import React from 'react'
import { useDrag } from 'react-dnd'
import { utils } from '../../services/utils'
import { ItemTypes } from '../../services/dndItems.js'

export function ActivitiePreview({ act, onRemoveAct, onEdit, destinations }) {

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.ACTIVITIE,
            id: act.id
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    function getIdx () {
       return destinations.findIndex(dest => act.destination === dest.name)
    }

    const startTime = utils.getTimeDayStr(act.at)
    const endTime = utils.getTimeDayStr(act.at + (+act.duration / 2) * 60 * 60 * 1000)
    const isFirstCol = (act.col === 0) ? 'first-col' : ''
    const isDayHeadClass = (act.literalDay) ? 'literal-day' : ''
    const isDrag = (isDragging) ? 'is-drag' : ''
    const isLenOne = (act.duration === 1) ? 'len-one' : ''
    const dest= getIdx()

    return (
        <div ref={drag} className={`activity-prev-assembly activity-assembly ${isLenOne} ${isDayHeadClass} ${isFirstCol} ${isDrag}`} style={{ gridRow: `${act.row + 1 || 'auto'}/span ${act.duration}` }} key={utils.makeId()}>
            <div className={'dest-color dest-'+dest}></div>
            <h5>{act.name}</h5>
            <div className="activity-assembly-details column">
                {/* <p>{act.at && `${startTime}-${endTime}`}</p> */}
                {/* <p>{act.destination}</p> */}
                {/* {act.price.amount ? <p>{act.price.currency}{act.price.amount}</p> : ''} */}
                <div className="activity-assembly-controls flex">
                    <button onClick={() => { onEdit(act) }} className="edit-activity "><i className="fas fa-edit"></i></button>
                    <button ><i className="fas fa-info"></i></button>
                    <button onClick={() => { onRemoveAct(act.id) }} className="delete-activity "><i className="fas fa-trash"></i></button>
                </div>
            </div>
        </div >
    )
}
