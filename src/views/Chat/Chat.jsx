import { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";

const Chat = () => {
  const { customerId } = useParams();
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const customerName = location.state?.customerName;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`cp/messages/${customerId}/`);
        console.log("chat response: ", response);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Failed to fetch messages", error.response);
      }
    };
    fetchMessages();
  }, [customerId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axiosInstance.post(`cp/messages/${customerId}/`, {
        message: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message", error.response);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <div className="p-4 shadow-md flex items-center justify-start bg-white sticky top-0 z-10">
        <button
          onClick={() => history.goBack()}
          className="bg-gray-200 p-2 rounded-full"
        >
          Back
        </button>
        <h2 className="m-auto text-lg text-center font-semibold">
          {customerName}
        </h2>
      </div>

      <div className="flex-1 overflow-y-scroll p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.sourceEnum === "cp" ? "items-end" : "items-start"
            }`}
          >
            <div className="max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg bg-blue-100 break-words">
              {msg.message}
            </div>
            <span className="text-xs text-gray-600">
              {new Date(msg.messageDateTime).toLocaleTimeString([], {
                timeStyle: "short",
              })}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 shadow-inner flex items-center bg-white sticky bottom-[64px] z-10">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 p-2 border-2 border-gray-200 rounded-md mr-4 bg-transparent"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
