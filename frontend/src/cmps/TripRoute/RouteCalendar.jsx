import React from 'react'

import { utils } from '../../services/utils'
import { WeekPreview } from './WeekPreview'


export function RouteCalendar({ trip }) {

    function generateCalendar() {
        const tripStart = trip.destinations[0].startDate
        const tripEnd = trip.destinations[trip.destinations.length - 1].endDate
        const destinationsTimes = trip.destinations.map((destination,idx) => {
            return { start: new Date(destination.startDate), end: new Date(destination.endDate) , idx }
        })
        const calendarData = calculateDates(tripStart, tripEnd, destinationsTimes)
        const fullCalendarData = getDaysAround(calendarData, tripStart, tripEnd)
        return fullCalendarData
    }
    function getDaysAround(data, start, end) {
        let fullCalendarData = getFirstSunday(start, data)
        fullCalendarData = getLastSaturday(end, data)
        return fullCalendarData

    }

    function getFirstSunday(date, calendarData) {
        let currDay = new Date(date)
        while (currDay.getDay() > 0) {
            currDay = new Date(currDay.getTime() - (1000 * 60 * 60 * 24))
            calendarData.unshift({ day: currDay })
        }
        return calendarData

    }
    function getLastSaturday(date, calendarData) {
        let currDay = new Date(date)
        while (currDay.getDay() < 6) {
            currDay = new Date(currDay.getTime() + (1000 * 60 * 60 * 24))
            calendarData.push({ day:currDay })
        }
        return calendarData
    }



    function renderTable(data) {
        const weekCmps = []
        if (data.length % 7 !== 0) return null
        let weeksCount = data.length / 7;
        while (weeksCount) {
            weekCmps.push(<WeekPreview key={utils.makeId()} dates={data.splice(0, 7)}  />)
            weeksCount--
        }
        return weekCmps

    }

    function calculateDates(start, end, destinations) {
        let nextDay = new Date(start)
        let dates = [{ day: nextDay, td:{'start':0} }]
        while (nextDay.getDate() !== new Date(end).getDate()) {
            nextDay = new Date(nextDay.getTime() + (1000 * 60 * 60 * 24))
            dates.push({ day: nextDay, td:''})
            destinations.forEach(dest=>{
                if(dest.start.getDate()===nextDay.getDate()&& dest.start.getMonth()===nextDay.getMonth()){
                    dates[dates.length-1].td={...dates[dates.length-1].td,'start':dest.idx}
                }else if(dest.start<nextDay && nextDay.setHours(12)<dest.end.setHours(11) ){
                    dates[dates.length-1].td={...dates[dates.length-1].td,'full':dest.idx}
                }else if(dest.end.getDate()===nextDay.getDate()&& dest.end.getMonth()===nextDay.getMonth()){
                    dates[dates.length-1].td={...dates[dates.length-1].td,'end':dest.idx}
                }
            })
        }
        return dates
    }


    const calendarData = generateCalendar()
    return (
        <table className="route-calendar">
            <thead className="table-header">
                <tr >
                    <th>
                        S
                    </th>
                    <th>
                        M
                    </th>
                    <th>
                        T
                    </th>
                    <th>
                        W
                    </th>
                    <th>
                        T
                    </th>
                    <th>
                        F
                    </th>
                    <th>
                        S
                    </th>
                </tr>

            </thead>
            <tbody>
                {renderTable(calendarData) || 'w'}
            </tbody>
        </table>
    )
}
