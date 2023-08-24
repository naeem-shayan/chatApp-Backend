const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const users = new Map();

io.on("connection", (socket) => {
  console.log(`User connectd with id ${socket.id}`);
  socket.on("newUser", (userId) => {
    console.log("senderIdBackEnd", userId);
    users.set(socket.id, userId);
    // users[socket.id] = userId;
    socket.broadcast.emit("user-connected", userId);
  });
  socket.on("onMessage", ({ currentChat, newMessage }) => {
    console.log("Received", newMessage);
    console.log("receiver", currentChat);
    const sender = users[socket.id];
    console.log("sender", sender);
    console.log("users", users);
    const toSocket = Object.keys(users).find(
      (socketId) => users[socketId] === currentChat
    );
    console.log("to", toSocket);
    if (toSocket) {
      socket.to(toSocket).emit("onMessage", { from: sender, message });
    }
  });
  socket.on("disconnect", () => {
    const disconnectedUser = users[socket.id];
    delete users[socket.id];
    socket.broadcast.emit("user-disconnected", disconnectedUser);
  });
});
