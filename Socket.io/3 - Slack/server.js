const express = require("express");
const app = express();
const socketio = require("socket.io");
const namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

// Cors for socket
const io = socketio(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  // send the nsData back  to the client. we need to use socket, not io. because we want it to
  // go the just this client
  socket.emit("nsList", nsData);
});

// loop through each namespaces and listen for a connections
namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
    // a socket has connected to one of our chat group namespaces.
    // send that ns group info back
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
      // deal with the history... once we have it
      nsSocket.join(roomToJoin);
      const totalUser = io.of("/wiki").adapter.rooms.get(roomToJoin).size;
      numberOfUsersCallback(totalUser);
      const nsRoom = namespaces[0].rooms.find((room) => {
        return room.roomTitle === roomToJoin;
      });
      nsSocket.emit("historyCatchUp", nsRoom.history);
    });
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: "asad",
        avatar: "https://via.placeholder.com/30",
      };
      console.log(fullMsg);
      // Send this message to All the socket that are in the room that this socket is in.
      // how can we find out what rooms this socket is in?
      console.log(Array.from(nsSocket.rooms));

      // the user will be in the 2nd room in the object list
      // this is because the socket always joins its own room on connection
      // get the keys
      const roomTitle = Array.from(nsSocket.rooms)[1];
      // we need to find the room object fot this room
      const nsRoom = namespaces[0].rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });

      nsRoom.addMessage(fullMsg);
      io.of("/wiki").to(roomTitle).emit("messageToClients", fullMsg);
    });
  });
});
