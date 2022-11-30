function joinNs(endPoint) {
  const nsSocket = io(`http://localhost:9000${endPoint}`);
  nsSocket.on("nsRoomLoad", (nsRooms) => {
    const roomList = document.querySelector(".room-list");
    roomList.innerHTML = ``;
    nsRooms.forEach((room) => {
      let glphy;
      if (room.privateRoom) {
        glphy = "lock";
      } else {
        glphy = "globe";
      }
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glphy}"></span>${room.roomTitle}</li>`;
    });
    // add click listener to each room
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log("Someone clicked on", e.target.innerHTML);
      });
    });
  });

  nsSocket.on("messageToClient", (msg) => {
    console.log(msg);
    document.querySelector("#message").innerHTML += `<li>${msg.text}</li>`;
  });

  document
    .querySelector(".message-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newMessage = document.querySelector("#user-message").value;
      console.log(newMessage);
      socket.emit("newMessageToServer", { text: newMessage });
    });
}
