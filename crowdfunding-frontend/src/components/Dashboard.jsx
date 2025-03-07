import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          navigate("/login");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get("http://localhost:5000/api/auth/profile", config);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">User Dashboard</h2>
      {userData && (
        <div className="dashboard-content">
          <div className="profile-section">
            <div className="profile-card">
              <img
                src={userData.profileImage ? `http://localhost:5000${userData.profileImage}` : "/default-avatar.png"}
                alt="Profile"
                className="profile-pic"
              />
              <div className="profile-info">
                <h3>{userData.name}</h3>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Bio:</strong> {userData.bio}</p>
              </div>
            </div>
          </div>

          <div className="campaign-section">
            <h3>Your Campaigns</h3>
            {userData.createdCampaigns && userData.createdCampaigns.length > 0 ? (
              <ul className="campaign-list">
                {userData.createdCampaigns.map((campaign) => (
                  <li key={campaign._id} className="campaign-item">
                    <strong>{campaign.title}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No campaigns created yet.</p>
            )}
          </div>

          <div className="donation-section">
            <h3>Your Donations</h3>
            {userData.donations && userData.donations.length > 0 ? (
              <ul className="donation-list">
                {userData.donations.map((donation) => (
                  <li key={donation._id} className="donation-item">
                    <strong>{donation.campaignId?.title || "Unknown Campaign"}</strong> - Donated: ₹{donation.amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No donations made yet.</p>
            )}
          </div>

          <div className="logout-section">
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
