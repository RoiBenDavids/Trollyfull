import React, { Component } from 'react'
import { utils } from '../../services/utils';
import { DayActivities } from './DayActivities'
import { DayTimeLine } from './DayTimeLine';
import { DestinationsHeader } from './DestinationsHeader';



export class TripAssembly extends Component {

    state = {
        activities: null,
        weekMat: null,
        page: 0,
        startDate: null,
        endDate: null,
        tripLength: '',
        actsToDisplay: null,
        minDestinations: null
    }

    async componentDidMount() {
        this.initiateAssembly()
    }

    initiateAssembly = async () => {
        const { destinations, activities } = this.props.trip
        let startDate, endDate
        [startDate, endDate] = [destinations[0].startDate, destinations[destinations.length - 1].endDate]
        const tripLength = utils.calculateDays(startDate, endDate)
        await this.setState({ tripLength, startDate, endDate, activities })
        await this.loadWeekMat()
        await this.setState({ minDestinations: this.getMinDestinations() })
    }


    loadWeekMat = () => {
        const { activities } = this.props.trip;
        const actsDaysMap = this.mapActsToDays(activities);
        const WeeklyActsToDisplay = actsDaysMap.slice(this.state.page * 7, this.state.page * 7 + 7)
        const destTimeStamp = WeeklyActsToDisplay[0][1][0].at
        const startDate = utils.getDateDay(destTimeStamp)
        let weekMat = utils.createMat(7, 35);
        let col = 0

        let prevDate = WeeklyActsToDisplay[0][0]
        for (let i = 0; i < WeeklyActsToDisplay.length; i++) {
            let currDate, currDayActs
            [currDate, currDayActs] = [WeeklyActsToDisplay[i][0], WeeklyActsToDisplay[i][1]];
            if (prevDate > currDate) {
                currDate += this.getDaysInMonth(destTimeStamp)
            }
            prevDate = currDate
            col = currDate - startDate
            for (let j = 0; j < currDayActs.length; j++) {
                const act = currDayActs[j]
                if (!act.freeDay) {
                    let row = this.getRowIdx(act.at)
                    act.col = col
                    act.row = row
                    weekMat[row][col] = act
                }
                // act.row = row

            }
        }
        weekMat = this.showDaysName(destTimeStamp, weekMat)

        this.setState({ weekMat, actsToDisplay: WeeklyActsToDisplay })
    }

