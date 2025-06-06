import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventId: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/registrations', formData);
      setMessage('✅ Registration successful!');
      setFormData({ fullName: '', email: '', phone: '', eventId: '' });
    } catch (error) {
      console.error(error);
      setMessage('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="eventId"
          placeholder="Event ID"
          value={formData.eventId}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '300px'
  },
  input: {
    padding: '10px',
    fontSize: '1rem'
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }
};

export default RegistrationForm;
