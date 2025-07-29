import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarPlus,
  FaClipboardList,
  FaRegCalendar,
  FaUser,
  FaCogs,
} from "react-icons/fa";
import "./sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar glass-sidebar d-flex flex-column p-3">
      <h4 className="text-white mb-4">📅 Organizer Panel</h4>

      <NavLink to="/organizer" className="nav-link">
        <FaTachometerAlt className="me-2" />
        Dashboard
      </NavLink>

      <NavLink to="/manage-events" className="nav-link">
        <FaCalendarPlus className="me-2" />
        Create Events
      </NavLink>

      <NavLink to="/view-bookings" className="nav-link">
        <FaClipboardList className="me-2" />
        Events
      </NavLink>

      <NavLink to="/show-events" className="nav-link">
        <FaRegCalendar className="me-2" />
        View Bookings
      </NavLink>

      <NavLink to="/organizer-profile" className="nav-link">
        <FaUser className="me-2" />
        Profile
      </NavLink>

      <NavLink to="/settings" className="nav-link">
        <FaCogs className="me-2" />
        Settings
      </NavLink>
    </div>
  );
};
