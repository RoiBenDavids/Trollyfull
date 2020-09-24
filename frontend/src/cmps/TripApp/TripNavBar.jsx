import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { showModal } from '../../store/actions/modalActions'
import { MembersPreview } from './MemberPreview'
import { TripSettings } from './TripSettings'


// function _TripNavBar({ trip, settingsOpen, toggleSettings }) {
class _TripNavBar extends React.Component {
    state={
        trip:''
    }

    componentDidMount(){
        console.log(this.props.trip);
        this.setState({trip:this.props.trip})
    }
    componentDidUpdate(prevProps){
        if(prevProps.trip!==this.props.trip){
            this.setState({ trip: this.props.trip})
        }
        
    }
    render(){
        if(!this.state.trip) return <div>1</div>
        return (
            <div className="trip-navbar flex align-center justify-center full">
                <div className="members-preview flex">
                    {this.state.trip.members.map(member=><MembersPreview member={member}/>)}
                </div>
                <div className="trip-routes flex justify-center">
                    <NavLink to={`/trip/${this.state.trip._id}/triproute`}>Route</NavLink>
                    <NavLink to={`/trip/${this.state.trip._id}/tripassembly`}>Assembly</NavLink>
                </div>
                <button className="ustyled-button" onClick={() => this.props.showModal('add-member', this.state.trip._id )}>Add co-traveler</button>
                {/* <a className='see' onClick={toggleSettings}>settings</a> 
                <TripSettings settingsOpen={settingsOpen} tripId={trip._id}/>  */}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = {
    showModal,
}

export const TripNavBar = connect(mapStateToProps, mapDispatchToProps)(_TripNavBar)