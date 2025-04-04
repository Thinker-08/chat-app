const express = require("express");
const connectDB = require("./app/config/db");
const env = require("dotenv").config();
const userRoutes = require("./app/routes/userRoutes");
const chatRoutes = require("./app/routes/chatRoutes");
const messageRoutes = require("./app/routes/messageRoutes");
const { notFound, errorHandler } = require("./app/middleware/errorMiddleware");
const path = require("path");
const cors = require('cors');
connectDB(process.env.MONGO_URI);
const app = express();
app.use(cors());
app.use(express.json());
console.log("another test 4")
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "../frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User joined", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => {
    console.log("Hi this is typing", room)
    socket.in(room).emit("typing")
  });
  socket.on("stop typing", (room) => {
    console.log("Stopped TYPING", room)
    socket.in(room).emit("stop typing")
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      console.log(chat, newMessageRecieved.sender._id)
      if (user._id != newMessageRecieved.sender._id){
        console.log("Message sent by user", newMessageRecieved.sender._id, "to user", user._id, "in", user._id)
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      }
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
