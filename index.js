const express = require("express");
const mongoose=require("mongoose");
const app = express();
const cors=require("cors");
const bodyParser=require("body-parser");


mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log(error));

const conversationRoutes=require("./routes/conversation");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");


app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// const users = {};

// io.on("connection", (socket) => {
//   console.log("User connected with id :", socket.id);
//   socket.on("newUser", (username) => {
//     console.log("first")
//     users[socket.id] = username;
//     socket.broadcast.emit("user-connected", username);
//   });

//   socket.on("onMessage", ({ to, message }) => {
//     const sender = users[socket.id];
//     const toSocket = Object.keys(users).find(
//       (socketId) => users[socketId] === to
//     );
//     if (toSocket) {
//       socket.to(toSocket).emit("onMessage", { from: sender, message });
//     }
//   });

//   socket.on("disconnect", () => {
//     const disconnectedUser = users[socket.id];
//     delete users[socket.id];
//     socket.broadcast.emit("user-disconnected", disconnectedUser);
//   });
// });