import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Auth Context
import { Link } from "react-router-dom";
import "../assets/styles/Register.css";

const Register = () => {
  const { register } = useContext(AuthContext); // ✅ Get register function
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
    profileImage: null, // ✅ For file upload
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] }); // ✅ Store image file
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // ✅ Use FormData for file upload
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("password", formData.password);
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    register(formDataToSend); // ✅ Call register function
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Profile Image</label>
            <input type="file" name="profileImage" onChange={handleFileChange} />
          </div>

          <button type="submit" className="register-btn">Register</button>

          <p className="redirect-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
