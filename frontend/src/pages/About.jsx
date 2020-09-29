import React from 'react'

export function About() {
    return (
        <div className="about-page">
            <div className="about-hero full ">
                <h2>We love to travel the world so we made it easy to plan</h2>
            </div>
            <div className="about-main">
                <div className="about-desc">

                    <h3>About Trolly</h3>
                    <p>Trolly enables users to quickly and easily explore a destination’s offerings and create personalized sightseeing itineraries by utilizing local expertise and cutting-edge artificial intelligence. Drawing from a database of over 80,000 destinations Trolly makes trip planning easy, intuitive and enjoyable for over 25 million travelers a year.</p>

                    <p>We use technologies that allow users to create and edit trip's plans with friends, chat and watch live changes</p>
                </div>
                <h3>About Us</h3>
                <div className="flex about-us justify-evenly">
                    <div className="flex column">
                        <img src="https://res.cloudinary.com/idanrozen/image/upload/v1600889656/opinion-sin-imagen_raxn0y.png" alt="" />
                        <p>Junior Developer</p>
                    </div>
                    <div className="flex column">
                        <img src="https://res.cloudinary.com/idanrozen/image/upload/v1600889656/opinion-sin-imagen_raxn0y.png" alt="" />
                        <p>Junior Developer</p>
                    </div>
                    <div className="flex column">
                        <img src="https://res.cloudinary.com/idanrozen/image/upload/v1600889656/opinion-sin-imagen_raxn0y.png" alt="" />
                        <p>Junior Developer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
