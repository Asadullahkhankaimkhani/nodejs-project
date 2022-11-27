const http = require("http");

// 3rd party module ws!
const websocket = require("ws");

// Server
const server = http.createServer((req, res) => {
  res.end("I am connected");
});

const wss = new websocket.Server({ server });

wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (ws, req) => {
  ws.send("Welcome to the websocket server");
  ws.on("message", (message) => {
    console.log(message.toString());
  });
});

server.listen(5000);
