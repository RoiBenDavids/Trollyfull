import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { utils } from '../../services/utils';


const API_KEY = 'AIzaSyBXIyfwpDtmz9fLAQI-MUqWuhQtc-GQYoo'
// const API_KEY =''

class _MapContainer extends React.Component {
    state = {
        bounds: '',
        markers: [],
        selectedPlace: '',
        activeMarker: {},
        showingInfoWindow: false
    }

    initiateMarkerABounds(){
        const markers = [];
        const bounds = new this.props.google.maps.LatLngBounds();
        for (var i = 0; i < this.props.markers.length; i++) {
            if(!this.props.markers[i].location||!this.props.markers[i].location.lng) continue
            bounds.extend(new this.props.google.maps.LatLng(this.props.markers[i].location));
            markers.push(this.props.markers[i])
        }
        return{markers,bounds}

    }

    componentDidMount() {
        const {markers,bounds } = this.initiateMarkerABounds()
        const BASE_IMG_URL = 'https://res.cloudinary.com/roidinary/image/upload/c_scale,w_20/'
        const imgs = [
            `${BASE_IMG_URL}v1600380972/locationVector1_xickq3.png`,
            `${BASE_IMG_URL}v1600381638/locationVector2_jpgbc9.png`,
            `${BASE_IMG_URL}v1600381638/locationVector3_izhosm.png`,
            `${BASE_IMG_URL}v1600381638/locationVector4_idbol0.png`,
            `${BASE_IMG_URL}v1600381638/locationVector5_jjqnfo.png`,
            `${BASE_IMG_URL}v1600381638/locationVector6_nvbbsq.png`
        ]
        this.setState({ bounds, markers, imgs })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.markers !== prevProps.markers) {
            const {markers,bounds } = this.initiateMarkerABounds()
            if (markers.length > 1 && this.state.map) {
                this.state.map.fitBounds(bounds)
            }
            else {
                if (this.state.map && markers[0].location ||markers[0].lat) {
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
                name={marker.at||''}
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
                    else map.panTo(this.state.markers[0].location)
                    this.setState({ map })
                }}
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