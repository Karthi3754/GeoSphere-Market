import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  GoogleMap, 
  Marker,
  useLoadScript 
} from '@react-google-maps/api';
import config from '../config';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

const Map = ({ location = null }) => {
  const mapRef = useRef();
  const [showFallback, setShowFallback] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    libraries: ['places'],
    googleMapsApiKey: config.googleMapsApiKey
  });

  useEffect(() => {
    console.log('Google Maps API key status:', config.googleMapsApiKey ? 'Present' : 'Missing');
    if (loadError) {
      console.error('Google Maps load error:', loadError);
      setShowFallback(true);
    }
  }, [loadError]);

  useEffect(() => {
    if (location && mapRef.current && isLoaded) {
      mapRef.current.panTo(location);
    }
  }, [location, isLoaded]);

  const openInGoogleMaps = () => {
    if (location) {
      window.open(`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15`, '_blank');
    }
  };

  if (loadError || showFallback) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 border border-gray-200 rounded-lg h-96">
        <p className="mb-4 text-red-500">Failed to load Google Maps</p>
        {location && (
          <button
            onClick={openInGoogleMaps}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Open in Google Maps
          </button>
        )}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full border border-gray-200 rounded-lg h-96">
        <p>Loading map...</p>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex items-center justify-center w-full border border-gray-200 rounded-lg h-96">
        <p>Location data not available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full border border-gray-200 rounded-lg h-96">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
        options={{
          streetViewControl: true,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: []
        }}
        onLoad={map => mapRef.current = map}
      >
        {location && (
          <Marker 
            position={location}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new window.google.maps.Size(32, 32)
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

Map.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  })
};

export default Map;
