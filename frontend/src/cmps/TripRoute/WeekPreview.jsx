import React from 'react'
import { utils } from '../../services/utils'

export function WeekPreview({ dates,showDay }) {
    function hotDog(date) {
        if (!date.td) return
        const keys = Object.keys(date.td)
        return keys.map(key => {
            const className = `dest-${date.td[key]} ${key}`
            return <div key={utils.makeId()} className={className}></div>
        })

    }

    return (
        <tr key={utils.makeId()}>
            {dates.map((date, idx) => <td onClick={()=>showDay(date)} className={`${!date.td?'faded':''}`} key={utils.makeId()}>{new Date(date.day).getDate()}{hotDog(date)}</td>)}
        </tr>
    )

}
