import { Link } from "react-router-dom";
import Logo from "/Acadify_Logo.png"; // Ensure correct path
import "../../styles/Footer.css"; // Import custom styles if needed

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5 mt-4">
      <div className="container">
        <div className="row">
          {/* Logo & About */}
          <div className="col-md-4 mb-4">
            <h4>EmpowerFund</h4>
            <p>
              A secure and transparent crowdfunding platform to empower dreams
              and fund impactful projects.
            </p>
            <img
              src={Logo}
              alt="EmpowerFund Logo"
              className="footer-logo"
            />
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-2 mb-4">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><Link to="/faq" className="footer-link">FAQs</Link></li>
              <li><Link to="/help-center" className="footer-link">Help Center</Link></li>
              <li><Link to="/report-issue" className="footer-link">Report an Issue</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 text-md-start text-center">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 justify-content-md-start justify-content-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <hr />

        {/* Copyright */}
        <p className="text-center mb-0">
          © {new Date().getFullYear()} EmpowerFund | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
