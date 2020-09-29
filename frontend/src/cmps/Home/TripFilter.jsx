import React, { Component } from 'react'
import { utils } from '../../services/utils'

export class TripFilter extends Component {


    render() {
        const {  mostOccDests } = this.props
        return (        
            <div className="trip-filter flex" style={this.props.style}>
                <img src="https://res.cloudinary.com/idanrozen/image/upload/v1601236322/search_ejr7qx.png" alt=""/>
                <input autoComplete="off" placeholder="Search destination" className="styled-input" name="name" onChange={this.props.handleInput} list="dest-filter" />
                <datalist onChange={this.props.handleInput} id="dest-filter">
                    {mostOccDests.map(dest => {
                       return <option key={utils.makeId()} value={`${dest}`}></option>
                    })}
                </datalist>
            </div>
        )
    }
}