import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const BELFAST_DEFAULT_LOCATION = {
  lat: 54.607868,
  lng: -5.926437
}

const GliderMap = withScriptjs(withGoogleMap(({ fetchStopInfo, selectedStop, stops }) => {
  return (
    <>
      <GoogleMap
        defaultZoom={11}
        defaultCenter={BELFAST_DEFAULT_LOCATION}
        center={BELFAST_DEFAULT_LOCATION}
      >
        {stops.map(stop => {
          return (
            <Marker
              key={stop.id}
              name={stop.name}
              position={{lat: stop.lat, lng: stop.lng}}
              onClick={() => fetchStopInfo(stop.id)}
            >
              {selectedStop.id === stop.id && <InfoWindow><p>{stop.name}</p></InfoWindow>}
            </Marker>
          )
        })}
      </GoogleMap>
    </>
  )
}))

export default GliderMap;
