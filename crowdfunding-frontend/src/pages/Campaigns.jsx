import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/common/SearchBar";
import "../styles/Campaigns.css"; // Import CSS for styling

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/campaigns") // Adjust backend API
      .then((response) => {
        setCampaigns(response.data);
        setFilteredCampaigns(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setError("Failed to load campaigns.");
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = campaigns.filter((campaign) =>
      campaign.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  };

  if (loading) return <p className="loading-text">Loading campaigns...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="campaigns-container">
      <h2 className="campaigns-header">🚀 Explore Campaigns</h2>
      <SearchBar onSearch={handleSearch} />
      
      <div className="campaigns-list">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              <h3>{campaign.title}</h3>
              <p>
                {campaign.description.length > 100
                  ? `${campaign.description.substring(0, 100)}...`
                  : campaign.description}
              </p>
              <Link to={`/campaign/${campaign._id}`} className="campaign-link">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">No campaigns found.</p>
        )}
      </div>
    </div>
  );
};

export default Campaigns;


