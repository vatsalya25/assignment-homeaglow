import UilBars from "@iconscout/react-unicons/icons/uil-bars";
import { useHistory } from "react-router-dom";

function Menu() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    history.push("/login");
  };

  return (
    <header className="flex items-center justify-between h-10 px-4 mb-6 w-full">
      <div className="flex items-center">
        <UilBars size={38} />
        <h3 className="ml-4 text-2xl">Homeaglow</h3>
      </div>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
}

export default Menu;
