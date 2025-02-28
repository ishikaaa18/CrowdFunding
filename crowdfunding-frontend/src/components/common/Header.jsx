import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; // Import User Icon
import "../../styles/Header.css";

const Header = () => {
  const { user } = useContext(AuthContext); // Get user data from context

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">EmpowerFund</Link>
      </div>
      <nav className="navbar">
        <ul>
          <li><Link to="/campaigns">Campaigns</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          {user ? (
            // If logged in, show user icon that links to Dashboard
            <li>
              <Link to="/dashboard" className="user-icon">
                <FaUserCircle size={24} /> {/* User Icon */}
              </Link>
            </li>
          ) : (
            // If not logged in, show Login & Register buttons
            <>
              <li><Link to="/login" className="cta-button">Login</Link></li>
              <li><Link to="/register" className="cta-button">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;



