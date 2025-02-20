import React, { useState } from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-header">📞 Get in Touch</h1>
      <p className="contact-subtext">
        Have any questions or need support? We’re here to help! Contact us through any of the channels below.
      </p>

      {/* Contact Information */}
      <div className="contact-info">
        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h2>Email</h2>
          <p><a href="mailto:support@empowerfund.com">support@empowerfund.com</a></p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <h2>Phone</h2>
          <p><a href="tel:+1234567890">+123 456 7890</a></p>
        </div>

        <div className="contact-card">
          <div className="contact-icon">📍</div>
          <h2>Address</h2>
          <p>123 Startup Street, Innovation City, 56789</p>
        </div>
      </div>

      {/* Contact Form */}
      <h2 className="form-header">📝 Send Us a Message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-label="Your Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Your Email"
          />
        </div>
        <div className="mb-3">
          <textarea
            name="message"
            className="form-control"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            aria-label="Your Message"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
