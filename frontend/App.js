import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import OrganizerLogin from './pages/OrganizerLogin';
import OrganizerForm from "./pages/OrganizerForm";
import OrganizerLayout from "./Layouts/OrganizerLayout";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import VenueManager from "./pages/VenueManager";
import EventManager from "./pages/EventManager";
import BookingViewer from "./pages/BookingViewer";
import OrganizerProfile from "./pages/OrganizerProfile";
import ShowEvents from "./pages/ShowEvents"; // ✅ Newly added

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/organizer-login" element={<OrganizerLogin />} />
        <Route path="/organizer-register" element={<OrganizerForm />} />

        {/* Protected Routes inside Organizer Layout */}
        <Route element={<OrganizerLayout />}>
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/manage-venues" element={<VenueManager />} />
          <Route path="/manage-events" element={<EventManager />} />
          <Route path="/view-bookings" element={<BookingViewer />} />
          <Route path="/organizer-profile" element={<OrganizerProfile />} />
          <Route path="/show-events" element={<ShowEvents />} /> {/* ✅ Added here */}
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/organizer" />} />
      </Routes>
    </Router>
  );
}

export default App;
