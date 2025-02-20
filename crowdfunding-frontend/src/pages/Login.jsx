import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import authService from "../services/authService";


const Login = () => {
  const { user } = useContext(AuthContext);

  // If user is already logged in, redirect to dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default Login;

