import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserDropdown from "./UserDropdown";
import "../../styles/Header.css"; // Import CSS for styling

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark header-nav">
      <div className="container">
        {/* ✅ Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <img src="/Acadify_Logo.png" alt="Brand Logo" className="brand-logo" />
        </Link>

        {/* ✅ Mobile Toggle Button */}
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

        {/* ✅ Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/campaigns">Campaigns</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/how-it-works">How It Works</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {/* ✅ Conditional Rendering for Authenticated Users */}
            {user ? (
              <UserDropdown user={user} logout={logout} isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link login-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary get-started-btn" to="/register">
                    Get Started
                  </Link>
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

