const socket = io("http://localhost:9000");
const socket2 = io("http://localhost:9000/admin");
socket.on("connect", () => {
  console.log(socket.id);
});
socket2.on("connect", () => {
  console.log(socket2.id);
});

socket.on("welcome", (msg) => {
  console.log(msg);
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "This is from the client" });
});
document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  console.log(newMessage);
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClient", (msg) => {
  document.querySelector("#message").innerHTML += ` <li>${msg.text}</li>`;
});

// Send an event from the server to this socket only:

// socket.emit()
// socket.send()

// Send an event from a socket to a room:

// NOTE: remember, this will not go to the sending socket

// socket.to(roomName).emit()
// socket.in(roomName).emit()

// Because each socket has it's own room, named by it's socket.id, a socket can send a message to another socket:

// socket.to(anotherSocketId).emit('hey');
// socket.in(anotherSocketId).emit('hey');

// A namespace can send a message to any room:

// io.of(aNamespace).to(roomName).emit()
// io.of(aNamespace).in(roomName).emit()

// A namespace can send a message to the entire namespace

// io.emit()
// io.of('/').emit()
// io.of('/admin').emit()
