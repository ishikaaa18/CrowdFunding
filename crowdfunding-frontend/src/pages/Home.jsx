import { Link } from "react-router-dom";
import "../assets/styles/Home.css";


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

      <section className="featured-campaigns">
        <h2>Featured Campaigns</h2>
        <div className="campaign-list">
          <div className="campaign-card">
            <h3>Help Build a School</h3>
            <p>Join us in providing education for underprivileged children.</p>
          </div>
          <div className="campaign-card">
            <h3>Medical Aid for Families</h3>
            <p>Support families in need of urgent medical assistance.</p>
          </div>
          <div className="campaign-card">
            <h3>Green Energy Initiative</h3>
            <p>Fund sustainable energy solutions for a cleaner future.</p>
          </div>
        
        </div>
      </section>
    </div>
  );
};

export default Home;
