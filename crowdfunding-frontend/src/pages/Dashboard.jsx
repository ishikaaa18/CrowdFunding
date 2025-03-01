import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/common/Sidebar'; // Sidebar import

const Dashboard = () => {
  const [userData, setUserData] = useState({ name: '', email: '', createdCampaigns: [], donations: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user details, campaigns, and donations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if no token
          return;
        }

        // Fetching user details
        const userDetailsResponse = await axios.get('/api/user/details', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetching campaigns created by the user
        const campaignsResponse = await axios.get('/api/user/campaigns', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetching donations made by the user
        const donationsResponse = await axios.get('/api/user/donations', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({
          name: userDetailsResponse.data.name,
          email: userDetailsResponse.data.email,
          createdCampaigns: campaignsResponse.data.campaigns,
          donations: donationsResponse.data.donations,
        });

        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchData();
  }, [navigate]);

  // Show loading spinner until data is fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <Container className="ms-5 mt-3">
        <h2>Your Dashboard</h2>
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Created Campaigns</Card.Title>
                {userData.createdCampaigns.length > 0 ? (
                  <ul>
                    {userData.createdCampaigns.map((campaign) => (
                      <li key={campaign._id}>
                        <Card.Text>{campaign.title}</Card.Text>
                        <Card.Text>{campaign.description}</Card.Text>
                        <Card.Text><strong>Goal:</strong> ₹{campaign.goalAmount}</Card.Text>
                        <Card.Text><strong>Raised:</strong> ₹{campaign.raisedAmount}</Card.Text>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Card.Text>You haven't created any campaigns yet.</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Your Donations</Card.Title>
                {userData.donations.length > 0 ? (
                  <ul>
                    {userData.donations.map((donation) => (
                      <li key={donation._id}>
                        <Card.Text>Donated to {donation.campaignId.title}</Card.Text>
                        <Card.Text><strong>Amount:</strong> ₹{donation.amount}</Card.Text>
                        <Card.Text><strong>Message:</strong> {donation.message || 'No message'}</Card.Text>
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
        <Button
          className="mt-3"
          variant="danger"
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </Container>
    </div>
  );
};

export default Dashboard;
