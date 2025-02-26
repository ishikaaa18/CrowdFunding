import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Campaigns from "../pages/Campaigns";
import CampaignDetails from "../pages/CampaignDetails";
import ContactUs from "../pages/ContactUs";
import Dashboard from "../pages/Dashboard";
import Donate from "../pages/Donate";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import StartProject from "../pages/StartProject";
import ProtectedRoute from "./ProtectedRoute";
import HowItWorks from "../components/Home/HowItWorks";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaign/:id" element={<CampaignDetails />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

      {/* Protected Routes (Require Login) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      {/* Redirect "Start a Campaign" to Register if Not Logged In */}
      <Route path="/start-project" element={user ? <ProtectedRoute><StartProject /></ProtectedRoute> : <Register />} />

      {/* 404 Page Not Found */}
      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", margin: "50px" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/" style={{ textDecoration: "none", color: "#007BFF", fontWeight: "bold" }}>
              Go Back to Home
            </a>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;




