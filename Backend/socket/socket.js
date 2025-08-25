const { Server } = require("socket.io");

let io;

function initSocket(httpServer) {
  if (!io) {
    io = new Server(httpServer, {
      cors: {
        origin: "https://dev-connector-seven.vercel.app", 
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("joinRoom", ({ roomId }) => {
        if (roomId) {
          socket.join(roomId);
          console.log(`Socket ${socket.id} joined room: ${roomId}`);
        }
      });

      socket.on("sendMessage", (msg) => {
        if (msg && msg.roomId) {
          console.log("Message received from socket:", msg);
          
          io.to(msg.roomId).emit("receiveMessage", msg);
        }
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}

// Emits an event to a specific room
function emitToRoom(event, data, roomId) {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  if (roomId) {
    io.to(roomId).emit(event, data);
  }
}

module.exports = {
  initSocket,
  emitToRoom,
};
