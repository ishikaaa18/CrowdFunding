import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Invalid phone number. It should be 10 digits.");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Prepare form data for submission
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("password", formData.password);
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      // Call the backend service to register the user
      const userData = await authService.register(formDataToSend);
      
      // Once user is registered, log them in (store user data and token in context)
      login(userData);

      // Redirect to dashboard or home after successful registration
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 border rounded">
      <h3 className="text-center">Create an Account</h3>
      {error && <p className="text-danger">{error}</p>}
      
      <input
        type="text"
        name="name"
        className="form-control my-2"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <input
        type="email"
        name="email"
        className="form-control my-2"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        className="form-control my-2"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <textarea
        name="bio"
        className="form-control my-2"
        placeholder="Short Bio (optional)"
        value={formData.bio}
        onChange={handleChange}
      ></textarea>

      <input
        type="password"
        name="password"
        className="form-control my-2"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        className="form-control my-2"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <label>Profile Picture (Optional):</label>
      <input
        type="file"
        accept="image/*"
        className="form-control my-2"
        onChange={handleFileChange}
      />

      <button type="submit" className="btn btn-success w-100" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
