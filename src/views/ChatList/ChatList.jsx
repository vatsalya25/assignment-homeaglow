import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import UilUserSquare from "@iconscout/react-unicons/icons/uil-user-square";
import "./ChatList.css";

function ChatList() {
  const [chats, setChats] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get("cp/conversations/");
        console.log("chat list: ", response.data);
        setChats(response.data);
      } catch (error) {
        console.error("Failed to fetch chats", error.response);
      }
    };

    fetchChats();
  }, []);

  const routeToChat = (customerId, firstName, lastName) => {
    const customerName = `${firstName} ${lastName}`;
    history.push({
      pathname: `/chats/${customerId}`,
      state: { customerName: customerName },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <h5 className="text-lg font-bold px-4">Messages</h5>
      <div className="w-full overflow-hidden pr-4">
        {chats?.map((chat) => (
          <div
            key={chat.id}
            className="flex items-start space-x-4 max-w-full py-6 px-4 cursor-pointer hover:bg-slate-200 rounded border-b border-gray-200"
            onClick={() => routeToChat(chat.id, chat.firstName, chat.lastName)}
          >
            <UilUserSquare size={38} />

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">
                  {chat.firstName} {chat.lastName}
                </span>

                <span className="text-sm">
                  {new Date(chat.messageDateTime).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <p className="text-ellipsis overflow-hidden line-clamp-2">
                {chat.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
