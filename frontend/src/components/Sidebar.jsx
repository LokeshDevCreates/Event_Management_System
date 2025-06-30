import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3" style={{ height: "100vh", width: "220px" }}>
      <h5 className="mb-4">Organizer Panel</h5>
      <nav className="nav flex-column">

        <NavLink
          to="/organizer"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/manage-events"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          Manage Events
        </NavLink>

        <NavLink
          to="/manage-venues"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          Manage Venues
        </NavLink>

        <NavLink
          to="/view-bookings"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          View Bookings
        </NavLink>

        <NavLink
          to="/organizer-profile"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active fw-bold text-primary" : "text-dark"}`
          }
        >
          View Profile
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;
