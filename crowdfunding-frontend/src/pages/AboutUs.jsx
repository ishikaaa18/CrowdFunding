import React from "react";
import "../styles/AboutUs.css"; 
import missionImage from "../assets/mission-image.webp"; 
import globalReachImage from "../assets/global-reach.jpeg"; 
import teamImage from "../assets/team-image.jpg";

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-header">About Us</h1>
      <p className="about-subtext">
        Welcome to <span className="highlight">EmpowerFund</span>, a next-generation crowdfunding platform designed to bring ideas to life!
        Whether you're an entrepreneur, artist, or social cause advocate, our platform empowers you to raise funds and turn your dreams into reality.
      </p>

      {/* Mission Section */}
      <div className="about-section">
        <h2 className="about-title">🌟 Our Mission</h2>
        <div className="about-content">
          <img src={missionImage} alt="Our Mission" className="about-image" />
          <p>
            Our mission is to provide a <strong>secure</strong>, <strong>transparent</strong>, and <strong>user-friendly</strong> crowdfunding experience where innovators and backers can connect seamlessly. We aim to support creativity, entrepreneurship, and meaningful causes worldwide.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="about-section">
        <h2 className="about-title">💡 Why Choose Us?</h2>
        <div className="about-content">
          <img src={globalReachImage} alt="Global Reach" className="about-image" />
          <ul className="about-list">
            <li><strong>🚀 Flexible Funding Options:</strong> Choose between fixed and flexible funding goals.</li>
            <li><strong>🔒 Secure Transactions:</strong> We ensure safe and reliable payment processing.</li>
            <li><strong>🌍 Global Reach:</strong> Raise funds and contribute from anywhere in the world.</li>
            <li><strong>✅ Transparent & Trustworthy:</strong> We value transparency and support successful campaigns.</li>
          </ul>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="about-section contact">
        <h2 className="about-title">📞 Contact Us</h2>
        <div className="about-content">
          <img src={teamImage} alt="Team" className="about-image" />
          <div className="contact-info">
            <p>Have any questions or need support? Feel free to reach out to us at:</p>
            <p>✉️ Email: <a href="mailto:support@empowerfund.com">support@empowerfund.com</a></p>
            <p>📞 Phone: +123 456 7890</p>
          </div>
        </div>
      </div>

      <p className="about-footer">Thank you for being part of our journey. Together, we make ideas happen! 🚀</p>
    </div>
  );
};

export default AboutUs;

