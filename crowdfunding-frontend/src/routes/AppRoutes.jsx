import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";  // ✅ Correct import

// Lazy load pages for better performance
const Home = lazy(() => import("../pages/Home"));
const Project = lazy(() => import("../pages/Project"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const HowItWorks = lazy(() => import("../pages/HowItWorks"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Donate = lazy(() => import("../pages/Donate"));  // ✅ Added
const StartProject = lazy(() => import("../pages/StartProject"));  // ✅ Added

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/donate" element={<Donate />} />  {/* ✅ Added */}
        <Route path="/start-project" element={<StartProject />} />  {/* ✅ Added */}

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
    </Suspense>
  );
};

export default AppRoutes;
