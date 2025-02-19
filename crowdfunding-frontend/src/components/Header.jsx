import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Header.css"; // Import the header CSS

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // Control dropdown visibility

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
      <div className="container">
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <i className="bi bi-lightning-fill me-2"></i> EmpowerFund
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/how-it-works">How It Works</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donate">Donate</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/start-project">Start Project</Link>
            </li>

            {/* User Dropdown */}
            {user ? (
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle ${isOpen ? "show" : ""}`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
                >
                  <i className="bi bi-person-circle me-1"></i> {user.username}
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`}
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      type="button"
                      onClick={logout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning px-3 ms-2" to="/register">Get Started</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
