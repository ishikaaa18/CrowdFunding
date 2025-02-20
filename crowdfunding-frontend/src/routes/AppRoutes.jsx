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


const AppRoutes = () => {
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
      <Route path="/start-project" element={<ProtectedRoute><StartProject /></ProtectedRoute>} />

      {/* 404 Page Not Found */}
      <Route path="*" element={<h1 style={{ textAlign: "center", margin: "50px" }}>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;



