import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <Router> 
      <AuthProvider>
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
