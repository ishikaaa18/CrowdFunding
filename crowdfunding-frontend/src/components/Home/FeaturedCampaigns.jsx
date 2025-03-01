import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAllCampaigns } from "../../services/campaignService";
import "../../styles/FeaturedCampaigns.css";

const FeaturedCampaigns = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    getAllCampaigns()
      .then((data) => {
        if (data.length > 0) {
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

      {loading && <p className="loading-text">Loading featured campaigns...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="campaigns-container">
        {featuredCampaigns.map((campaign) => (
          <div key={campaign._id} className="campaign-card">
            <img
              src={campaign.image || "/default-campaign.jpg"}
              alt={campaign.title}
              className="campaign-image"
            />
            <h3>{campaign.title}</h3>

            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${(campaign.raised / campaign.goal) * 100}%`,
                }}
              ></div>
            </div>

            <p>
              Raised:{" "}
              <strong>${campaign.raised ? campaign.raised.toLocaleString() : "0"}</strong> / Goal:{" "}
              <strong>${campaign.goal ? campaign.goal.toLocaleString() : "0"}</strong>
            </p>

            {/* Navigate to Donate Page */}
            <button className="donate-btn" onClick={() => navigate(`/donate/${campaign._id}`)}>
              Donate Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;

