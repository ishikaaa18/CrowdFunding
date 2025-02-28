import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Campaigns from "../pages/Campaigns";
import CampaignDetails from "../pages/CampaignDetails";
import ContactUs from "../pages/ContactUs";
import Dashboard from "../pages/Dashboard";
import Donate from "../pages/Donate";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import StartCampaign from "../pages/StartCampaign";  // ✅ Updated import
import ProtectedRoute from "./ProtectedRoute";
import HowItWorks from "../components/Home/HowItWorks";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CampaignForm from "../components/Forms/CampaignForm";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaigns/:id" element={<CampaignDetails />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

      {/* Protected Routes (Require Login) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/campaign-form" element={<ProtectedRoute><CampaignForm /></ProtectedRoute>} />

      
      {/* Redirect "Start a Campaign" to Register if Not Logged In */}
      <Route path="/start-campaign" element={user ? <ProtectedRoute><StartCampaign /></ProtectedRoute> : <Register />} />  {/* ✅ Updated path & component */}

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






