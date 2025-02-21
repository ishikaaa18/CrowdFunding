import React from "react";
import "../styles/AboutUs.css";

import missionImage from "../assets/images/mission-image.webp";
import globalReachImage from "../assets/images/global-reach.jpeg";
import teamImage from "../assets/images/team-image.jpg";


const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-header">About <span className="highlight">EmpowerFund</span></h1>
      <p className="about-subtext">
        EmpowerFund is a next-generation crowdfunding platform designed to bring ideas to life! 
        Whether you're an entrepreneur, artist, or advocate for a cause, our platform empowers you to raise funds and turn dreams into reality.
      </p>

      {/* Mission Section */}
      <section className="about-section">
        <h2 className="about-title">🌟 Our Mission</h2>
        <div className="about-content">
          <img 
            src={missionImage} 
            alt="EmpowerFund's mission to support innovation and social impact." 
            className="about-image"
            loading="lazy" 
          />
          <p>
            Our mission is to provide a <strong>secure</strong>, <strong>transparent</strong>, and <strong>user-friendly</strong> crowdfunding experience. 
            We connect innovators and supporters globally, fostering creativity and meaningful change.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-section">
        <h2 className="about-title">💡 Why Choose Us?</h2>
        <div className="about-content">
          <img 
            src={globalReachImage} 
            alt="EmpowerFund's global reach and funding opportunities." 
            className="about-image"
            loading="lazy" 
          />
          <ul className="about-list">
            <li>🚀 <strong>Flexible Funding Options:</strong> Choose between fixed and flexible funding goals.</li>
            <li>🔒 <strong>Secure Transactions:</strong> Safe and reliable payment processing.</li>
            <li>🌍 <strong>Global Reach:</strong> Raise funds and contribute from anywhere in the world.</li>
            <li>✅ <strong>Transparent & Trustworthy:</strong> We support successful campaigns with complete transparency.</li>
          </ul>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="about-section contact">
        <h2 className="about-title">📞 Contact Us</h2>
        <div className="about-content">
          <img 
            src={teamImage} 
            alt="EmpowerFund Team - Passionate about crowdfunding." 
            className="about-image"
            loading="lazy" 
          />
          <div className="contact-info">
            <p>Need assistance? Reach out to us:</p>
            <p>✉️ <a href="mailto:support@empowerfund.com">support@empowerfund.com</a></p>
            <p>📞 Phone: +123 456 7890</p>
          </div>
        </div>
      </section>

      <p className="about-footer">Thank you for being part of our journey. Together, we make ideas happen! 🚀</p>
    </div>
  );
};

export default AboutUs;

