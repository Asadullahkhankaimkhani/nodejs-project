const socket = io("http://localhost:9000");

socket.on("nsList", (nsData) => {
  let namespaceDiv = document.querySelector(".namespaces");
  namespaceDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespaceDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`;
  });

  // Add a click listener
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    // console.log(elem.getAttribute("ns"));

    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("ns");
      console.log(nsEndpoint);
    });
  });
  const nsSocket = io("http://localhost:9000/wiki");
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
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "This is from the client" });
});

socket.on("joined", (msg) => {
  console.log(msg);
});
