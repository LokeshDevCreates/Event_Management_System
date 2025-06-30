import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Row, Col, Spinner, Alert } from 'react-bootstrap';

const BookingViewer = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState(''); // '', 'confirmed', 'cancelled'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const organizerId = 'YOUR_ORGANIZER_ID'; // TODO: Replace or fetch dynamically

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/bookings/organizer/${organizerId}`, {
        params: status ? { status } : {},
      });
      setBookings(res.data);
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [status]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Recent Bookings</h3>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>User</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Booked On</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.eventId?.name || 'N/A'}</td>
                <td>{booking.userName || 'N/A'}</td>
                <td>{booking.seats}</td>
                <td>{booking.status}</td>
                <td>{new Date(booking.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BookingViewer;
