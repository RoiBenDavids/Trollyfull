import React, { Component } from 'react'

export class TripFilter extends Component {

    // state = {
    //     name: '',
    //     inStock: false,
    //     price: '',
    //     type: ''
    // }

    render() {
        const { onsetFilter } = this.props
        return (
            <div className="trip-filter flex" style={this.props.style}>
                {/* <p>
                    <label htmlFor="filter-toy-by-name" > Name</label>
                    <input type="text" id="filter-toy-by-name" name="name" onChange={onsetFilter} />
                </p>
                <p>
                    <label htmlFor="filter-toy-by-price" >Price</label>
                    <input type="number" id="filter-toy-by-price" min="1" name="price" placeholder="Enter max price" onChange={onsetFilter} />
                </p> */}

                <p className="filterBtn" onClick={(ev)=> {onsetFilter('taipei')}}>Taiwan</p>
                <p className="filterBtn" onClick={(ev)=> {onsetFilter('London')}}>London</p>
                <p className="filterBtn" onClick={(ev)=> {onsetFilter('Thailand')}}>Thailand</p>
                <p className="filterBtn" onClick={(ev)=> {onsetFilter('Mexico')}}>Mexico</p>
                <p className="filterBtn" onClick={(ev)=> {onsetFilter('Switzerland')}}>Switzerland</p>

            </div>
        )
    }
}