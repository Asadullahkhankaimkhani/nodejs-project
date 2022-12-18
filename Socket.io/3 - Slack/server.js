const express = require("express");
const app = express();
const socketio = require("socket.io");
const namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () => {
  console.log("server listening on http://localhost:9000");
});

// Cors for socket
const io = socketio(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//  Get all the namespaces
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
    const username = nsSocket.handshake.query.username;
    console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
    // a socket has connected to one of our chat group namespaces.
    // send that ns group info back
    nsSocket.emit("nsRoomLoad", namespace.rooms);
    // Join room namespaces
    nsSocket.on("joinRoom", (roomToJoin, numberOfUsersCallback) => {
      // deal with the history... once we have it
      const roomToLeave = Array.from(nsSocket.rooms)[0];
      nsSocket.leave(roomToLeave);
      updateRoomMembers(namespace, roomToLeave);
      nsSocket.join(roomToJoin);

      // numberOfUsersCallback(totalUser);
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomToJoin;
      });
      nsSocket.emit("historyCatchUp", nsRoom.history);
      updateRoomMembers(namespace, roomToJoin);
    });

    // Sending messages
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: username,
        avatar: "https://via.placeholder.com/30",
      };
      // console.log(fullMsg);
      // Send this message to All the socket that are in the room that this socket is in.
      // how can we find out what rooms this socket is in?
      // console.log(Array.from(nsSocket.rooms));

      // the user will be in the 2nd room in the object list
      // this is because the socket always joins its own room on connection
      // get the keys
      const roomTitle = Array.from(nsSocket.rooms)[0];
      // we need to find the room object fot this room
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });

      nsRoom.addMessage(fullMsg);
      io.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg);
    });
  });
});

function updateRoomMembers(namespace, roomTitle) {
  const totalUser = io
    .of(namespace.endpoint)
    .adapter.rooms.get(roomTitle)?.size;
  // Send back the number of users in this room all sockets connected to this room
  io.of(namespace.endpoint).in(roomTitle).emit("updateMembers", totalUser);
}
