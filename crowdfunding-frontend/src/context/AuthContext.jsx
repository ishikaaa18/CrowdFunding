import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user & token from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Login function
  const login = useCallback((userData) => {
    if (!userData || !userData.token) {
      console.error("❌ Invalid user data:", userData);
      return;
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token); // ✅ Store token separately

    console.log("✅ User logged in:", userData);
    navigate("/dashboard"); // ✅ Redirect to dashboard
  }, [navigate]);

  // ✅ Logout function
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ Clear token
    console.log("✅ User logged out");
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
