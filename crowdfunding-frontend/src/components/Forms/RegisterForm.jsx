import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import authService from "../../services/authService";

const RegisterForm = () => {
  const { login } = useContext(AuthContext);  // ✅ Use login function instead of setUser

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userData = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      login(userData);  // ✅ Automatically log in and redirect user

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 border rounded">
      <h3>Register</h3>
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
      <button type="submit" className="btn btn-success w-100">Register</button>
    </form>
  );
};

export default RegisterForm;
