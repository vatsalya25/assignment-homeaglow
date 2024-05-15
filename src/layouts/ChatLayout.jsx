import Menu from "../components/Menu";
import PropTypes from "prop-types";

const ChatLayout = ({ children }) => {
  return (
    <div className="mt-4 flex flex-col justify-start items-start min-h-screen bg-slate-100 text-slate-900">
      <Menu />
      <div className="chat-layout__content w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

ChatLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ChatLayout;
