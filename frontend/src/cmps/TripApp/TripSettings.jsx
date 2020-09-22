import React from 'react'
import { connect } from 'react-redux'
import { showModal } from '../../store/actions/modalActions'

function _TripSettings({ settingsOpen, tripId, showModal }) {
    return (
        <div className={`trip-settings flex column styled-header ${settingsOpen ? 'open' : ''}  `}>
            <button className="ustyled-button" onClick={() => showModal('add-member', { tripId })}>Add co-traveler</button>
            <button className="ustyled-button">Export to PDF</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = {
    showModal,
}

export const TripSettings = connect(mapStateToProps, mapDispatchToProps)(_TripSettings)
