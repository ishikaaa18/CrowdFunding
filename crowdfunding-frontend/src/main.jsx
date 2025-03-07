import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅ Ensure correct import
import "./assets/styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Router wraps everything */}
      <AuthProvider> {/* ✅ Now AuthProvider can use useNavigate() */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
