import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserEventBooking.css";

const events = [
  {
    title: "Royal Wedding Expo",
    category: "Marriage",
    description: "Plan your dream marriage ceremony.",
    image: "https://i.ytimg.com/vi/EpZY2bvZ_aY/maxresdefault.jpg",
    venueCoords: { lat: 13.0639, lng: 80.2436 }
  },
  {
    title: "National Football Final",
    category: "Sports",
    description: "Cheer for your favourite team!",
    image: "https://images.moneycontrol.com/static-mcnews/2022/12/AP22352513324776.jpg",
    venueCoords: { lat: 13.0726, lng: 80.2611 }
  },
  {
    title: "Classical Dance Night",
    category: "Cultural",
    description: "Celebrate cultural heritage & art.",
    image: "https://tse1.mm.bing.net/th/id/OIP.yzbKPjvD2RMuDhaiwUNrDQHaEo?rs=1&pid=ImgDetMain",
    venueCoords: { lat: 13.0067, lng: 80.2643 }
  },
  {
    title: "Harvest Feast Carnival",
    category: "Feast",
    description: "Enjoy mouth-watering food festivals.",
    image: "https://tse3.mm.bing.net/th/id/OIP.qnJNQ_6r6FOM9HO-qSsajwHaEc?rs=1&pid=ImgDetMain",
    venueCoords: { lat: 12.9900, lng: 80.2167 }
  },
  {
    title: "Tech Innovators Summit",
    category: "Tech",
    description: "Experience trending tech talks.",
    image: "https://tse1.mm.bing.net/th/id/OIP.XZIwLainEPgi__0xPE3b9gHaEK?rs=1&pid=ImgDetMain",
    venueCoords: { lat: 13.0067, lng: 80.1804 }
  },
  {
    title: "High-Fashion Runway",
    category: "Fashion",
    description: "Witness the latest fashion trends.",
    image: "https://tse3.mm.bing.net/th/id/OIP.Y8TTy5P-My3CL-WtQKSluQHaEK?rs=1&pid=ImgDetMain",
    venueCoords: { lat: 13.0106, lng: 80.2218 }
  },
  {
    title: "Rock Music Concert",
    category: "Music",
    description: "Feel the vibe of live bands!",
    image: "https://tse4.mm.bing.net/th/id/OIP.SN59DWznaat8wgqrSrYFSwHaE8?rs=1&pid=ImgDetMain",
    venueCoords: { lat: 13.0400, lng: 80.2480 }
  },
  {
    title: "Corporate Leadership Forum",
    category: "Business",
    description: "Network with industry leaders.",
    image: "https://tse3.mm.bing.net/th/id/OIP.oEe7vDs-1ZV3qb7pimmU_gHaE4?w=1282&h=846&rs=1&pid=ImgDetMain",
    venueCoords: { lat: 13.0613, lng: 80.2519 }
  },
  {
    title: "City Marathon 2025",
    category: "Sports",
    description: "Push your limits on the track.",
    image: "https://tse4.mm.bing.net/th/id/OIP.g0v7ZQPyDiiCVenTqfl9rQHaE8?rs=1&pid=ImgDetMain",
    venueCoords: { lat: 13.0499, lng: 80.2824 }
  },
  {
    title: "Outdoor Movie Night",
    category: "Entertainment",
    description: "Enjoy cinema under the stars.",
    image: "https://tse2.mm.bing.net/th/id/OIP.7q4qJaIkoE9iUjhTBejl6wHaHm?rs=1&pid=ImgDetMain",
    venueCoords: { lat: 13.0732, lng: 80.2641 }
  },
  {
    title: "Startup Pitch Fest",
    category: "Business",
    description: "Pitch your ideas to top investors.",
    image: "https://th.bing.com/th/id/OIP.88EX7hHACO3wHBLJulXW6gHaES?w=301&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3.jpg",
    venueCoords: { lat: 13.0077, lng: 80.2379 }
  },
  {
    title: "Cosplay & Comic Carnival",
    category: "Cultural",
    description: "Unleash your inner superhero!",
    image: "https://th.bing.com/th/id/OIP.hp4D-RmsME7xSQtlVmqY7gHaFj?rs=1&pid=ImgDetMain&cb=idpwebpc2",
    venueCoords: { lat: 13.0666, lng: 80.2444 }
  }
 

];



export default function UserEventBooking() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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
      evt.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || evt.category === category)
  );

  return (
    <div className="event-page">
      {/* Top Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        background: "#1f2937",
        borderBottom: "1px solid #ddd"
      }}>
        <div style={{ fontWeight: "bold" }}>👤 My Profile</div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #ccc"}}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value="All">All Categories</option>
            {[...new Set(events.map((e) => e.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <header className="hero-banner">
       

        <h1 className="typewriter-text">Welcome to Our Event Booking Platform</h1>
        <p>Find the perfect event for any occasion</p>
      </header>

      <div className="event-grid">
        {filteredEvents.map((evt, idx) => (
          <div className="event-card" key={idx}>
            <img src={evt.image || "https://placehold.co/600x400?text=No+Image"} alt={evt.title} />
            <div className="event-info">
              <h3>{evt.title}</h3>
              <p>{evt.description}</p>
              <div className="event-info-buttons">
                <button onClick={() => navigate("/booking")}>Book Now</button>
                <button onClick={() => handleViewDirections(evt.venueCoords)}>📍 View Directions</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
