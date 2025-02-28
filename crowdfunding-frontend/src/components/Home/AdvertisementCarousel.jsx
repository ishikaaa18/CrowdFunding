import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { getAllCampaigns } from "../../services/campaignService"; 
import "../../styles/AdvertisementCarousel.css"; // Ensure correct styling is applied

const AdvertisementCarousel = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await getAllCampaigns();
        setCampaigns(data.slice(0, 3));  // Display only the first 3 campaigns
        setLoading(false);
      } catch (err) {
        setError("Failed to load advertisements");
        setLoading(false);
      }
    };

    getCampaigns();
  }, []);

  return (
    <div className="advertisement-carousel container">
      {loading && <p className="text-center">Loading advertisements...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && (
        <Carousel indicators={false} interval={3000} fade>
          {campaigns.map((campaign) => (
            <Carousel.Item key={campaign._id}>
              <img
                className="d-block w-100 carousel-img"
                src={campaign.image || "/default-campaign.jpg"}
                alt={campaign.title}
              />
              <Carousel.Caption className="carousel-caption">
                <h5>{campaign.title}</h5>
                <p>{campaign.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default AdvertisementCarousel;

