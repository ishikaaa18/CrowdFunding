import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ Ensure correct import

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    console.log("🔹 Checking authentication in ProtectedRoute:");
    console.log("✅ Current user from AuthContext:", user);
  }, [user]);

  if (!user || !user._id) { // ✅ Ensure `_id` is checked
    console.warn("⚠ User not logged in, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
