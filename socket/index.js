const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log(`User connectd with id ${socket.id}`);
  socket.on("newUser", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user-connected", username);
  });
  socket.on("onMessage", ({ to, message }) => {
    console.log("Received", message);
    const sender = users[socket.id];
    console.log("sender", sender);
    const toSocket = Object.keys(users).find(
      (socketId) => users[socketId] === to
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
