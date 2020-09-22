import React from 'react'

export function TripSettings({settingsOpen}) {
    return (
        <div className={`trip-settings flex column styled-header ${settingsOpen?'open':''}  `}>
            <button className="ustyled-button">Add co-traveler</button>
            <button className="ustyled-button">Export to PDF</button>
        </div>
    )
}