import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

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
    login({ ...user, ...updatedUser });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1 className="my-4">Welcome, {user.name}!</h1>

      {/* Edit Profile Button */}
      <button className="btn btn-outline-primary mb-3" onClick={() => setIsEditing(true)}>
        Edit Profile
      </button>

      {/* Edit Profile Section */}
      {isEditing && (
        <div className="card p-3 mb-3">
          <h3>Edit Profile</h3>
          <input
            type="text"
            className="form-control my-2"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
            placeholder="Enter new name"
          />
          <input
            type="email"
            className="form-control my-2"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            placeholder="Enter new email"
          />
          <input
            type="password"
            className="form-control my-2"
            name="password"
            value={updatedUser.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
          <button className="btn btn-success me-2" onClick={handleSave}>Save Changes</button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}

      <h3>Your Projects</h3>
      {/* Placeholder for user's projects */}
      <p>No projects yet.</p>

      <h3>Your Contributions</h3>
      {/* Placeholder for user's contributions */}
      <p>No contributions yet.</p>
    </div>
  );
};

export default Dashboard;

