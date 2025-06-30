import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm ,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import venueSchema from  "../schemas/VenueSchema";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";

const VenueManager = () => {
  const [venues, setVenues] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  const API = "http://localhost:5000/api/venues";

  // Load venues on mount
  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await axios.get(API);
      setVenues(res.data);
    } catch (err) {
      console.error("Failed to load venues:", err);
    }
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      amenities: data.amenities.split(",").map((item) => item.trim()),
    };

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, formattedData);
        setEditingId(null);
      } else {
        await axios.post(API, formattedData);
      }

      fetchVenues(); // Refresh
      reset();       // Clear form
    } catch (err) {
      console.error("Error saving venue:", err);
    }
  };

  const handleEdit = (venue) => {
    setEditingId(venue._id);
    setValue("name", venue.name);
    setValue("location", venue.location);
    setValue("capacity", venue.capacity);
    setValue("amenities", venue.amenities.join(", "));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this venue?")) {
      try {
        await axios.delete(`${API}/${id}`);
        fetchVenues();
      } catch (err) {
        console.error("Error deleting venue:", err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">{editingId ? "Edit Venue" : "Add New Venue"}</h3>

      <Card className="p-4 shadow-sm mb-5">
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                {...register("location")}
                isInvalid={!!errors.location}
              />
              <Form.Control.Feedback type="invalid">
                {errors.location?.message}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>no of seats</Form.Label>
              <Form.Control
                type="number"
                {...register("capacity")}
                isInvalid={!!errors.capacity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.capacity?.message}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>requirements/Facilities</Form.Label>
              <Form.Control
                type="text"
                {...register("amenities")}
                isInvalid={!!errors.amenities}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amenities?.message}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="w-100">
            {editingId ? "Update Venue" : "Add Venue"}
          </Button>
        </Form>
      </Card>

      <h4 className="mb-3">Existing Venues</h4>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>no of seats</th>
            <th>Amenities</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue._id}>
              <td>{venue.name}</td>
              <td>{venue.location}</td>
              <td>{venue.capacity}</td>
              <td>{venue.amenities.join(", ")}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(venue)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(venue._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {venues.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No venues found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default VenueManager;
