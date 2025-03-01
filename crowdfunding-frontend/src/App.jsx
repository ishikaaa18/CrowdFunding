import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";

function Layout() {
  const location = useLocation();
  
  // Define routes where Header & Footer should NOT appear
  const excludeHeaderFooter = ["/dashboard"];

  return (
    <>
      {!excludeHeaderFooter.includes(location.pathname) && <Header />}
      
      <div className="container my-4">
        <AppRoutes />
      </div>
      
      {!excludeHeaderFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;


