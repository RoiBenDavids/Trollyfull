import React from 'react'
import { utils } from '../../services/utils'

export function DayTimeLine() {


    return (
        <div className="time-line-assembly">

            {(function () {
                let times = []
                for (let i = 0; i < 35; i++) {
                    let time = <div key={utils.makeId()} className="time-assembly">
                        {(i % 2 === 0) && <span>{`${7 + i / 2}:00`}</span>}
                    </div>
                    times.push(time)
                }
                return times

            })()}
        </div>
    )
}
