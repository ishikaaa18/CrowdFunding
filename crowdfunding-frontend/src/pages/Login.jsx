import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/dashboard" />; // Redirect if already logged in
  }

  return <LoginForm />;
};

export default Login;  // ✅ Keep only one default export
