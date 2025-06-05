import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmail from "./pages/VerifyEmail";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard.jsx";
import AttendeeDashboard from "./pages/attendee/AttendeeDashboard.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />


        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
        {/* 404 */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App