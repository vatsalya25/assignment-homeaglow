import UilBars from "@iconscout/react-unicons/icons/uil-bars";
import PropTypes from "prop-types";
import Logout from "./Logout";

function Menu({ onLogout }) {
  return (
    <header className="flex items-center justify-between h-10 px-4 mt-4 mb-6 w-full">
      <div className="flex items-center">
        <UilBars size={38} />
        <h3 className="ml-4 text-2xl">Homeaglow</h3>
      </div>
      <Logout onLogout={onLogout} />
    </header>
  );
}

Menu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Menu;