    onRemoveAct = (actId) => {
        let { activities } = this.state;
        activities = activities.filter((_act => _act.id !== actId))
        this.props.updateTripAct(activities)
        this.setState({ activities })
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.trip === this.props.trip) return
        this.initiateAssembly()

    }



    showDaysName(startTime, mat) {
        for (let j = 0; j < 7; j++) {
            const date = new Date(startTime + j * 24 * 60 ** 2 * 1000)
            mat[0][j] = { duration: 1, literalDay: utils.getWeekDay(startTime + j * 24 * 60 ** 2 * 1000), date: date.toLocaleDateString() }
        }
        return mat
    }




    isOccTimeSlot = (activity) => {
        const { activities } = this.state
        const currStartTime = activity.at

        const currEndTime = currStartTime + activity.duration * 30 * 60 * 1000
        for (let i = 0; i < activities.length; i++) {
            const act = activities[i]
            const checkedStartTime = act.at
            const checkedEndTime = act.at + act.duration * 30 * 60 * 1000
            if (activity.id && activity.id === act.id) continue

            if (
                (((currStartTime > checkedStartTime) && (currStartTime < checkedEndTime)) ||
                    ((currEndTime > checkedStartTime) && (currEndTime < checkedEndTime))) ||

                ((checkedStartTime > currStartTime) && (checkedStartTime < currEndTime)) ||
                ((checkedEndTime > currStartTime) && (checkedEndTime < currEndTime))

            ) {
                return true
            }

        }
        return false
    }


    mapActsToDays = () => {
        const { activities, destinations } = this.props.trip;
        activities.sort((act1, act2) => act1.at - act2.at)
        let map = activities.reduce((acc, activity) => {

            let day = utils.getDateDay(activity.at)
            if (!acc[day]) acc[day] = []
            acc[day].push(activity)
            return acc

        }, {})
        map = this.sortDateMap(map)
        return map
    }



    getCol = (mat, col) => {
        const MatColumn = (_mat, n) => _mat.map(x => x[n]);
        return MatColumn(mat, col);
    }

    sortDateMap(map) {
        let arrSorted = [];
        for (let day in map) {

            arrSorted.push([+day, map[day]]);
        }
        const linearDays = this.getLinearTripDays();
        for (let i = 0; i < linearDays.length; i++) {
            let currDay = utils.getDateDay(linearDays[i])
            let isInclude = arrSorted.find((day) => day[0] === currDay)
            if (!isInclude) {
                arrSorted.push([currDay, [{ at: linearDays[i], freeDay: true }]])
            }

        }
        arrSorted.sort(function (day1, day2) {
            return day1[1][0].at - day2[1][0].at;
        });

        return arrSorted

    }
    onEdit = (act) => {
        this.props.showModal('editActivity', { saveAct: this.saveAct, act, isOccTimeSlot: this.isOccTimeSlot, destinations: this.props.trip.destinations })
    }

    onDragMove = ({ pos }, id) => {


        const activity = this.state.activities.find(act => act.id === id)

        if (activity.col === pos.j && activity.row - pos.i === 1) {
            pos.i += 1
        }

        const dest = this.props.trip.destinations.find(_dest => _dest.name === activity.destination)


        let newTime = this.getTimeFromIdx(pos)
        if (newTime < dest.startDate - 24 * 60 ** 2 * 1000 || newTime >= dest.endDate) return
        if (!newTime) return

        activity.at = newTime

        if (this.isOccTimeSlot(activity)) {
            alert('You aleardy have plans for that date! please choose a different one.')
            return
        }
        this.saveAct(activity)
    }

    getTimeFromIdx = ({ i, j }) => {
        const currWeekDates = this.getLinearTripDays()
        console.log("TripAssembly -> getTimeFromIdx -> currWeekDates", currWeekDates)
        if (j >= currWeekDates.length) {
            alert('You\'re not travlling on that date!')
            return false
        }

        const currDayDate = new Date(currWeekDates[j])
        const isoMonthDate = currDayDate.toISOString().substring(0, 10)
        let isoTime = (i % 2 !== 0) ? `${this.getTwoDig(7 + (i - 1) / 2)}:00` : `${this.getTwoDig(6 + i / 2)}:30`
        const isoDate = new Date(isoMonthDate + 'T' + isoTime)
        const resTime = isoDate.getTime()
        return resTime
    }

    saveAct = (act) => {
        let { activities } = this.state;
        if (act.id) {
            activities = activities.map(_act => {
                return (_act.id === act.id) ? act : _act
            })
        } else {
            act.id = utils.makeId()
            activities.push(act)
        }
        this.props.closeModal()

        this.props.updateTripAct(activities)
        this.setState({ activities })
        this.loadWeekMat()
    }


    getDaysInMonth(timeStamp) {
        let time = new Date(timeStamp)
        let year, month;
        [month, year] = [time.getMonth(), time.getFullYear()]

        return new Date(year, month + 1, 0).getDate();
    }


    getWeekDests = () => {
        const { page } = this.state
        var { destinations } = this.props.trip
        const linearDays = this.getLinearTripDays()
        const minDay = linearDays[page * 7]
        // const maxPage = ((page * 7 + 7) < linearDays.length) ? (page * 7 + 7) : linearDays.length - 1
        // const maxDay = linearDays[maxPage]
        return destinations.filter(dest => {

            return dest.startDate >= minDay || dest.endDate >= minDay
        })


    }

    getMinDestinations = () => {

        const destinations = this.getWeekDests()
        // destinations = (destWithActs.length) ? destWithActs : destinations

        let lastEndDate;
        let freeDaysLeft = 14
        return destinations.map((destination, idx) => {
            let isSameStartDay = false
            let isSameEndDay = false
            if (utils.getDateDay(destination.startDate) === utils.getDateDay(lastEndDate)) {
                isSameStartDay = true
            }
            if (destinations[idx + 1] && utils.getDateDay(destinations[idx + 1].startDate) === utils.getDateDay(destination.endDate)) {
                isSameEndDay = true
            }
            lastEndDate = destination.endDate
            let totalDays = utils.calculateDays(destination.startDate, destination.endDate)
            let totaHalflDays = (isSameStartDay) ? totalDays * 2 - 1 : totalDays * 2
            totaHalflDays = (isSameEndDay) ? totaHalflDays - 1 : totaHalflDays
            totaHalflDays = (totaHalflDays > freeDaysLeft) ? freeDaysLeft : totaHalflDays
            freeDaysLeft -= totaHalflDays


            return { name: destination.name, duration: totaHalflDays }
        })
    }

    getLinearTripDays = () => {
        const linearDays = []
        let { startDate, tripLength } = this.state
        for (let i = 0; i < tripLength; i++) {
            linearDays.push(startDate + i * 24 * 60 * 60 * 1000)
        }
        return linearDays
    }

    getDestsWithActs = (destinations, allActs) => {
        destinations = destinations.filter((dest) => {
            return this.isActInDests(dest, allActs)
        })
        return destinations



    }

    isActInDests(dest, allActs) {
        for (let acts of allActs) {
            let currActs = acts[1]
            for (let act of currActs) {
                if (act.destination === dest.name) return true
            }
        }
        return false
    }

    getRowIdx = (timeStamp) => {
        const time = new Date(timeStamp)
        const hour = time.getHours()
        const minuets = time.getMinutes()
        let slot;
        if (minuets === 0) {
            slot = (hour - 6) * 2 - 1

        } else {
            slot = (hour - 6) * 2
        }

        return slot
    }


    onTogglePage = async (direction) => {
        const { tripLength, page } = this.state
        let pageCount = Math.ceil(tripLength / 7)
        let newPage = (direction = 'next') ? (page + 1) % pageCount : (page - 1) % pageCount
        await this.setState({ page: newPage })
        await this.loadWeekMat()
        this.setState({ minDestinations: this.getMinDestinations() })
    }

    getDayNumOfAct = (day) => {
        return day.reduce((acc, act) => {
            acc += (act.id) ? 1 : 0
            return acc
        }, 0)
    }

    getTwoDig = (num) => {
        let numStr = num + ''
        return (numStr.length === 1) ? '0' + numStr : numStr
    }

    renderDayActivities(mat) {
        const actPreviews = []

        for (let i = 0; i < 7; i++) {

            var col = this.getCol(mat, i)
            let numOfActs = this.getDayNumOfAct(col)
            actPreviews.push(<DayActivities numOfActs={numOfActs} onDragMove={this.onDragMove} getTimeFromIdx={this.getTimeFromIdx} destinations={this.props.trip.destinations} onEdit={this.onEdit} onRemoveAct={this.onRemoveAct} getRowIdx={this.getRowIdx} key={utils.makeId()} day={col} />
            )
        }

        return actPreviews
    }


    render() {
        const { weekMat, minDestinations } = this.state

        if (!weekMat || !minDestinations) return <div>Loading...</div>
        // this.getLinearTripDays()
        const dayActs = this.renderDayActivities(weekMat)


        return (
            <div className="assembly-container">
                <section className="paging-assembly">
                    <div className="toggle-page" onClick={() => this.onTogglePage('prev')}>{'<'}</div>
                    <span>{this.state.page + 1}</span>
                    <div className="toggle-page" onClick={() => this.onTogglePage('next')}>{'>'}</div>
                </section>
                <DestinationsHeader destinations={minDestinations} />
                <div className={'trip-assembly-main full'}>
                    <DayTimeLine />
                    {dayActs}
                </div >
                <button className='editActivity styled-button' onClick={() => this.props.showModal('editActivity', { saveAct: this.saveAct, isOccTimeSlot: this.isOccTimeSlot, act: null, destinations: this.props.trip.destinations })}>add activity</button>
            </div>
        )
    }
}

