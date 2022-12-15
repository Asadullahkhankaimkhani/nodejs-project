function joinRoom(roomName) {
  // Send this roomName to the server;
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span></span>`;
  });

  nsSocket.on("historyCatchUp", (history) => {
    const messageUl = document.querySelector("#messages");
    messageUl.innerHTML = "";

    history.forEach((msg) => {
      const newMsg = buildHtml(msg);
      const currentMessages = messageUl.innerHTML;
      messageUl.innerHTML = currentMessages + newMsg;
    });
    messageUl.scrollTo(0, messageUl.scrollHeight);
  });

  nsSocket.on("updateMembers", (numMember) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${numMember} <span class="glyphicon glyphicon-user"></span></span>`;
    document.querySelector(".curr-room-text").innerHTML = `${roomName} `;
  });
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
