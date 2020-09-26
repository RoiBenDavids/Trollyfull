import React, { Component } from 'react'

export class TripFilter extends Component {

    // state = {
    //     name: '',
    //     inStock: false,
    //     price: '',
    //     type: ''
    // }

    render() {
        const { onsetFilter, mostOccDests } = this.props
        return (        
            <div className="trip-filter flex" style={this.props.style}>
                <input autoComplete="off" placeholder="Search" className="styled-input" name="name" onChange={this.props.handleInput} list="dest-filter" />
                <datalist onChange={this.props.handleInput} id="dest-filter">
                    {mostOccDests.map(dest => {
                       return <option value={`${dest}`}></option>
                    })}
                </datalist>
            </div>
        )
    }
}