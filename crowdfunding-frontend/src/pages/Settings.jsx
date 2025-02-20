import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "../styles/Settings.css"; // Import styles

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [settings, setSettings] = useState({
    password: "",
    notifications: true,
    theme: "light",
  });

  if (!user) return <Navigate to="/login" replace />; // Redirect if not logged in

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const toggleNotifications = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  const toggleTheme = () => {
    setSettings({ ...settings, theme: settings.theme === "light" ? "dark" : "light" });
  };

  const handleSave = () => {
    alert("Settings updated successfully!");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      logout();
      alert("Account deleted successfully!");
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="settings-section">
        <h3>Change Password</h3>
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          value={settings.password}
          onChange={handleChange}
        />
      </div>

      <div className="settings-section">
        <h3>Notifications</h3>
        <label className="switch">
          <input type="checkbox" checked={settings.notifications} onChange={toggleNotifications} />
          <span className="slider round"></span>
        </label>
        <p>{settings.notifications ? "Enabled" : "Disabled"}</p>
      </div>

      <div className="settings-section">
        <h3>Theme</h3>
        <button className="btn-toggle" onClick={toggleTheme}>
          Switch to {settings.theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      <button className="btn btn-save" onClick={handleSave}>Save Settings</button>
      <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default Settings;
