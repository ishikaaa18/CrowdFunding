import React from "react";
import { FaUsers, FaHandsHelping, FaCheckCircle, FaGlobe } from "react-icons/fa";
import { MdSecurity, MdSupportAgent } from "react-icons/md";
import "../assets/styles/About.css"; // Import styles

const About = () => {
  return (
    <div className="about-container">
      <h2><FaUsers className="icon" /> About CrowdFund</h2>
      <p>
        CrowdFund is a platform dedicated to empowering individuals and organizations 
        to raise funds for meaningful causes. Whether it's for medical expenses, 
        social initiatives, or creative projects, we provide a secure and accessible 
        way to connect with donors worldwide.
      </p>

      <h3><FaHandsHelping className="icon" /> Our Mission</h3>
      <p>
        Our mission is to bring communities together to support great ideas and causes.
        We believe in transparency, trust, and the power of collective giving.
      </p>

      <h3><FaCheckCircle className="icon" /> Why Choose Us?</h3>
      <ul>
        <li><MdSecurity className="list-icon" /> Secure and transparent transactions</li>
        <li><FaUsers className="list-icon" /> User-friendly campaign setup</li>
        <li><FaGlobe className="list-icon" /> Global reach for donations</li>
        <li><MdSupportAgent className="list-icon" /> 24/7 support for campaigners</li>
      </ul>

      <h3><FaHandsHelping className="icon" /> Get Involved</h3>
      <p>
        Join us in making a difference. Start a campaign, donate, or spread the word!
      </p>
    </div>
  );
};

export default About;
