import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <ul>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <p>&copy; 2025 Acadify. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
