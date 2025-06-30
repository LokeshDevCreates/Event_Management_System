import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

const OrganizerProfile = () => {
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const organizerId = 'YOUR_ORGANIZER_ID'; // Replace or fetch from session/localStorage

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/organizers/${organizerId}`);
        setOrganizer(res.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizer();
  }, []);

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;
  if (!organizer) return null;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Organizer Profile</h3>
      <Card className="p-4 shadow">
        <Row>
          <Col md={4} className="text-center">
            <img
              src={organizer.profileImage ? `http://localhost:5000/${organizer.profileImage}` : '/default-avatar.png'}
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <h5 className="text-capitalize">{organizer.name}</h5>
            <p className="text-muted">{organizer.organization}</p>
          </Col>

          <Col md={8}>
            <Row className="mb-3">
              <Col sm={4}><strong>Email:</strong></Col>
              <Col sm={8}>{organizer.email}</Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4}><strong>Age:</strong></Col>
              <Col sm={8}>{organizer.age || 'N/A'}</Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4}><strong>Organization Type:</strong></Col>
              <Col sm={8}>{organizer.organization}</Col>
            </Row>
            {organizer.role && (
              <Row className="mb-3">
                <Col sm={4}><strong>Role:</strong></Col>
                <Col sm={8}>{organizer.role}</Col>
              </Row>
            )}
            {organizer.description && (
              <Row>
                <Col sm={4}><strong>Description:</strong></Col>
                <Col sm={8}>{organizer.description}</Col>
              </Row>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default OrganizerProfile;
