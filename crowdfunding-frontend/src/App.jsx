import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Conditionally render Header and Footer */}
        <Header />
        <div className="container my-4">
          <AppRoutes />
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;

