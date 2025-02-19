import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Project from "../pages/Project";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AboutUs from "../pages/AboutUs";
import HowItWorks from "../pages/HowItWorks";
import ContactUs from "../pages/ContactUs";
import Donate from "../pages/Donate";  
import StartProject from "../pages/StartProject"; 
import ProtectedRoute from "../routes/ProtectedRoute";  

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:projectId" element={<Project />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/start-project" element={<StartProject />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
