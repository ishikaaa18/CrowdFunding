import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/common/Sidebar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    createdCampaigns: [],
    donations: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData({
          name: response.data.name || "",
          email: response.data.email || "",
          createdCampaigns: response.data.createdCampaigns || [],
          donations: response.data.donations || [],
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <Container className="dashboard-content">
        <h2 className="mb-4">Your Dashboard</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {/* General Information Section */}
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>General Information</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {userData.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {userData.email}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate("/profile")}>
                  View Profile
                </Button>
                <Button
                  variant="secondary"
                  className="ml-2"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Created Campaigns Section */}
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Created Campaigns</Card.Title>
                {userData.createdCampaigns.length > 0 ? (
                  <ul>
                    {userData.createdCampaigns.map((campaign) => (
                      <li key={campaign._id}>
                        <Card.Text>
                          <strong>Title:</strong> {campaign.title}
                        </Card.Text>
                        <Card.Text>
                          <strong>Description:</strong> {campaign.description}
                        </Card.Text>
                        <Card.Text>
                          <strong>Goal:</strong> ₹{campaign.goalAmount}
                        </Card.Text>
                        <Card.Text>
                          <strong>Raised:</strong> ₹{campaign.raisedAmount}
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => navigate(`/campaigns/${campaign._id}`)}
                        >
                          View Campaign
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Card.Text>You haven't created any campaigns yet.</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Donations Section */}
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Your Donations</Card.Title>
                {userData.donations.length > 0 ? (
                  <ul>
                    {userData.donations.map((donation) => (
                      <li key={donation._id}>
                        <Card.Text>
                          Donated to{" "}
                          <strong>
                            {donation.campaignId?.title || "Unknown Campaign"}
                          </strong>
                        </Card.Text>
                        <Card.Text>
                          <strong>Amount:</strong> ₹{donation.amount}
                        </Card.Text>
                        <Card.Text>
                          <strong>Message:</strong>{" "}
                          {donation.message || "No message"}
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(`/campaigns/${donation.campaignId?._id}`)
                          }
                        >
                          View Donation Campaign
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Card.Text>You haven't made any donations yet.</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Buttons for creating campaigns or donating */}
        <Row>
          <Col md={12}>
            {/* Button to view all campaigns for donation */}
            <Button variant="info" onClick={() => navigate("/campaigns")}>
              Donate to a Campaign
            </Button>
            {/* Button to navigate to the create campaign page */}
            <Button
              variant="success"
              className="ml-2"
              onClick={() => navigate("/campaign-form")}
            >
              Create Campaign
            </Button>
          </Col>
        </Row>

        {/* Logout Button */}
        <Button className="mt-3" variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </div>
  );
};

export default Dashboard;
