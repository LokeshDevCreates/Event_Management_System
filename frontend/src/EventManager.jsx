// 📦 Required dependencies:
// npm install react-bootstrap react-hook-form react-leaflet leaflet axios

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const EventManager = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [manualAddress, setManualAddress] = useState('');
  const [venues, setVenues] = useState([]);

  const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '', date: '', startTime: '', endTime: '',
      organizerId: '', organizerName: '', organizerEmail: '', organizerPhone: '',
      description: '', arrangements: [''], foodItems: [''], seats: '',
      price: '', offer: '', eventType: [''], eventImages: [''],
      location: { type: 'Point', coordinates: [] }
    }
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control, name: 'eventImages' });
  const { fields: foodFields, append: appendFood, remove: removeFood } = useFieldArray({ control, name: 'foodItems' });
  const { fields: arrangementFields, append: appendArrangement, remove: removeArrangement } = useFieldArray({ control, name: 'arrangements' });

  const eventTypes = ['Conference', 'Workshop', 'Seminar', 'Wedding', 'Family', 'Party', 'Concert', 'Exhibition', 'Trending', 'Hot', 'Mostbooked', 'Other'];

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setUserLocation(coords);
      setValue('location.coordinates', [coords[1], coords[0]]); // [lng, lat]

      // OPTIONAL: Simulate nearby venues (You can remove this if not needed)
      const mockVenues = [
        {
          name: 'Grand Venue Hall',
          lat: coords[0] + 0.01,
          lng: coords[1] + 0.01,
          address: '1st Street, City Center',
          image: 'https://via.placeholder.com/100',
          distance: calculateDistance(coords[0], coords[1], coords[0] + 0.01, coords[1] + 0.01)
        },
        {
          name: 'Lake View Auditorium',
          lat: coords[0] - 0.015,
          lng: coords[1] - 0.015,
          address: 'Lake Road, Uptown',
          image: 'https://via.placeholder.com/100',
          distance: calculateDistance(coords[0], coords[1], coords[0] - 0.015, coords[1] - 0.015)
        }
      ];
      setVenues(mockVenues);
    }, (err) => {
      console.warn("Geolocation error:", err.message);
    });
  }, [setValue]);

  // 📌 Distance calculation in KM
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (deg) => deg * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/events', data);
      alert('Event Created Successfully!');
      reset();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating event');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Create Event</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded bg-light">

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control {...register('name', { required: true })} placeholder="Enter name" />
              {errors.name && <small className="text-danger">Name is required</small>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Event Type</Form.Label>
              <Form.Select {...register('eventType.0', { required: true })}>
                <option value="">Select</option>
                {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </Form.Select>
              {errors.eventType && <small className="text-danger">Type required</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={3}><Form.Group className="mb-3"><Form.Label>Date</Form.Label><Form.Control type="date" {...register('date')} /></Form.Group></Col>
          <Col md={3}><Form.Group className="mb-3"><Form.Label>Start</Form.Label><Form.Control type="time" {...register('startTime')} /></Form.Group></Col>
          <Col md={3}><Form.Group className="mb-3"><Form.Label>End</Form.Label><Form.Control type="time" {...register('endTime')} /></Form.Group></Col>
          <Col md={3}><Form.Group className="mb-3"><Form.Label>Seats</Form.Label><Form.Control type="number" {...register('seats')} /></Form.Group></Col>
        </Row>

        <Row>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Price</Form.Label><Form.Control type="number" {...register('price')} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Offer</Form.Label><Form.Control {...register('offer')} /></Form.Group></Col>
        </Row>

        <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={2} {...register('description')} /></Form.Group>

        {/* Organizer Info */}
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Organizer Name</Form.Label><Form.Control {...register('organizerName', { required: true })} /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" {...register('organizerEmail', { required: true })} /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Phone</Form.Label><Form.Control {...register('organizerPhone', { required: true })} /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Organizer ID</Form.Label><Form.Control {...register('organizerId', { required: true })} /></Form.Group></Col>
        </Row>

        {/* Location */}
        <Form.Group className="mb-3">
          <Form.Label>Location Address (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Manual location address"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
          />
          <Form.Text className="text-muted">You can enter a venue address manually.</Form.Text>
        </Form.Group>

        {/* Food + Arrangements */}
        <Row>
          <Col md={6}>
            <Form.Label>Food Items</Form.Label>
            {foodFields.map((item, index) => (
              <InputGroup className="mb-2" key={item.id}>
                <Form.Control {...register(`foodItems.${index}`)} />
                <Button variant="outline-danger" onClick={() => removeFood(index)}>X</Button>
              </InputGroup>
            ))}
            <Button size="sm" onClick={() => appendFood('')}>+ Add</Button>
          </Col>

          <Col md={6}>
            <Form.Label>Arrangements</Form.Label>
            {arrangementFields.map((item, index) => (
              <InputGroup className="mb-2" key={item.id}>
                <Form.Control {...register(`arrangements.${index}`)} />
                <Button variant="outline-danger" onClick={() => removeArrangement(index)}>X</Button>
              </InputGroup>
            ))}
            <Button size="sm" onClick={() => appendArrangement('')}>+ Add</Button>
          </Col>
        </Row>

        {/* Images */}
        <Form.Label className="mt-3">Event Images</Form.Label>
        {imageFields.map((field, index) => (
          <div key={field.id} className="mb-2">
            <InputGroup>
              <Form.Control {...register(`eventImages.${index}`)} placeholder="Image URL" />
              <Button variant="outline-danger" onClick={() => removeImage(index)}>X</Button>
            </InputGroup>
            {watch(`eventImages.${index}`) && (
              <img src={watch(`eventImages.${index}`)} alt="Preview" style={{ height: '100px' }} className="mt-2" />
            )}
          </div>
        ))}
        <Button size="sm" onClick={() => appendImage('')}>+ Add Image</Button>

        <div className="mt-4 text-center">
          <Button type="submit" variant="success">Create Event</Button>
        </div>
      </Form>

      {/* Map View */}
      {userLocation && (
        <div className="mt-5">
          <h5>Map Preview (Your Location & Nearby Venues)</h5>
          <MapContainer center={userLocation} zoom={14} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userLocation}>
              <Popup>Your Location (Organizer)</Popup>
            </Marker>
            {venues.map((venue, idx) => (
              <Marker key={idx} position={[venue.lat, venue.lng]}>
                <Popup>
                  <strong>{venue.name}</strong><br />
                  {venue.address}<br />
                  <img src={venue.image} alt={venue.name} style={{ width: '100px' }} /><br />
                  Distance: {venue.distance?.toFixed(2)} km
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default EventManager;
