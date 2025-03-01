import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";
import { FaPlusCircle, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserCampaigns();
      fetchUserDonations();
    }
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  // Fetch user's campaigns
  const fetchUserCampaigns = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/campaigns/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  // Fetch user's donations
  const fetchUserDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/donations/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h3 className="sidebar-title">Dashboard</h3>
        <ul className="sidebar-nav">
          <li><a href="#campaigns">Your Campaigns</a></li>
          <li><a href="#donations">Your Donations</a></li>
        </ul>
        <button className="btn btn-danger logout-btn" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h1 className="dashboard-header">Welcome, {user?.name}!</h1>

        {/* Your Campaigns Section */}
        <div id="campaigns" className="campaigns-section">
          <h3>Your Campaigns</h3>
          {campaigns.length > 0 ? (
            <div className="campaigns-list">
              {campaigns.map((campaign) => (
                <div className="campaign-card" key={campaign._id}>
                  <h4>{campaign.title}</h4>
                  <p>{campaign.description}</p>
                  <p><strong>Goal:</strong> ₹{campaign.goalAmount}</p>
                  <p><strong>Deadline:</strong> {new Date(campaign.deadline).toDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No campaigns started yet.</p>
          )}
          <button className="btn btn-primary add-campaign-btn" onClick={() => navigate("/start-campaign")}> <FaPlusCircle /> Start a Campaign </button>
        </div>

        {/* Your Donations Section */}
        <div id="donations" className="donations-section">
          <h3>Your Donations</h3>
          {donations.length > 0 ? (
            <div className="donations-list">
              {donations.map((donation) => (
                <div className="donation-card" key={donation._id}>
                  <h4>{donation.campaignTitle}</h4>
                  <p><strong>Amount Donated:</strong> ₹{donation.amount}</p>
                  <p><strong>Date:</strong> {new Date(donation.date).toDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No donations made yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

