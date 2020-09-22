import React from 'react'

export function UserFlow() {
    return (
        <div className="flex user-flow">
            <div className="flex">
                <img src="https://res.cloudinary.com/idanrozen/image/upload/v1600728256/choosing-a-destination-royalty-free-vector-clip-art-illustration-697687_hksyth.png" alt="choose-travel" />
                <div>
                    <p className="flow-headline">Choose a trip</p>
                    <p className="flow-content">Choose one of our planned trips</p>
                </div>
            </div>
            <div className="flex">
                <img src="https://thumbs.dreamstime.com/b/team-members-working-together-to-achieve-common-goal-doing-puzzle-vector-illustration-flat-style-putting-pieces-184117764.jpg" alt="" />
                <div>
                <p className="flow-headline">Personalize it</p>
                <p className="flow-content">You can edit the trip so it will suit to you needs</p>
                </div>
            </div>
            <div className="flex">
                <img src="https://i.dlpng.com/static/png/5081720-best-beach-vacation-illustrations-royalty-free-vector-graphics-beach-clip-art-612_612_preview.png" alt="" />
                <div>
                <p className="flow-headline">Have fun</p>
                <p className="flow-content">You can invite friends, chat with them, print the trip and enjoy your planned travel</p>
                </div>
            </div>


        </div>
    )
}
