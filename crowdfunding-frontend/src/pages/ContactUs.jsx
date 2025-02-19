import React from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-header">📞 Get in Touch</h1>
      <p className="contact-subtext">
        Have any questions or need support? We’re here to help! Contact us
        through any of the channels below.
      </p>

      <div className="contact-info">
        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h2>Email</h2>
          <p>support@empowerfund.com</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <h2>Phone</h2>
          <p>+123 456 7890</p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">📍</div>
          <h2>Address</h2>
          <p>123 Startup Street, Innovation City, 56789</p>
        </div>
      </div>

      <h2 className="form-header">📝 Send Us a Message</h2>
      <form className="contact-form">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Your Message"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
