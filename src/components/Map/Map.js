import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh',
};


const Map = (props) => {
    console.log('Map')

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={props.currentPosition}
            zoom={10}
            options ={{disableDoubleClickZoom: true}}
            onDblClick={(e) => { props.coordinatesSelected(e) }}
        >
            {props.currentPosition ? (
                <Marker
                    position={props.currentPosition} />
            ) : null}
        </GoogleMap>
    )

}

export default Map