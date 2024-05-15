import { useEffect, useState, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";

const Chat = () => {
  const { customerId } = useParams();
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const customerName = location.state?.customerName;
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`cp/messages/${customerId}/`);
        console.log("chat response: ", JSON.stringify(response.data, null, 2));
        setMessages(response.data.messages || []);
        groupMessagesByDate(response.data.messages);
      } catch (error) {
        console.error("Failed to fetch messages", error.response);
      }
    };
    fetchMessages();
  }, [customerId]);

  useEffect(() => {
    scrollToBottom();
  }, [groupedMessages]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView();
  };

  const groupMessagesByDate = (msgs) => {
    const sortedMessages = msgs.sort(
      (a, b) => new Date(a.messageDateTime) - new Date(b.messageDateTime)
    );
    const grouped = sortedMessages.reduce((acc, msg) => {
      const date = new Date(msg.messageDateTime);
      const dateString = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      if (!acc[dateString]) {
        acc[dateString] = [];
      }
      acc[dateString].push(msg);
      return acc;
    }, {});
    setGroupedMessages(grouped);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axiosInstance.post(`cp/messages/${customerId}/`, {
        message: newMessage,
      });
      const newMessages = [...messages, response.data];
      setMessages(newMessages);
      setMessages(newMessages);
      groupMessagesByDate(newMessages);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message", error.response);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-hidden relative w-full">
      <div className="p-4 shadow-md flex items-center justify-center bg-white sticky top-0 z-10 position">
        <button
          onClick={() => history.goBack()}
          className="bg-gray-200 p-2 rounded-full w-20 absolute left-4"
        >
          Back
        </button>
        <h2 className="m-auto text-lg text-center font-semibold">
          {customerName}
        </h2>
      </div>

      <div className="flex-1 overflow-y-scroll p-4 space-y-2 mb-24">
        {Object.keys(groupedMessages).map((date) => (
          <div key={date}>
            <div className="text-center py-2">
              <span className="px-4 my-2 rounded text-sm text-slate-500">
                {date}
              </span>
            </div>
            {groupedMessages[date].map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col mb-4 ${
                  msg.sourceEnum === "cp" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded break-words ${
                    msg.sourceEnum === "cp"
                      ? "bg-blue-500 text-slate-50"
                      : "bg-blue-100"
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-xs text-gray-600 mt-1">
                  {new Date(msg.messageDateTime).toLocaleTimeString([], {
                    timeStyle: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 shadow-inner flex items-center bg-white absolute w-full bottom-0 z-10">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 p-2 border-2 border-gray-200 rounded-md mr-4 bg-transparent"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded w-24"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
