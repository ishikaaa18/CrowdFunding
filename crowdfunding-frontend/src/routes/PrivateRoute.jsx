import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Ensure correct import

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // ✅ Prevent flashing

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

