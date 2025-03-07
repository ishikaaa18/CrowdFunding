import { Link } from "react-router-dom";
import "../assets/styles/Home.css";
import FeaturedCampaigns from "../components/FeaturedCampaigns"; // Import FeaturedCampaigns

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero">
        <h1>Empower Change with Crowdfunding</h1>
        <p>Support and fund amazing projects that make a difference.</p>
        <Link to="/campaigns" className="cta-button">
          Explore Campaigns
        </Link>
      </header>

      {/* Include FeaturedCampaigns component instead of hardcoded campaigns */}
      <FeaturedCampaigns />
    </div>
  );
};

export default Home;
