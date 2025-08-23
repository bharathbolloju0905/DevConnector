import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    
    const newSocket = io(`${import.meta.env.VITE_BASE_URL}`, {
      transports: ["websocket"],
    });

    setSocket(newSocket);   

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const receiveMessage = (event, callback) => {
    if (socket) {
      console.log("socket",socket)
      socket.on(event, callback);
    }
  };

  const sendMessage = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, receiveMessage, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);