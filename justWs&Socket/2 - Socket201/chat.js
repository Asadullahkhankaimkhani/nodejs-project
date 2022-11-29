const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = socketio(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "Welcome to the socket io server" });
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  });
  socket.on("newMessageToServer", (msg) => {
    io.emit("messageToClient", { text: msg.text });
  });

  // TODO:  Note
  // The server can still communicate across namespaces
  // but on the clientInformation, the socket needs to in that namespaces
  // in order to get the events
  setTimeout(() => {
    io.of("/admin").emit("welcome", "welcome from main channel admin");
  }, 2000);
});
io.of("/admin").on("connection", (socket2) => {
  // socket2.emit("welcome", "welcome message form admin channel");
  io.of("/admin").emit("welcome", "Welcome to the admin channel 1.0");
});
