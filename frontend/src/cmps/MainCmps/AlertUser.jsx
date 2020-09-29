import React from 'react';
export function AlertUser({props}) {
    const msg= props.modal.props.createdBy.id==='guest'?
    'Be aware your Changes would not be saved, in case you would like  to save the changes and even add friends to the plan, go back to the home page, sign up and choose a template trip again!':
    'your trip will be saved in Trips under the name: '+props.modal.props.tripName
    return (
        <p style={{padding:'15px'}}>
            {msg}
        </p>
    )
}