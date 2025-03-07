import { Link } from "react-router-dom";
import { useContext } from "react";  // Import useContext
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../assets/styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Use context to get user info

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">CrowdFund</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/campaigns">Campaigns</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {/* Conditionally render "Dashboard" and "Start Campaign" only if user is logged in */}
        {user && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/create-campaign" className="start-campaign-btn">Start Campaign</Link></li>
          </>
        )}
      </ul>
      
      {/* Show login and register buttons or logout button based on user authentication */}
      <div className="auth-buttons">
        {!user ? (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
