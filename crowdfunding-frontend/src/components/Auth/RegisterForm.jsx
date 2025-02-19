import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const RegisterForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Dummy registration logic (Replace with API call)
    const userData = { email, username }; 
    login(userData);
  };

  return (
    <form onSubmit={handleRegister} className="p-4 border rounded">
      <h3>Register</h3>
      {error && <p className="text-danger">{error}</p>} {/* Show errors */}
      <input
        type="text"
        className="form-control my-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <input
        type="password"
        className="form-control my-2"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-success w-100">Register</button>
    </form>
  );
};

export default RegisterForm;
