import React from "react";
import "../../styles/WhyChooseUs.css";
import { FaShieldAlt, FaUsers, FaHandsHelping, FaChartLine } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="features-container">
        <div className="feature">
          <FaShieldAlt className="feature-icon" />
          <h3>Secure & Transparent</h3>
          <p>Your donations are safe with our secure payment system.</p>
        </div>

        <div className="feature">
          <FaUsers className="feature-icon" />
          <h3>Community Driven</h3>
          <p>Join thousands of people supporting meaningful causes.</p>
        </div>

        <div className="feature">
          <FaHandsHelping className="feature-icon" />
          <h3>24/7 Support</h3>
          <p>Our support team is always ready to help you succeed.</p>
        </div>

        <div className="feature">
          <FaChartLine className="feature-icon" />
          <h3>Proven Success</h3>
          <p>Millions raised through successful crowdfunding campaigns.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

