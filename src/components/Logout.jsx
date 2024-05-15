import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function Logout({ onLogout }) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    onLogout();
    history.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
