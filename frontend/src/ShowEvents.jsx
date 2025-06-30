import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, searchTerm, eventTypeFilter]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...events];

    if (searchTerm.trim()) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (eventTypeFilter) {
      filtered = filtered.filter(e =>
        e.eventType?.includes(eventTypeFilter)
      );
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Show Events</h3>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by event name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
          >
            <option value="">All Event Types</option>
            {[ 'Conference', 'Workshop', 'Seminar', 'Wedding','Family', 'Party', 'Concert', 'Exhibition','Trending','Hot','Mostbooked', 'Other' ].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredEvents.map(event => (
          <Col md={4} className="mb-4" key={event._id}>
            <Card onClick={() => setSelectedEvent(event)} style={{ cursor: 'pointer' }}>
              {event.eventImages?.[0] && (
                <Card.Img variant="top" src={event.eventImages[0]} height="200" style={{ objectFit: 'cover' }} />
              )}
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text><strong>Date:</strong> {event.date}</Card.Text>
                <Card.Text><strong>Location:</strong> {event.location}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={!!selectedEvent} onHide={() => setSelectedEvent(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent?.eventImages?.length > 0 && (
            <Row className="mb-3">
              {selectedEvent.eventImages.map((img, idx) => (
                <Col md={4} key={idx} className="mb-2">
                  <img src={img} alt={`event-img-${idx}`} className="img-fluid rounded" />
                </Col>
              ))}
            </Row>
          )}
          <p><strong>Date:</strong> {selectedEvent?.date}</p>
          <p><strong>Time:</strong> {selectedEvent?.startTime} - {selectedEvent?.endTime}</p>
          <p><strong>Location:</strong> {selectedEvent?.location}</p>
          <p><strong>Type:</strong> {selectedEvent?.eventType?.join(', ')}</p>
          <p><strong>Price:</strong> ₹{selectedEvent?.price}</p>
          <p><strong>Seats:</strong> {selectedEvent?.seats}</p>
          <p><strong>Booked Seats:</strong> {selectedEvent?.bookedSeats}</p>
          <p><strong>Description:</strong> {selectedEvent?.description}</p>
          <p><strong>Arrangements:</strong> {selectedEvent?.arrangements?.join(', ')}</p>
          <p><strong>Food Items:</strong> {selectedEvent?.foodItems?.join(', ')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedEvent(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowEvents;
