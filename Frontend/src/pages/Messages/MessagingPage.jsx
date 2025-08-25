import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useUserContext } from "../../Context/UserContext";
import axios from 'axios';
import {useSocketContext} from "../../Context/SocketContext";
const MessagingPage = () => {
  const { userId: recipientId } = useParams();
  const location = useLocation();
  const { profile : initialRecipientInfo } = location.state || {};
  const { user: currentUser } = useUserContext();
  const { socket,sendMessage,receiveMessage} = useSocketContext();

  const [recipientInfo, setRecipientInfo] = useState(initialRecipientInfo);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [chatRoomId, setChatRoomId] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 
  useEffect(() => {
    if (!recipientInfo && recipientId) {
      const fetchRecipientDetails = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${recipientId}`, { withCredentials: true });
          setRecipientInfo(response.data.user); // Adjust based on your API response for a single user
        } catch (error) {
          console.error("Error fetching recipient details:", error);
        }
      };
      fetchRecipientDetails();
    }
  }, [recipientInfo, recipientId]);


  // Effect for chat room setup, message fetching, and socket listeners
  useEffect(() => {
    if (!currentUser || !recipientId) return;

    const currentUserId = currentUser._id;
    const sortedIds = [currentUserId, recipientId].sort();
    const newChatRoomId = `chat_${sortedIds[0]}_${sortedIds[1]}`;
    setChatRoomId(newChatRoomId);

    sendMessage("joinRoom", { roomId: newChatRoomId });
    console.log(`Attempting to join room: ${newChatRoomId}`);

    const handleNewMessage = (msg) => {
      console.log("Client received message from socket:", msg, "Current room:", newChatRoomId);
      if (msg.roomId === newChatRoomId) {
        setMessages((prevMessages) => {
          // Deduplication based on consistent fields (timestamp and senderId string)
          if (prevMessages.find(m => m.timestamp === msg.timestamp && m.senderId === msg.senderId)) {
            return prevMessages;
          }
          // msg from socket should have senderId (string), text, timestamp, roomId, senderName
          return [...prevMessages, msg];
        });
      }
    };

    const cleanupSocketListener = receiveMessage("receiveMessage",handleNewMessage);
    console.log("lol",cleanupSocketListener)

    const fetchChatHistory = async () => {
      if (!newChatRoomId) return;
      try {
        console.log(`Fetching chat history for room: ${newChatRoomId}`);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/messages/message/${newChatRoomId}`, { withCredentials: true });
        console.log("Chat history fetched:", response.data.messages);
        
        // Normalize DB messages
        const normalizedMessages = response.data.messages.map(dbMsg => ({
          _id: dbMsg._id, // Keep original DB ID
          roomId: dbMsg.roomId,
          senderId: dbMsg.senderId?._id || dbMsg.sender, // Ensure senderId is a string
          senderName: dbMsg.senderId?.fullname || dbMsg.senderName, // Get senderName
          text: dbMsg.text || dbMsg.content,
          timestamp: dbMsg.timestamp || dbMsg.createdAt,
          // Add other fields if necessary, like recipientId if your model has it directly
        }));
        setMessages(normalizedMessages || []);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setMessages([]);
      }
    };
    fetchChatHistory();

    return () => {
      console.log(`Leaving room: ${newChatRoomId}`);
      if (typeof cleanupSocketListener === 'function') {
        cleanupSocketListener();
      }
    };
  }, [currentUser, recipientId]);

  const handleSendMessage = async () => {
    if (input.trim() && currentUser && recipientId && chatRoomId) {
      const currentUserId = currentUser._id;

      // Use consistent field names: senderId, text, senderName
      const msg = {
        roomId: chatRoomId,
        senderId: currentUserId,
        senderName: currentUser.fullname, // Include sender's name
        receiverId: recipientId, // Keep if your backend/socket logic uses it
        text: input,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, msg]); // Optimistic update
      sendMessage("sendMessage", msg);
      setInput("");

      try {
        // Persist message to backend (ensure backend expects this structure)
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/messages/send`, msg, { withCredentials: true });
        if (response.status === 201) {
          console.log("Message persisted successfully:", response.data);
          // Optionally, update the message in state with _id from backend if needed
          // For example, by finding the optimistically added message and updating its _id
        } else {
          console.error("Failed to persist message:", response.data);
        }
      } catch (error) {
          console.error("Error persisting message:", error);
      }
    }
  };

  if (!currentUser) {
    return <div className="p-4 text-center">Loading your information...</div>;
  }
  if (!recipientInfo) {
    return <div className="p-4 text-center">Loading recipient information...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex flex-col ">
        <div className="bg-white shadow-md p-3 flex items-center sticky top-0 z-10">
          <Link to="/home" className="mr-3">
            <FaArrowLeftLong className="text-gray-600 h-5 w-5 hover:text-[#4C4EE7]" />
          </Link>
          <img
            src={recipientInfo?.profilepic?.startsWith('http') ? recipientInfo.profilepic : `${recipientInfo?.profilepic}`}
            alt={recipientInfo?.fullname}
            className="h-10 w-10 rounded-full mr-3 object-cover"
          />
          <h1 className="text-lg font-semibold text-gray-800">{recipientInfo?.fullname || "Chat"}</h1>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-2 bg-gray-50">
          {messages.map((msg, idx) => {
            // Now msg.senderId should consistently be an ID string
            const isCurrentUserSender = msg.senderId === currentUser._id;
            const messageText = msg.text; // msg.text should be consistent

            return (
              <div
                key={(msg._id || msg.timestamp) + msg.senderId + idx} // Use DB _id if available
                className={`flex ${
                  isCurrentUserSender ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-2 px-3 rounded-lg shadow ${
                    isCurrentUserSender
                      ? "bg-[#4C4EE7] text-white rounded-br-none" // Current user's message
                      : "bg-white text-gray-800 rounded-bl-none" // Other user's message
                  }`}
                >
                  <p className="text-sm">{messageText}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white p-3 border-t border-gray-200 flex items-center">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg p-2 pl-3 focus:outline-none focus:ring-1 focus:ring-[#4C4EE7] focus:border-[#4C4EE7]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' &&handleSendMessage()}
            placeholder={`Message ${recipientInfo?.fullname || ""}...`}
          />
          <button
            className="ml-3 bg-[#4C4EE7] text-white px-5 py-2 rounded-lg hover:bg-[#3b3fd9] transition duration-200 font-semibold"
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;