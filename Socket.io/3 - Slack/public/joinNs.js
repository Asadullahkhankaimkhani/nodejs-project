function joinNs(endPoint) {
  if (nsSocket) {
    nsSocket.close();
    document
      .querySelector("#user-input")
      .removeEventListener("submit", formSubmission);
  }

  nsSocket = io(`http://localhost:9000${endPoint}`);
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
        // console.log("Someone clicked on", e.target.innerHTML);
        joinRoom(e.target.innerText);
      });
    });
    // add room automatically... first time here
    const topRoom = document.querySelector(".room");
    const topRoomName = topRoom.innerText;
    joinRoom(topRoomName);
  });

  nsSocket.on("messageToClients", (msg) => {
    console.log(msg);
    const newMsg = buildHtml(msg);
    document.querySelector("#messages").innerHTML += newMsg;
  });

  document
    .querySelector(".message-form")
    .addEventListener("submit", formSubmission);
}
function formSubmission(event) {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  console.log(newMessage);
  nsSocket.emit("newMessageToServer", { text: newMessage });
}

function buildHtml(msg) {
  const convertedDate = new Date(msg.time).toLocaleString();
  const newHtml = `<li>
  <div class="user-image">
    <img src="${msg.avatar}" />
  </div>
  <div class="user-message">
    <div class="user-name-time">${msg.username} <span>${convertedDate}</span></div>
    <div class="message-text">
    ${msg.text}
    </div>
  </div>
</li>`;
  return newHtml;
}
