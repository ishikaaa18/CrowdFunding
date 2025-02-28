import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer container-fluid">
      <div className="container text-center">
        {/* Footer Links */}
        <div className="footer-links">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link" href="/about-us">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/terms">Terms of Service</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-us">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-social mt-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-3">&copy; 2025 EmpowerFund. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

