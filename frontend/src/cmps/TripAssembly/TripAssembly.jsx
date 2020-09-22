import React, { Component } from 'react'
import { utils } from '../../services/utils';
import { ActivityList } from './ActivityList'
import { DayTimeLine } from './DayTimeLine';
import { DestinationsHeader } from './DestinationsHeader';



export class TripAssembly extends Component {

    state = {
        activities: null,
        daysMat: null,
        page: 0,
        startDate: null,
        endDate: null,
        tripLength: '',
        actsToDisplay: null,
        minDestinations: null
    }

    async componentDidMount() {
        const { destinations, activities } = this.props.trip
        let startDate, endDate
        [startDate, endDate] = [destinations[0].startDate, destinations[destinations.length - 1].endDate]
        const tripLength = utils.calculateDays(startDate, endDate)
        await this.setState({ tripLength, startDate, endDate, activities })
        await this.loadDaysMat()
        await this.setState({ minDestinations: this.getMinDestinations() }, () => console.log(this.state))

    }

    loadDaysMat = () => {
        const { activities } = this.props.trip;
        const actsDaysMap = this.mapActsToDays(activities);
        const actsToDisplay = actsDaysMap.slice(this.state.page * 7, this.state.page * 7 + 7)
        const destTimeStamp = actsToDisplay[0][1][0].at
        const startDate = utils.getDateDay(destTimeStamp)
        let daysMat = utils.createMat(7, 35);
        let col = 0

        let prevDay = +actsToDisplay[0][0]
        for (let i = 0; i < actsToDisplay.length; i++) {
            let currDayActs, day
            [day, currDayActs] = [+actsToDisplay[i][0], actsToDisplay[i][1]];
            if (prevDay > day) {
                day += this.getDaysInMonth(destTimeStamp)
            }
            prevDay = day
            col = day - startDate
            for (let j = 0; j < currDayActs.length; j++) {

                const act = currDayActs[j]
                let row = this.getRowIdx(act.at)
                act.col = col
                act.row = row
                if (!act.freeDay) daysMat[row][col] = act
            }
        }
        daysMat = this.showDaysName(destTimeStamp, daysMat)

        this.setState({ daysMat, actsToDisplay })
    }

    onRemoveAct = (actId) => {
        let { activities } = this.state;
        activities = activities.filter((_act => _act.id !== actId))
        this.props.updateTripAct(activities)
        this.setState({ activities })
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.trip === this.props.trip) return
        this.setState({ trip: { ...this.props.trip } }, () => {
            this.loadDaysMat()
            this.setState({ minDestinations: this.getMinDestinations() })
        })
    }



    showDaysName(startTime, mat) {
        for (let j = 0; j < 7; j++) {
            const date = new Date(startTime + j * 24 * 60 ** 2 * 1000)
            mat[0][j] = { duration: 1, literalDay: utils.getWeekDay(startTime + j * 24 * 60 ** 2 * 1000), date: date.toLocaleDateString() }
        }
        return mat
    }


    isOccTimeSlot = (activitie) => {
        const { activities } = this.state
        const currStartTime = activitie.at

        const currEndTime = currStartTime + activitie.duration * 30 * 60 * 1000
        for (let i = 0; i < activities.length; i++) {
            const act = activities[i]
            const checkedStartTime = act.at
            const checkedEndTime = act.at + act.duration * 30 * 60 * 1000
            if (activitie.id && activitie.id === act.id) continue

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
        let prevDay;
        let map = activities.reduce((acc, activitie) => {

            let day = utils.getDateDay(activitie.at)
            if (!acc[day]) acc[day] = []
            acc[day].push(activitie)
            return acc

        }, {})
        map = this.sortDateMap(map)
        return map
    }


    getRowIdx = (timeStamp) => {
        const time = new Date(timeStamp)
        const hour = time.getHours()
        const minuets = time.getMinutes()
        let slot = (minuets === 0) ? (hour - 6) * 2 : (hour - 6) * 2 + 1
        return slot
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


    getDaysInMonth(timeStamp) {
        let time = new Date(timeStamp)
        let year, month;
        [month, year] = [time.getMonth(), time.getFullYear()]

        return new Date(year, month + 1, 0).getDate();
    }

    getMinDestinations = () => {
        var { destinations } = this.props.trip
        const { actsToDisplay } = this.state
        destinations = this.destsWithActs(destinations, actsToDisplay)

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

    destsWithActs = (destinations, allActs) => {
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
        this.loadDaysMat()
    }

    onTogglePage = async (direction) => {
        const { tripLength, page } = this.state
        let pageCount = Math.ceil(tripLength / 7)
        let newPage = (direction = 'next') ? (page + 1) % pageCount : (page - 1) % pageCount
        await this.setState({ page: newPage })
        await this.loadDaysMat()
        this.setState({ minDestinations: this.getMinDestinations() })
    }


    renderActPreviews(mat) {
        const actPreviews = []

        for (let i = 0; i < 7; i++) {

            var col = this.getCol(mat, i)
            actPreviews.push(<ActivityList destinations={this.props.trip.destinations} onEdit={this.onEdit} onRemoveAct={this.onRemoveAct} getRowIdx={this.getRowIdx} key={utils.makeId()} day={col} />
            )
        }

        return actPreviews
    }



    render() {
        const { daysMat, activities, minDestinations, tripLength } = this.state
        if (!daysMat || !minDestinations) return <div>Loading...</div>
        // this.getLinearTripDays()
        const acts = this.renderActPreviews(daysMat)

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
                    {acts}
                </div >
                <button className='editActivity styled-button' onClick={() => this.props.showModal('editActivity', { saveAct: this.saveAct, isOccTimeSlot: this.isOccTimeSlot, act: null, destinations: this.props.trip.destinations })}>add activity</button>
            </div>
        )
    }
}

