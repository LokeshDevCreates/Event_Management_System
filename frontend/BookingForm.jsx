// File: src/BookingForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "./EventContext";
import "./booking-form.css";

const BookingForm = () => {
  const navigate = useNavigate();
  const { selectedEvent } = useEvent();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [seats, setSeats] = useState(1);

  if (!selectedEvent) return <p>No event selected!</p>;

  const handleBooking = async () => {
    if (!userName || !userEmail || !userPhone || seats < 1) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: selectedEvent._id,
          userName,
          userEmail,
          userPhone,
          seatsBooked: Number(seats),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking successful!");
        navigate("/payment");
      } else {
        alert(data.error || "Booking failed!");
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Booking: {selectedEvent.title}</h2>
      <p><strong>Date:</strong> {selectedEvent.date}</p>
      <p><strong>Location:</strong> {selectedEvent.location}</p>
      <p><strong>Price:</strong> ₹{selectedEvent.price}</p>

      {/* Booking Form */}
      <div className="booking-form">
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
        />
        <input
          type="number"
          placeholder="Seats"
          value={seats}
          min={1}
          onChange={(e) => setSeats(e.target.value)}
        />
        <button onClick={handleBooking}>Continue to Payment</button>
      </div>
    </div>
  );
};

export default BookingForm;
