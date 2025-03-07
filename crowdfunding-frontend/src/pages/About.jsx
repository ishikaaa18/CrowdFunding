import React from "react";
import { FaUsers, FaHandsHelping, FaCheckCircle, FaGlobe } from "react-icons/fa";
import { MdSecurity, MdSupportAgent } from "react-icons/md";
import "../assets/styles/About.css"; // Import styles

const About = () => {
  return (
    <div className="about-container">
      <div className="header-section">
        <h1>Empowering Change with CrowdFund</h1>
        <p>Your trusted platform for fundraising and making a difference.</p>
      </div>
      
      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <FaUsers className="icon" />
            <h2>About CrowdFund</h2>
          </div>
          <div className="card-body">
            <p>
              CrowdFund is a secure platform that enables individuals and organizations
              to raise funds for meaningful causes. Whether it’s medical aid, social
              initiatives, or creative projects, we connect you with donors worldwide.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <FaHandsHelping className="icon" />
            <h3>Our Mission</h3>
          </div>
          <div className="card-body">
            <p>
              We believe in transparency, trust, and the power of collective giving.
              Our mission is to unite communities in supporting impactful ideas and causes.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <FaCheckCircle className="icon" />
            <h3>Why Choose Us?</h3>
          </div>
          <div className="card-body">
            <ul>
              <li><MdSecurity className="list-icon" /> Secure and transparent transactions</li>
              <li><FaUsers className="list-icon" /> Simple and user-friendly campaign setup</li>
              <li><FaGlobe className="list-icon" /> Global reach for donations</li>
              <li><MdSupportAgent className="list-icon" /> 24/7 support for campaigners</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <FaHandsHelping className="icon" />
            <h3>Get Involved</h3>
          </div>
          <div className="card-body">
            <p>
              Join us in making a difference. Start a campaign, donate, or spread the word today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;