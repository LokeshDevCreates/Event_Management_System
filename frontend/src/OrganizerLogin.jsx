import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import navigate

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const OrganizerLogin = () => {
  const navigate = useNavigate(); // ⬅️ Initialize useNavigate()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/organizers/login', data);
      alert('Login successful!');
      
      // Optional: Store organizer ID for session tracking
      localStorage.setItem('organizerId', response.data.organizerId);

      // ✅ Redirect to organizer dashboard
      navigate('/organizer');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="p-4 shadow-sm">
        <h3 className="text-center mb-4">Organizer Login</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Email</strong></Form.Label>
            <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Password</strong></Form.Label>
            <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account? <a href="/organizer-register">Register here</a>
        </p>
      </Card>
    </Container>
  );
};

export default OrganizerLogin;
