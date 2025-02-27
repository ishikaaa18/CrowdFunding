import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {AuthContext} from "../context/AuthContext"; // ✅ Ensure correct import

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    console.log("🔹 User not logged in, redirecting to login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
