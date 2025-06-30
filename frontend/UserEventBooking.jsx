// File: src/UserEventBooking.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserEventBooking.css";
import { useEvent } from "./EventContext";

export default function UserEventBooking() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { setSelectedEvent } = useEvent();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleViewDirections = (venueCoords) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
          const destination = `${venueCoords.lat},${venueCoords.lng}`;
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
          window.open(mapsUrl, "_blank");
        },
        () => {
          alert("Location access denied. Enable location to view directions.");
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  const filteredEvents = events.filter(
    (evt) =>
      evt.title?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || evt.category === category)
  );

  return (
    <div className="event-page">
      {/* Top Bar */}
      <div className="top-bar">
        {/* Profile Dropdown */}
        <div className="profile-section" style={{ position: "relative" }}>
          <div
            className="profile"
            style={{ cursor: "pointer" }}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            👤 My Profile ▾
          </div>

          {showProfileDropdown && (
            <div
              className="dropdown"
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "#fff",
                border: "1px solid #ccc",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 1000,
              }}
            >
              <p style={{ margin: 0, padding: "5px 0", cursor: "pointer" }}>View Profile</p>
              <p style={{ margin: 0, padding: "5px 0", cursor: "pointer" }}>Settings</p>
              <p style={{ margin: 0, padding: "5px 0", cursor: "pointer" }}>Logout</p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Header */}
      <header className="hero-banner">
        <h1 className="typewriter-text">Welcome to Our Event Booking Platform</h1>
        <p>Find the perfect event for any occasion</p>
      </header>

      {/* Events Grid */}
      <div className="event-grid">
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          filteredEvents.map((evt, idx) => (
            <div
              className={`event-card ${expandedIndex === idx ? "expanded" : ""}`}
              key={evt._id || idx}
              onClick={() => setExpandedIndex(idx === expandedIndex ? null : idx)}
            >
              <img
                src={evt.image || "https://placehold.co/600x400?text=No+Image"}
                alt={evt.title}
              />
              <div className="event-info">
                <h3>{evt.title}</h3>
                <p>{evt.description}</p>

                {expandedIndex === idx && (
                  <div className="details">
                    {evt.date && <p><strong>Date:</strong> {evt.date}</p>}
                    {evt.time && <p><strong>Time:</strong> {evt.time}</p>}
                    {evt.price && <p><strong>Price:</strong> ₹{evt.price}</p>}
                    {evt.offer && <p><strong>Offer:</strong> {evt.offer}</p>}
                    {evt.seats && (
                      <p>
                        <strong>Seats:</strong> {evt.bookedSeats || 0}/{evt.seats}
                      </p>
                    )}
                    {evt.foodItems && (
                      <p>
                        <strong>Food:</strong> {evt.foodItems.join(", ")}
                      </p>
                    )}
                    {evt.arrangements && (
                      <p>
                        <strong>Arrangements:</strong> {evt.arrangements.join(", ")}
                      </p>
                    )}
                  </div>
                )}

                <div className="event-info-buttons">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(evt);
                      navigate("/booking");
                    }}
                  >
                    Book Now
                  </button>
                  {evt.venueCoords && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDirections(evt.venueCoords);
                      }}
                    >
                      📍 View Directions
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
