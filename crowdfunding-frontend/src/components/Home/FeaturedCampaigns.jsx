import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCampaigns } from "../../services/campaignService";
import "../../styles/FeaturedCampaigns.css";


const FeaturedCampaigns = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Fetch all campaigns and get the top 3 featured ones
    getAllCampaigns()
      .then((data) => {
        if (data.length > 0) {
          // Slice first 3 campaigns for the featured section
          const latestCampaigns = data.slice(0, 3);
          setFeaturedCampaigns(latestCampaigns);
        } else {
          setError("No campaigns found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setError("Failed to load featured campaigns.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="featured-campaigns">
      <h2>Featured Campaigns</h2>

      {/* 🟢 Loading and Error Messages */}
      {loading && <p className="loading-text">Loading featured campaigns...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* 🟠 Featured Campaigns List */}
      <div className="campaigns-list">
        {featuredCampaigns.length > 0 ? (
          featuredCampaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              {/* 🖼 Campaign Image */}
              {campaign.image ? (
                <img
                  src={`http://localhost:5000/${campaign.image}`} // Use correct image path
                  alt={campaign.title}
                  className="campaign-image"
                />
              ) : (
                <img
                  src="/default-campaign.jpg" // Default fallback image
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
                <button
                  className="view-details-btn"
                  onClick={() => navigate(`/campaigns/${campaign._id}`)} // Navigate to campaign details page
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No featured campaigns found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
