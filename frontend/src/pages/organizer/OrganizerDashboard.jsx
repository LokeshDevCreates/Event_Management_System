
import React, { useState } from "react";
import { FaCalendarAlt, FaUsers, FaCrown, FaMoon, FaSun } from "react-icons/fa";
import "./dashboard.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const OrganizerDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const bookingData = [
    { name: "Mon", bookings: 45 },
    { name: "Tue", bookings: 78 },
    { name: "Wed", bookings: 63 },
    { name: "Thu", bookings: 97 },
    { name: "Fri", bookings: 51 },
    { name: "Sat", bookings: 88 },
    { name: "Sun", bookings: 72 },
  ];

  const revenueData = [
    { name: "Week 1", revenue: 1200 },
    { name: "Week 2", revenue: 1950 },
    { name: "Week 3", revenue: 1680 },
    { name: "Week 4", revenue: 2340 },
  ];

  return (
    <div
      className="dashboard d-flex"
      style={{
        background: isDarkMode
          ? "linear-gradient(to right, #1f1f1f, #3c3c3c)"
          : "linear-gradient(to right, #dbe9f4, #e2f0ff)",
        color: isDarkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      <div className="dashboard-main p-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className={isDarkMode ? "text-light" : "text-dark"}>
            👋 Welcome Back, Organizer!
          </h2>
          <button
            className="btn btn-outline-secondary rounded-circle"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div
              className="glass-card text-white p-3 shadow-lg rounded-4 border border-light"
              style={{
                background: "linear-gradient(135deg, #f7971e, #ffd200)",
              }}
            >
              <FaCalendarAlt size={28} className="mb-2" />
              <h5>Total Events</h5>
              <h2>12</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="glass-card text-white p-3 shadow-lg rounded-4 border border-light"
              style={{
                background: "linear-gradient(135deg, #00b09b, #96c93d)",
              }}
            >
              <FaUsers size={28} className="mb-2" />
              <h5>Total Bookings</h5>
              <h2>350</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="glass-card text-white p-3 shadow-lg rounded-4 border border-light"
              style={{
                background: "linear-gradient(135deg, #f953c6, #b91d73)",
              }}
            >
              <FaCalendarAlt size={28} className="mb-2" />
              <h5>Today's Events</h5>
              <h2>4</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="glass-card text-white p-3 shadow-lg rounded-4 border border-light"
              style={{
                background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
              }}
            >
              <FaCrown size={28} className="mb-2" />
              <h5>Revenue Today</h5>
              <h2>$580</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="glass-card text-white p-3 shadow-lg rounded-4 border border-light"
              style={{
                background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
              }}
            >
              <FaCrown size={28} className="mb-2" />
              <h5>Top Event</h5>
              <h2>AI Summit 2025</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="glass-card text-white p-3 shadow-lg rounded-4 border border-light"
              style={{
                background: "linear-gradient(135deg, #7F00FF, #E100FF)",
              }}
            >
              <FaUsers size={28} className="mb-2" />
              <h5>Active Users</h5>
              <h2>124</h2>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div
          className="glass-card p-4 mb-4 shadow rounded-4 border border-light"
          style={{
            background: "#b9fbc0",
            color: "#1a1a1a",
          }}
        >
          <h5 className="mb-3">📍 Upcoming Events</h5>
          <ul className="list-unstyled">
            <li className="mb-2">🔔 <strong>AI Workshop</strong> – 24 July, 10:00 AM</li>
            <li className="mb-2">🎤 <strong>Tech Talk</strong> – 26 July, 2:00 PM</li>
            <li>📍 <strong>Startup Meetup</strong> – 30 July, 11:00 AM</li>
          </ul>
        </div>

        {/* Booking Stats Chart */}
        <div
          className="glass-card p-4 mb-4 shadow rounded-4 border border-light"
          style={{ background: isDarkMode ? "#2d2d2d" : "#ffffffa1" }}
        >
          <h5 className="mb-3">📈 Weekly Booking Stats</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00c853" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#555" : "#ccc"} />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#fff" : "#333"}
                label={{
                  value: "Days of the Week",
                  position: "insideBottom",
                  offset: -5,
                  fill: isDarkMode ? "#fff" : "#333",
                  fontSize: 14,
                }}
              />
              <YAxis
                stroke={isDarkMode ? "#fff" : "#333"}
                label={{
                  value: "Number of Bookings",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  fill: isDarkMode ? "#fff" : "#333",
                  fontSize: 14,
                }}
              />
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#333" : "#fff", color: isDarkMode ? "#fff" : "#000" }} />
              <Legend wrapperStyle={{ color: isDarkMode ? "#fff" : "#000" }} />
              <Bar dataKey="bookings" fill="url(#colorBookings)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div
          className="glass-card p-4 shadow rounded-4 border border-light"
          style={{ background: isDarkMode ? "#2d2d2d" : "#ffffffa1" }}
        >
          <h5 className="mb-3">💰 Monthly Revenue Overview</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#42e695" stopOpacity={1} />
                  <stop offset="100%" stopColor="#3bb2b8" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#555" : "#ccc"} />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#fff" : "#333"}
                label={{
                  value: "Weeks of the Month",
                  position: "insideBottom",
                  offset: -5,
                  fill: isDarkMode ? "#fff" : "#333",
                  fontSize: 14,
                }}
              />
              <YAxis
                stroke={isDarkMode ? "#fff" : "#333"}
                label={{
                  value: "Revenue ($)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  fill: isDarkMode ? "#fff" : "#333",
                  fontSize: 14,
                }}
              />
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#333" : "#fff", color: isDarkMode ? "#fff" : "#000" }} />
              <Legend wrapperStyle={{ color: isDarkMode ? "#fff" : "#000" }} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="url(#lineGradient)"
                strokeWidth={4}
                dot={{ r: 6, stroke: "#fff", strokeWidth: 2, fill: "#00d8ff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
