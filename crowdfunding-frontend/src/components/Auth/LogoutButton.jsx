import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <button onClick={logout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
