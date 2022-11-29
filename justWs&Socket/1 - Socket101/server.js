const http = require("http");

// Websocket example

// // 3rd party module ws!
// const websocket = require("ws");

// // Server
// const server = http.createServer((req, res) => {
//   res.end("I am connected");
// });

// const wss = new websocket.Server({ server });

// wss.on("headers", (headers, req) => {
//   console.log(headers);
// });

// wss.on("connection", (ws, req) => {
//   ws.send("Welcome to the websocket server");
//   ws.on("message", (message) => {
//     console.log(message.toString());
//   });
// });

// Socket.io example

// 3rd party module ws!
const socketio = require("socket.io");

// Server
const server = http.createServer((req, res) => {
  res.end("I am connected");
});

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket, req) => {
  socket.emit("welcome", "Welcome to the websocket server");
  socket.on("message", (message) => {
    console.log(message.data);
  });
});

server.listen(5000);
