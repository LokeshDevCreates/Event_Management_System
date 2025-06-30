import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrganizerSchema from '../schemas/OrganizerSchema';
import { useNavigate } from 'react-router-dom';

const OrganizerForm = () => {
  const navigate = useNavigate();
  const [orgType, setOrgType] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(OrganizerSchema)
  });

  const watchOrgType = watch('organizationType');

  useEffect(() => {
    setOrgType(watchOrgType);
  }, [watchOrgType]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        if (key === 'profileImage') {
          formData.append('profileImage', data.profileImage[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      await axios.post('/api/organizers/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Registration successful. Organizer ID sent via email.');
      reset();

      // Wait 2 seconds before navigating
      setTimeout(() => navigate('/organizer-login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <ToastContainer />
      <Card className="p-4 shadow-sm" style={{ width: '600px' }}>
        <h3 className="text-center mb-3">Organizer Registration</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control {...register('name')} />
                <small className="text-danger">{errors.name?.message}</small>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control {...register('age')} />
                <small className="text-danger">{errors.age?.message}</small>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register('email')} />
                <small className="text-danger">{errors.email?.message}</small>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control {...register('phone')} />
                <small className="text-danger">{errors.phone?.message}</small>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...register('password')} />
                <small className="text-danger">{errors.password?.message}</small>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" {...register('confirmPassword')} />
                <small className="text-danger">{errors.confirmPassword?.message}</small>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Organization Type</Form.Label>
            <Form.Select {...register('organizationType')}>
              <option value="">Select type</option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
              <option value="college">College</option>
              <option value="ngo">NGO</option>
              <option value="others">Others</option>
            </Form.Select>
            <small className="text-danger">{errors.organizationType?.message}</small>
          </Form.Group>

          {['company', 'college', 'ngo'].includes(orgType) && (
            <Form.Group className="mb-3">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control {...register('organizationName')} />
              <small className="text-danger">{errors.organizationName?.message}</small>
            </Form.Group>
          )}

          {['individual', 'company', 'college', 'ngo'].includes(orgType) && (
            <Form.Group className="mb-3">
              <Form.Label>Profession</Form.Label>
              <Form.Control {...register('profession')} />
              <small className="text-danger">{errors.profession?.message}</small>
            </Form.Group>
          )}

          {orgType === 'others' && (
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} {...register('description')} />
              <small className="text-danger">{errors.description?.message}</small>
            </Form.Group>
          )}

          <Form.Group className="mb-4">
            <Form.Label>Profile Image (Optional)</Form.Label>
            <Form.Control type="file" {...register('profileImage')} />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">Register</Button>

          <p className="text-center mt-3">
            Already have an account? <a href="/organizer-login">Login here</a>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default OrganizerForm;
