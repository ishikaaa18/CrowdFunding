import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCampaigns } from "../services/campaignService";
import SearchBar from "../components/common/SearchBar";
import "../styles/Campaigns.css";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCampaigns()
      .then((data) => {
        setCampaigns(data);
        setFilteredCampaigns(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setError("Failed to load campaigns.");
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredCampaigns(campaigns);
    } else {
      const filtered = campaigns.filter((campaign) =>
        campaign.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    }
  };

  return (
    <div className="campaigns-container">
      {/* 🟢 Search Bar at the Top */}
      <SearchBar onSearch={handleSearch} />

      {/* 🔴 Display Loading & Error Messages */}
      {loading && <p className="loading-text">Loading campaigns...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* 🟠 Campaigns List */}
      <div className="campaigns-list">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              {/* 🖼 Campaign Image */}
              {campaign.image ? (
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="campaign-image"
                />
              ) : (
                <img
                  src="/default-campaign.jpg"
                  alt="Default"
                  className="campaign-image"
                />
              )}

              <div className="campaign-card-content">
                <h3>{campaign.title}</h3>
                <p>
                  {campaign.description && campaign.description.length > 100
                    ? `${campaign.description.substring(0, 100)}...`
                    : campaign.description || "No description available"}
                </p>
                <Link
                  to={`/campaigns/${campaign._id}`}
                  className="campaign-link"
                >
                  View Details
                </Link>
              </div>
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

