import React from 'react'
import { NavLink } from 'react-router-dom'
 
import { MembersPreview } from './MemberPreview'


export class TripNavBar extends React.Component {
    state={
    }

    componentDidMount(){
        
    }
    componentDidUpdate(prevProps){
        if(prevProps.trip!==this.props.trip){
            this.setState({ trip: this.props.trip})
        }
        
    }
    render(){
        if(!this.props.trip) return <div>1</div>
        return (
            <div className="trip-navbar flex align-center justify-center full">
                <div className="members-preview flex">
                    {this.props.trip.members.map(member=><MembersPreview member={member}/>)}
                </div>
                <div className="trip-routes flex justify-center">
                    <NavLink to={`/trip/${this.props.trip._id}/triproute`}>Route</NavLink>
                    <NavLink to={`/trip/${this.props.trip._id}/tripassembly`}>Assembly</NavLink>
                </div>
                <button className="ustyled-button" onClick={() => this.props.showModal('add-member', this.props.trip._id )}>Add co-traveler</button>
                {/* <a className='see' onClick={toggleSettings}>settings</a> 
                <TripSettings settingsOpen={settingsOpen} tripId={trip._id}/>  */}
            </div>
        )
    }
}
