import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { utils } from '../../services/utils';


const API_KEY = 'AIzaSyBXIyfwpDtmz9fLAQI-MUqWuhQtc-GQYoo'

class _MapContainer extends React.Component {
    state = {
        bounds: '',
        markers: [],
        selectedPlace: '',
        activeMarker: {},
        showingInfoWindow: false
    }

    initiateMarkerABounds() {
        const markers = [];
        const bounds = new this.props.google.maps.LatLngBounds();
        for (var i = 0; i < this.props.markers.length; i++) {
            if (!this.props.markers[i].location || !this.props.markers[i].location.lng) continue
            bounds.extend(new this.props.google.maps.LatLng(this.props.markers[i].location));
            markers.push(this.props.markers[i])
        }
        return { markers, bounds }

    }

    componentDidMount() {
        const { markers, bounds } = this.initiateMarkerABounds()
        const BASE_IMG_URL = 'https://res.cloudinary.com/roidinary/image/upload/c_scale,w_40/v1601311538/'
        const imgs = [
            `${BASE_IMG_URL}location1_xebwou.png`,
            `${BASE_IMG_URL}location2_lxtqsq.png`,
            `${BASE_IMG_URL}location3_zly9ql.png`,
            `${BASE_IMG_URL}location4_venppr.png`,
            `${BASE_IMG_URL}location5_xervod.png`,
            `${BASE_IMG_URL}location6_fql1xk.png`
        ]
        this.setState({ bounds, markers, imgs })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.markers !== prevProps.markers) {
            const { markers, bounds } = this.initiateMarkerABounds()
            if (markers.length > 1 && this.state.map) {
                this.state.map.fitBounds(bounds)
            }
            else {
                if (this.state.map && markers[0] && markers[0].location && markers[0].location.lat) {
                    this.state.map.panTo(this.props.markers[0].location)
                    this.state.map.setZoom(10)

                }
            }
            this.setState({ markers })
        }
    }
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    getMarkers() {
        return this.state.markers.map((marker, idx) => {
            return (<Marker key={utils.makeId()}
                onClick={this.onMarkerClick}
                title={marker.name}
                name={marker.at || ''}
                position={marker.location}
                icon={this.state.imgs[idx]}
            >

            </Marker>)
        })
    }

    containerStyle = {
        width: '100%',
        height: '300px',

    }


    render() {

        return (
            <Map
                google={this.props.google}
                containerStyle={this.containerStyle}
                zoom={10}
                onClick={this.onMapClicked}
                onReady={(mapProps, map) => {
                    if (this.state.markers.length > 1) map.fitBounds(this.state.bounds)

                    else {
                        if (this.state.markers[0]) map.panTo(this.state.markers[0].location)
                    }
                    this.setState({ map })
                }}
                styles={

                    [{
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                saturation: 36
                            },
                            {
                                color: "#333333"
                            },
                            {
                                lightness: 40
                            }
                        ]
                    },
                    {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: [
                            {
                                visibility: "on"
                            },
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 16
                            }
                        ]
                    },
                    {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#fefefe"
                            },
                            {
                                lightness: 20
                            }
                        ]
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [
                            {
                                color: "#fefefe"
                            },
                            {
                                lightness: 17
                            },
                            {
                                weight: 1.2
                            }
                        ]
                    },
                    {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#f5f5f5"
                            },
                            {
                                lightness: 20
                            }
                        ]
                    },
                    {
                        featureType: "landscape",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#d5d5d5"
                            }
                        ]
                    },
                    {
                        featureType: "landscape.man_made",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#7574c0"
                            },
                            {
                                saturation: "-37"
                            },
                            {
                                lightness: "75"
                            }
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#f5f5f5"
                            },
                            {
                                lightness: 21
                            }
                        ]
                    },
                    {
                        featureType: "poi.business",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#7574c0"
                            },
                            {
                                saturation: "-2"
                            },
                            {
                                lightness: "53"
                            }
                        ]
                    },
                    {
                        featureType: "poi.park",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#dedede"
                            },
                            {
                                lightness: 21
                            }
                        ]
                    },
                    {
                        featureType: "poi.park",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#7574c0"
                            },
                            {
                                lightness: "69"
                            }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [
                            {
                                color: "#7574c0"
                            },
                            {
                                lightness: "25"
                            }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 29
                            },
                            {
                                weight: 0.2
                            }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                lightness: "38"
                            },
                            {
                                color: "#000000"
                            }
                        ]
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 18
                            }
                        ]
                    },
                    {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#ffffff"
                            },
                            {
                                lightness: 16
                            }
                        ]
                    },
                    {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#f2f2f2"
                            },
                            {
                                lightness: 19
                            }
                        ]
                    },
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#e9e9e9"
                            },
                            {
                                lightness: 17
                            }
                        ]
                    }
                    ]
                }
            >


                {this.state.markers[0] && this.getMarkers()}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.title}</h1>
                        {this.state.selectedPlace.name && <p>{
                            new Date(this.state.selectedPlace.name).getHours() + ':' + new Date(this.state.selectedPlace.name).getMinutes()
                        }</p>}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export const MapContainer = GoogleApiWrapper({
    apiKey: (API_KEY)
})(_MapContainer)