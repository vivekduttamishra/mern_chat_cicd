module.exports = function setupChat(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("joinRoom", ({ name, room }) => {
      socket.join(room);
      socket.username = name; // Store username in the socket object
      socket.room=room;
  
      // Notify others in the room
      io.to(room).emit("message", { name: "System", message: `${name} joined the chat` });
    });
  
    socket.on("chatMessage", ({ room, name, message }) => {
      io.to(room).emit("message", { name, message }); // Broadcast with name
    });

    socket.on('leaveRoom', () => {
      //remove socket form room
      socket.leave(socket.room);     
    })
  
    socket.on("disconnect", () => {
      io.emit("message", { name: "System", message: `${socket.username || "A user"} left` });
    });
  });
  
  };
   