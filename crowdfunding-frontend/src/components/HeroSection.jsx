import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <h1>Empower Change with Your Support</h1>
      <p>Join us in making a difference by supporting innovative projects that matter.</p>

      <button className="cta-button" onClick={() => navigate("/start-project")}>
        Start a Project
      </button>

      <button className="cta-button" onClick={() => navigate("/donate")}>
        Donate Now
      </button>
    </div>
  );
};

export default HeroSection;
