import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Handle login errors

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Replace this with actual API authentication
    if (email === "test@example.com" && password === "password123") {
      const userData = { email, username: "TestUser" }; // Ensure username is included
      login(userData);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 border rounded">
      <h3>Login</h3>
      {error && <p className="text-danger">{error}</p>} {/* Display errors if any */}
      <input
        type="email"
        className="form-control my-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="form-control my-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
};

export default LoginForm;

