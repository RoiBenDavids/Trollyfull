import React, { Component } from 'react'
import { eventBus } from '../../services/eventBusService';
import { utils } from '../../services/utils';
import { ErrorMsg } from '../MainCmps/ErrorMsg';
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
        minDestinations: null,
        daysCount: 7
    }
    removeBus;
    async componentDidMount() {

        const _removeBus = eventBus.on('markDay', (day) => {
            this.setChosenDay(day)
            return
        })
        this.removeBus = _removeBus

        this.initiateAssembly()

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.trip === this.props.trip) return
        this.initiateAssembly(this.state.daysCount, this.state.page)
    }

    setChosenDay = async (day) => {
        const linearDaysDates = this.getLinearTripDays().map(timeStamp => {
            const date = new Date(timeStamp)
            return date.toLocaleDateString()
        })
        const currDayDate = day.day.toLocaleDateString()
        const page = linearDaysDates.findIndex(date => {
            return date === currDayDate
        })
        this.props.openSideBar()
        this.initiateAssembly(1, page)

    }

    initiateAssembly = async (daysCount = 7, page = 0) => {
        const { destinations, activities } = this.props.trip
        const windowWidth = window.window.innerWidth
        if (daysCount === 7) {
            if (windowWidth <= 900) {
                daysCount = 5
            }
            if (windowWidth <= 650) {
                daysCount = 3
            }
            if (windowWidth <= 530) {
                daysCount = 2
            }
        }

        let startDate, endDate
        [startDate, endDate] = [destinations[0].startDate, destinations[destinations.length - 1].endDate]
        const tripLength = utils.calculateDays(startDate, endDate)
        await this.setState({ ...this.state, tripLength, startDate, endDate, activities, daysCount, page, daysCount }, () => this.loadWeekMat())

        await this.setState({ minDestinations: this.getMinDestinations() })
    }


    omponentWillUnmount() {
        this.removeBus()
    }


    loadWeekMat = () => {
        const { activities } = this.props.trip;
        const actsDaysMap = this.mapActsToDays(activities);
        const WeeklyActsToDisplay = actsDaysMap.slice(this.state.page * this.state.daysCount, this.state.page * this.state.daysCount + this.state.daysCount)
        const destTimeStamp = WeeklyActsToDisplay[0][1][0].at
        const startDate = utils.getDateDay(destTimeStamp)
        let weekMat = utils.createMat(this.state.daysCount, 35);
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
            currDayActs.forEach(act => {
                if (!act.freeDay) {
                    let row = this.getRowIdx(act.at)
                    act = { ...act, col, row }
                    weekMat[row][col] = act
                }
            })
        }
        weekMat = this.showDaysName(destTimeStamp, weekMat)
        this.setState({ weekMat, actsToDisplay: WeeklyActsToDisplay })
    }

    onRemoveAct = (actId) => {
        this.props.showModal('removeActivity', { removeAct: this.removeAct, actId, })
    }

    removeAct = async (actId) => {
        let { activities } = this.state;
        activities = await activities.filter((_act => _act.id !== actId))
        await this.props.updateTripAct(activities)
        await this.setState({ activities })
        await this.props.closeModal()
    }

    showDaysName(startTime, mat) {
        for (let j = 0; j < this.state.daysCount; j++) {
            const _time = startTime + j * 24 * 60 ** 2 * 1000
            const time = new Date(_time)
            mat[0][j] = { duration: 1, literalDay: utils.getWeekDay(_time), date: time.toLocaleDateString(), time }
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

    onOpenDetails = (act) => {
        this.props.showModal('activityDetails', { saveAct: this.saveAct, act, isOccTimeSlot: this.isOccTimeSlot, destinations: this.props.trip.destinations })

    }

    onDragMove = ({ pos }, id) => {

        const activity = this.state.activities.find(act => act.id === id)
        const dest = this.props.trip.destinations.find(_dest => _dest.name === activity.destination)

        let newTime = this.getTimeFromIdx(pos)
    
        let destStart = utils.setToHourMinuets(dest.startDate, 6, 0)
        let desEnd = utils.setToHourMinuets(dest.endDate, 23, 59)
        if (newTime < destStart || newTime > desEnd) {
            this.props.showMsg({ type: 'invalid-move', msg: 'Cannot move activities to another destination!' })
            return
        }
        if (!newTime) return
        const actCopy = { ...activity, at: newTime }

        if (this.isOccTimeSlot(actCopy)) {
            this.props.showMsg({ type: 'invalid-move', msg: 'You aleardy have plans for that date! please choose a different one.' })
            return
        }

        activity.at = newTime
        this.saveAct(activity)
    }

    getTimeFromIdx = ({ i, j }) => {
        const { page } = this.state
        const currWeekDates = this.getLinearTripDays()
        if (j + page * this.state.daysCount >= currWeekDates.length) {
            return false
        }

        const currDayDate = new Date(currWeekDates[j + page * this.state.daysCount])
        if (i % 2 !== 0) {
            currDayDate.setHours(7 + (i - 1) / 2, 0)
        } else {
            currDayDate.setHours(6 + i / 2, 30)

        }

        return currDayDate.getTime()
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
        const { page, daysCount } = this.state
        var { destinations } = this.props.trip
        const linearDays = this.getLinearTripDays()
        let minDay = linearDays[page * (daysCount)]
        let idxMaxDay = page * daysCount
        if (idxMaxDay + daysCount - 1 >= linearDays.length) {
            idxMaxDay = linearDays.length - 1
        } else {
            idxMaxDay += daysCount - 1
        }
        let maxDay = linearDays[idxMaxDay]
        minDay = new Date(minDay)
        maxDay = new Date(maxDay)
        minDay = utils.setToHourMinuets(minDay, 7, 0)
        maxDay = utils.setToHourMinuets(maxDay, 23, 59)
        return destinations.filter(dest => {
            let destStart = new Date(dest.startDate)
            let destEnd = new Date(dest.endDate)
            destStart = utils.setToHourMinuets(destStart, 10, 0)
            destEnd = utils.setToHourMinuets(destEnd, 10, 0)

            return ((destStart >= minDay && destStart <= maxDay) ||
                (destEnd >= minDay && destEnd <= maxDay)
            )

        })
    }

    getMinDestinations = () => {

        const destinations = this.getWeekDests()
        const minDestinations = []
        const destsHeadLength = this.mapDestsToHeaderLength()
        const destsNames = Object.keys(destsHeadLength)
        const destsLength = Object.values(destsHeadLength)
        for (let i = 0; i < destsNames.length; i++) {

            const time = destinations.find(dest => {
                return dest.name === destsNames[i]
            })

            minDestinations.push({ name: destsNames[i], duration: destsLength[i], time })
        }
        return minDestinations


    }


    mapDestsToHeaderLength = () => {
        const { trip } = this.props
        const { page } = this.state
        const { destinations } = this.props.trip
        const tripStart = trip.destinations[0].startDate
        const tripEnd = trip.destinations[trip.destinations.length - 1].endDate
        const destinationsTimes = trip.destinations.map((destination, idx) => {
            return { start: new Date(destination.startDate), end: new Date(destination.endDate), idx }
        })
        const currWeekDests = utils.calculateDates(tripStart, tripEnd, destinationsTimes).slice(page * this.state.daysCount, page * this.state.daysCount + this.state.daysCount)
        let currDestName;
        let currDest;
        return currWeekDests.reduce((acc, { td }, idx) => {

            if (td.full || td.full === 0) {
                currDest = destinations[td.full]
                currDestName = currDest.name
                acc[currDestName] = (acc[currDestName]) ? acc[currDestName] + 2 : 2
            } else {
                if (((td.start || td.start === 0) && (!td.end && td.end !== 0))) {
                    currDest = destinations[td.start]
                    currDestName = currDest.name
                    acc[currDestName] = (acc[currDestName]) ? acc[currDestName] + 2 : 2
                } else {

                    if (td.start || td.start === 0) {
                        currDest = destinations[td.start]
                        currDestName = currDest.name

                        acc[currDestName] = (acc[currDestName]) ? acc[currDestName] + 1 : 1

                    }
                    if (td.end || td.end === 0) {
                        currDest = destinations[td.end]
                        currDestName = currDest.name

                        acc[currDestName] = (acc[currDestName]) ? acc[currDestName] + 1 : 1

                    }

                }
            }


            return acc
        }, {})

    }

    getLinearTripDays = () => {
        const linearDays = []
        let { startDate, tripLength } = this.state
        let ttime = new Date(startDate)
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
        let pageCount = Math.ceil(tripLength / this.state.daysCount)
        let newPage;
        if (direction === 'next') {
            newPage = (page + 1) % pageCount

        } else {
            newPage = (page - 1 < 0) ? pageCount - 1 : page - 1
        }
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

        for (let i = 0; i < mat[0].length; i++) {

            var col = this.getCol(mat, i)
            actPreviews.push(<DayActivities onDragMove={this.onDragMove} getTimeFromIdx={this.getTimeFromIdx} destinations={this.props.trip.destinations} onEdit={this.onEdit} onOpenDetails={this.onOpenDetails} onRemoveAct={this.onRemoveAct} getRowIdx={this.getRowIdx} key={utils.makeId()} day={col} />
            )
        }

        return actPreviews
    }

    setFullAssembly = () => {
        this.initiateAssembly(7, 0)
        this.props.setDestsMarkers()
    }

    render() {
        const { weekMat, minDestinations, daysCount } = this.state
        const { destinations } = this.props.trip
        if (!weekMat || !minDestinations) return <div>Loading...</div>
        const dayActs = this.renderDayActivities(weekMat)
        this.mapDestsToHeaderLength()
        return (
            <div className="assembly-container">


                {/* <section className="paging-assembly"> */}
                {/* <span>{this.state.page + 1}</span> */}
                {/* </section> */}
                {daysCount !== 1 && <div className="destinations-header-wraper">
                    <div className="toggle-page prev" onClick={() => this.onTogglePage('prev')}><i className="fas fa-chevron-circle-left"></i></div>

                    <div className="toggle-page next" onClick={() => this.onTogglePage('next')}><i className="fas fa-chevron-circle-right"></i></div>
                </div>}
                {daysCount === 1 && <section className="full-assembly ">
                    <button className="styled-button" onClick={this.setFullAssembly}>Back</button>
                </section>}
                <DestinationsHeader daysCount={daysCount} allDestinations={destinations} destinations={minDestinations} />
                <div className={'trip-assembly-main full'} style={{ gridTemplateColumns: `repeat(${daysCount}, minmax(70px, 1fr))` }}>
                    <DayTimeLine />
                    {dayActs}
                </div >
                <button className='editActivity styled-button' onClick={() => this.props.showModal('editActivity', { saveAct: this.saveAct, isOccTimeSlot: this.isOccTimeSlot, act: null, destinations: this.props.trip.destinations })}>add activity</button>
            </div>
        )
    }
}

