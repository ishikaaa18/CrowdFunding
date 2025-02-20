import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, login } = useContext(AuthContext);
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
      <h1 className="dashboard-header">Welcome, {user?.name}!</h1>

      {/* Edit Profile Button */}
      <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>
        ✏️ Edit Profile
      </button>

      {/* Edit Profile Section */}
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

      {/* User Projects Section */}
      <h3>Your Projects</h3>
      <div className="info-box">No projects yet.</div>

      {/* User Contributions Section */}
      <h3>Your Contributions</h3>
      <div className="info-box">No contributions yet.</div>
    </div>
  );
};

export default Dashboard;

