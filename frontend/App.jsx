import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventId: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/registrations', formData);
      setMessage('✅ Registration successful!');
      setFormData({ fullName: '', email: '', phone: '', eventId: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Registration failed.');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h1 style={{ color: 'white' }}>Join Our Global Event</h1>
          <p style={{ color: 'white', marginBottom: '30px' }}>
            Network with industry leaders and explore cutting-edge technology.
          </p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required style={styles.input} />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={styles.input} />
            <input name="eventId" placeholder="Event ID" value={formData.eventId} onChange={handleChange} required style={styles.input} />
            <button type="submit" style={styles.button}>Register</button>
            {message && <p style={{ color: 'white', marginTop: '10px' }}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url("https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    maxWidth: '500px',
    padding: '40px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default App;
