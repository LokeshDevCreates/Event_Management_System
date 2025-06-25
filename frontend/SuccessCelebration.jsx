import React, { useEffect } from 'react';
import './success-celebration.css';

const SuccessCelebration = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const curtain = document.createElement("div");
      curtain.className = "confetti";
      curtain.style.left = Math.random() * 100 + "vw";
      curtain.style.animationDuration = Math.random() * 2 + 3 + "s";
      document.body.appendChild(curtain);
      setTimeout(() => {
        curtain.remove();
      }, 5000);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const ticketText = `
🎟️ Event Ticket
-----------------------------
Event: Sample Event
Date: 2025-07-01
Venue: Main Auditorium
Seat: A12

✅ Thank you for booking with us!
    `;
    const blob = new Blob([ticketText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "event_ticket.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="celebration-wrapper">
      <h1>🎉 Booking Confirmed! 🎊</h1>
      <p>Your ticket is ready. Download it below:</p>
      <button
        onClick={handleDownload}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          fontSize: "16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Download Ticket 🎟️
      </button>
    </div>
  );
};

export default SuccessCelebration;
