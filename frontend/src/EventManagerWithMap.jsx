// EventManagerWithMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const flyToLocation = (map, lat, lng) => {
  map.flyTo([lat, lng], 14);
};

function MapFly({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) flyToLocation(map, lat, lng);
  }, [lat, lng]);
  return null;
}

const EventManagerWithMap = ({ organizerLocation, manuallyEnteredAddress, venues }) => {
  const [geoCoords, setGeoCoords] = useState(null);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // India center default

  useEffect(() => {
    if (manuallyEnteredAddress) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              q: manuallyEnteredAddress,
              format: 'json',
              limit: 1,
            },
          });
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const coords = [parseFloat(lat), parseFloat(lon)];
            setGeoCoords(coords);
            setMapCenter(coords);
          } else {
            setError('Address not found');
          }
        } catch (err) {
          setError('Failed to geocode location');
        }
      };
      fetchCoordinates();
    }
  }, [manuallyEnteredAddress]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // in km
  };

  return (
    <div style={{ height: '500px', width: '100%', marginTop: '1rem' }}>
      <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoCoords && <MapFly lat={geoCoords[0]} lng={geoCoords[1]} />}

        {/* Marker for manually entered address */}
        {geoCoords && (
          <Marker position={geoCoords} icon={defaultIcon}>
            <Popup>
              <strong>Manually Entered Location</strong>
              <br />
              {manuallyEnteredAddress}
            </Popup>
          </Marker>
        )}

        {/* Marker for organizer location */}
        {organizerLocation && (
          <Marker position={organizerLocation} icon={defaultIcon}>
            <Popup>
              <strong>Organizer</strong>
              <br />
              Lat: {organizerLocation[0]}<br />
              Lng: {organizerLocation[1]}
            </Popup>
          </Marker>
        )}

        {/* Markers for nearby venues */}
        {venues.map((venue, idx) => (
          <Marker key={idx} position={venue.coordinates} icon={defaultIcon}>
            <Popup>
              <strong>{venue.name}</strong>
              <br />{venue.address}
              <br />Distance: {organizerLocation ? calculateDistance(organizerLocation[0], organizerLocation[1], venue.coordinates[0], venue.coordinates[1]) : 'N/A'} km
              {venue.image && <img src={venue.image} alt="Venue" style={{ width: '100%', marginTop: '5px' }} />}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EventManagerWithMap;
