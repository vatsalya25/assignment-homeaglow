import Menu from "../components/Menu";
import PropTypes from "prop-types";

const ChatLayout = ({ children, onLogout }) => {
  return (
    <div className="flex flex-col justify-start items-start min-h-screen bg-slate-100 text-slate-900 w-full">
      <Menu onLogout={onLogout} />
      <div className="chat-layout__content w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

ChatLayout.propTypes = {
  children: PropTypes.element.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ChatLayout;
