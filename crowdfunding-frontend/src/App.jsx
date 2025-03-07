import { Routes, Route } from "react-router-dom";

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Campaigns from "./pages/Campaigns";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FeaturedCampaigns from "./components/FeaturedCampaigns";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import CreateCampaign from "./pages/CreateCampaign";
import Donate from "./pages/Donate";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/featured-campaigns" element={<FeaturedCampaigns />} />
        <Route path="/donate/:campaignId" element={<Donate />} />
        <Route
          path="/create-campaign"
          element={
            <PrivateRoute>
              <CreateCampaign />
            </PrivateRoute>
          }
        />

        {/* ✅ Private Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
