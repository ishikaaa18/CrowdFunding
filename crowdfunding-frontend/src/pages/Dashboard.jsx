import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSignOutAlt } from "react-icons/fa"; // Added logout icon

const Dashboard = () => {
  const { user, login, logout } = useContext(AuthContext); // ✅ Added logout
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  if (!user) return <Navigate to="/login" replace />;

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Save updated user data
  const handleSave = () => {
    if (!updatedUser.name.trim() || !updatedUser.email.trim()) {
      alert("Name and Email cannot be empty!");
      return;
    }
    login({ ...user, ...updatedUser });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h3 className="sidebar-title">Dashboard</h3>
        <ul className="sidebar-nav">
          <li><a href="#profile">Profile</a></li>
          <li><a href="#projects">Your Projects</a></li>
          <li><a href="#contributions">Your Contributions</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
        {/* ✅ Logout Button */}
        <button className="btn btn-danger logout-btn" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h1 className="dashboard-header">Welcome, {user?.name}!</h1>

        {/* Edit Profile Section */}
        <div id="profile" className="profile-section">
          <h3>Profile Overview</h3>
          <div className="profile-card">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit Profile
            </button>
          </div>

          {isEditing && (
            <div className="edit-profile-card">
              <h3>Edit Profile</h3>
              <input
                type="text"
                className="form-control"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                placeholder="Enter new name"
              />
              <input
                type="email"
                className="form-control"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                placeholder="Enter new email"
              />
              <input
                type="password"
                className="form-control"
                name="password"
                value={updatedUser.password}
                onChange={handleChange}
                placeholder="Enter new password (leave blank to keep unchanged)"
              />
              <div className="btn-group">
                <button className="btn btn-success" onClick={handleSave}>💾 Save Changes</button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>❌ Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* User Projects Section */}
        <div id="projects" className="projects-section">
          <h3>Your Projects</h3>
          <div className="projects-list">
            {/* Example of a project card */}
            <div className="project-card">
              <h4>Project Title</h4>
              <p>Description of the project...</p>
              <div className="btn-group">
                <button className="btn btn-info">View</button>
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger"><FaTrashAlt /> Delete</button>
              </div>
            </div>

            {/* Add New Project Button */}
            <button className="btn btn-primary add-project-btn">
              <FaPlusCircle /> Add New Project
            </button>
          </div>
        </div>

        {/* User Contributions Section */}
        <div id="contributions" className="contributions-section">
          <h3>Your Contributions</h3>
          <div className="contributions-list">
            {/* Example of a contribution card */}
            <div className="contribution-card">
              <h4>Contribution Title</h4>
              <p>Description of the contribution...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




