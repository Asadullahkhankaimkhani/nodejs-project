function joinRoom(roomName) {
  // Send this roomName to the server;
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span></span>`;
  });
}
