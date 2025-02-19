import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/UserDropdown.css"; // Import CSS for styling

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="user-dropdown">
      {/* Dropdown Toggle Button */}
      <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="bi bi-person-circle"></i> {/* User Icon */}
        <i className="bi bi-caret-down-fill"></i> {/* Dropdown Arrow */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="dropdown-menu">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><button className="logout-btn">Logout</button></li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
