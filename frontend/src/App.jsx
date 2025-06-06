import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import EventsList from "./pages/EventsList.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard.jsx";
import AttendeeDashboard from "./pages/attendee/AttendeeDashboard.jsx";
import AdminDashboard from "./pages/admin/adminpages/AdminDashboard.jsx";
import Events from "./pages/admin/adminpages/Events.jsx";
import Organizers from "./pages/admin/adminpages/Organizers.jsx";
import Notifications from "./pages/admin/adminpages/Notifications.jsx";
import Settings from "./pages/admin/adminpages/Settings.jsx";
import Dashboard from "./pages/admin/adminpages/Dashboard.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Organizer and Attendee Dashboards */}
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />

        {/* Admin Dashboard with Nested Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<><Dashboard /></>} />
          <Route path="events" element={<Events />} />
          <Route path="organizers" element={<Organizers />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
