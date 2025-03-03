import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user & token from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
  
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("✅ User loaded from localStorage:", parsedUser);
      } catch (error) {
        console.error("❌ Error parsing user data from localStorage:", error);
      }
    } else {
      console.warn("⚠ No user found in localStorage.");
      setUser(null); // Ensure user is set to null if no data is found
    }
  }, []);
  

  // ✅ Login function - Stores user and token
  const login = useCallback((userData) => {
    if (!userData || !userData.token || !userData._id) {
      console.error("❌ Invalid user data:", userData);
      return;
    }

    console.log("🔹 Logging in user:", userData);

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);

    navigate("/dashboard");
  }, [navigate]);

  // ✅ Logout function - Clears user and token
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("✅ User logged out");
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
