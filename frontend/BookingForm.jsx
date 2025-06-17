import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './booking-form.css';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.eventType || !formData.date) {
      alert('Please fill all fields.');
      return;
    }

    navigate('/payment', { state: formData });
  };

  return (
    <div className="booking-container">
      <h2>Event Booking Form</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} value={formData.name} />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" onChange={handleChange} value={formData.phone} />
        </label>
        <label>
          Event Type:
          <select name="eventType" onChange={handleChange} value={formData.eventType}>
            <option value="">Select</option>
            <option value="Marriage">Marriage</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Feast">Feast</option>
          </select>
        </label>
        <label>
          Date:
          <input type="date" name="date" onChange={handleChange} value={formData.date} />
        </label>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default BookingForm;
