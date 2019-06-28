import React from 'react';
import MapGL, { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';

import 'mapbox-gl/dist/mapbox-gl.css'; // eslint-disable-line

const Mapa = ({ handleClick, onViewportChange, markers, ...rest }) => (
  <MapGL
    {...rest}
    onClick={handleClick}
    mapStyle="mapbox://styles/mapbox/basic-v9"
    mapboxApiAccessToken="pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
    onViewportChange={onViewportChange}
  >
    {markers.map(marker => (
      <Marker
        key={marker.id}
        longitude={marker.lngLat[0]}
        latitude={marker.lngLat[1]}
        onClick={handleClick}
        captureClick
      >
        <img
          style={{
            borderRadius: 100,
            width: 48,
            height: 48
          }}
          alt="map"
          src={marker.src}
        />
      </Marker>
    ))}
  </MapGL>
);

Mapa.propTypes = {
  handleClick: PropTypes.func.isRequired,
  onViewportChange: PropTypes.func.isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      lngLat: PropTypes.array.isRequired
    })
  )
};

Mapa.defaultProps = {
  markers: []
};

export default Mapa;
