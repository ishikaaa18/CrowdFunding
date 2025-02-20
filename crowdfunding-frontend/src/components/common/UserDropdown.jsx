import { Link } from "react-router-dom";

const UserDropdown = ({ user, logout, isOpen, setIsOpen }) => {
  return (
    <li className="nav-item dropdown">
      <button
        className={`nav-link dropdown-toggle ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="bi bi-person-circle me-1"></i> {user.username}
      </button>
      <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`}>
        <li>
          <Link className="dropdown-item" to="/dashboard">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>
        <li>
          <button className="dropdown-item text-danger" onClick={logout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </li>
      </ul>
    </li>
  );
};

export default UserDropdown;

