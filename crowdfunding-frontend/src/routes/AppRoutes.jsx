import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
import StartCampaign from "../pages/StartCampaign";
import ProtectedRoute from "./ProtectedRoute";
import HowItWorks from "../components/Home/HowItWorks";
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
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/donate/:campaignId" element={<Donate />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* No Header and Footer here */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/campaign-form" element={<ProtectedRoute><CampaignForm /></ProtectedRoute>} />
      <Route
        path="/start-campaign"
        element={user ? <ProtectedRoute><StartCampaign /></ProtectedRoute> : <Navigate to="/register" />}
      />

      {/* 404 - Page Not Found */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;








