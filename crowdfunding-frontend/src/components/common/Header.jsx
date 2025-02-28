import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Acadify</Link>
      </div>
      <nav className="navbar">
        <ul>
          <li><Link to="/campaigns">Campaigns</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/login" className="cta-button">Login</Link></li>
          <li><Link to="/register" className="cta-button">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
