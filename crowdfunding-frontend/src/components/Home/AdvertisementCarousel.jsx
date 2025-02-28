import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { fetchCampaigns } from "../../services/campaignService";

const AdvertisementCarousel = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch campaigns when the component mounts
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data.slice(0, 3));  // Display only the first 3 campaigns
        setLoading(false);
      } catch (err) {
        setError("Failed to load campaigns");
        setLoading(false);
      }
    };

    getCampaigns();
  }, []);

  return (
    <Carousel className="my-4">
      {loading && <p>Loading advertisements...</p>}
      {error && <p>{error}</p>}
      
      {/* Display campaigns dynamically */}
      {campaigns.map((campaign) => (
        <Carousel.Item key={campaign._id}>
          <img className="d-block w-100" src={campaign.image || "/default-campaign.jpg"} alt={campaign.title} />
          <Carousel.Caption>
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AdvertisementCarousel;
