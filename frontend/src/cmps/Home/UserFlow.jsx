import React from 'react'

export function UserFlow() {
    return (
        <div className="flex column align-center user-flow" id="userFlow" >
            <div className="flex align-center">
                <div>
                    <p className="flow-headline">Choose a trip</p>
                    <p className="flow-content">Choose from one of our amazing planned trips</p>
                </div>
                <img src="https://res.cloudinary.com/roidinary/image/upload/v1600869772/undraw_traveling_t8y2_xnd0ne.svg" alt="choose-travel" />
            </div>
            <div className="flex align-center">
                <img src="https://res.cloudinary.com/roidinary/image/upload/v1600869761/undraw_travel_plans_li01_k6igg6.svg" alt="" />
                <div className="flow-text">
                    <p className="flow-headline">Personalize it</p>
                    <p className="flow-content">Personalize <span style={{fontWeight:'bold'}}>destinations </span>on Route and <span style={{fontWeight:'bold'}}>activities </span>on Assembly </p>
                </div>
            </div>
            <div className="flex align-center">
                <div>
                    <p className="flow-headline">Add your friends</p>
                    <p className="flow-content">invite friends to plan together on the same document</p>
                </div>
                <img src="https://res.cloudinary.com/roidinary/image/upload/v1600870015/undraw_social_friends_nsbv_c9ovrw.svg" alt="" />
            </div>


        </div>
    )
}
