import React, { Component } from 'react'

import PlacesAutocomplete from 'react-places-autocomplete';


export class GooglePlaces extends Component {

    state = {
        address: '',
        coordinates: { lat: null, lng: null },

    }
    componentDidMount() {
    }
    

    // handleSelect = async (value) => {
    //     const results = await geocodeByAddress(value);
    //     const latlng = await getLatLng(results[0])
    //     this.setState({coordinates:latlng, address:value}, ()=>{console.log(this.state)})
    // }

    // handleInput = (name) => {
    //     this.setState({ address: name })
    // }


    render() {
        return (
            <div>
                <PlacesAutocomplete value={this.props.address} onChange={this.props.handleAddress} onSelect={this.props.handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                        return <div> <input
                            {...getInputProps({
                                placeholder: 'Enter destination (city)...',
                                className: 'styled-input',
                            })}
                        />
                            <div className="places-list">
                                {loading ? <p>Loading . . .</p> : null}
                                {suggestions.map((suggestion) => {

                                    const style = {
                                        backgroundColor: suggestion.active ? '#f097ee' : '#fff',
                                        display: suggestion ? 'inherit' : 'none',
                                        padding: suggestion ? '5px 10px' : 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        width:'100%',
                                    }
                                    return (<div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>)

                                })}
                            </div>

                        </div>
                    }}
                </PlacesAutocomplete>

            </div >
        )
    }
}
