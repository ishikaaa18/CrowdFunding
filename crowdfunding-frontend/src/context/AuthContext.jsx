import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  // **Register function** (✅ Add this)
  const register = async (formData) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ Ensure file upload works
      });
  
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/dashboard"); // ✅ Redirect after successful registration
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    }
  };
  

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
