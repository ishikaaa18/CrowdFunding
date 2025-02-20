import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  if (!user) return <Navigate to="/login" replace />; // Redirect to login if not authenticated

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    login({ ...user, ...updatedUser });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>

      {!isEditing ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="profile-edit">
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
          <button className="btn btn-success me-2" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
