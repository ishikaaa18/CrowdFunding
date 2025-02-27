import { useState, useEffect } from "react";
import { getAllCampaigns } from "../../services/campaignService";
import "../../styles/FeaturedCampaigns.css";

const FeaturedCampaigns = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCampaigns()
      .then((data) => {
        if (data.length > 0) {
          // Select the latest 3 campaigns
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

      {/* Loading & Error Messages */}
      {loading && <p className="loading-text">Loading featured campaigns...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="campaigns-container">
        {featuredCampaigns.map((campaign) => (
          <div key={campaign._id} className="campaign-card">
            {/* Display Campaign Image */}
            <img
              src={campaign.image || "/default-campaign.jpg"}
              alt={campaign.title}
              className="campaign-image"
            />

            <h3>{campaign.title}</h3>

            {/* Progress Bar */}
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
              <strong>
                ${campaign.raised ? campaign.raised.toLocaleString() : "0"}
              </strong>{" "}
              / Goal:{" "}
              <strong>
                ${campaign.goal ? campaign.goal.toLocaleString() : "0"}
              </strong>
            </p>

            <button className="donate-btn">Donate Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
