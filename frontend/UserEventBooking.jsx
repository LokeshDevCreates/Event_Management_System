import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserEventBooking.css";

const events = [
  {
    title: "Royal Wedding Expo",
    description: "Plan your dream marriage ceremony.",
    image: "https://i.ytimg.com/vi/EpZY2bvZ_aY/maxresdefault.jpg",
  },
  {
    title: "National Football Final",
    description: "Cheer for your favourite team!",
    image: "https://images.moneycontrol.com/static-mcnews/2022/12/AP22352513324776.jpg",
  },
  {
    title: "Classical Dance Night",
    description: "Celebrate cultural heritage & art.",
    image: "https://tse1.mm.bing.net/th/id/OIP.yzbKPjvD2RMuDhaiwUNrDQHaEo?rs=1&pid=ImgDetMain.jpg",
  },
  {
    title: "Harvest Feast Carnival",
    description: "Enjoy mouth‑watering food festivals.",
    image: "https://tse3.mm.bing.net/th/id/OIP.qnJNQ_6r6FOM9HO-qSsajwHaEc?rs=1&pid=ImgDetMain.jpg",
  },
  {
    title: "Tech Innovators Summit",
    description: "Experience trending tech talks.",
    image: "https://tse1.mm.bing.net/th/id/OIP.XZIwLainEPgi__0xPE3b9gHaEK?rs=1&pid=ImgDetMain.jpg"
  },
  {
    title: "High‑Fashion Runway",
    description: "Witness the latest fashion trends.",
    image: "https://tse3.mm.bing.net/th/id/OIP.Y8TTy5P-My3CL-WtQKSluQHaEK?rs=1&pid=ImgDetMain",
  },
  {
    title: "Rock Music Concert",
    description: "Feel the vibe of live bands!",
    image: "https://tse4.mm.bing.net/th/id/OIP.SN59DWznaat8wgqrSrYFSwHaE8?rs=1&pid=ImgDetMain",
  },
  {
    title: "Corporate Leadership Forum",
    description: "Network with industry leaders.",
    image: "https://tse3.mm.bing.net/th/id/OIP.oEe7vDs-1ZV3qb7pimmU_gHaE4?w=1282&h=846&rs=1&pid=ImgDetMain",
  },
  {
    title: "City Marathon 2025",
    description: "Push your limits on the track.",
    image: "https://tse4.mm.bing.net/th/id/OIP.g0v7ZQPyDiiCVenTqfl9rQHaE8?rs=1&pid=ImgDetMainL",
  },
  {
    title: "Outdoor Movie Night",
    description: "Enjoy cinema under the stars.",
    image: "https://tse2.mm.bing.net/th/id/OIP.7q4qJaIkoE9iUjhTBejl6wHaHm?rs=1&pid=ImgDetMain",
  },
];

export default function UserEventBooking() {
  const navigate = useNavigate();
  return (
    <div className="event-page">
      <header className="hero-banner">
        <h1>Welcome to Our Event Booking Platform</h1>
        <p>Find the perfect event for any occasion</p>
      </header>

      <div className="event-grid">
        {events.map((evt, idx) => (
          <div className="event-card" key={idx}>
            <img src={evt.image} alt={evt.title} />
            <div className="event-info">
              <h3>{evt.title}</h3>
              <p>{evt.description}</p>
              <button onClick={() => navigate("/booking")}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
