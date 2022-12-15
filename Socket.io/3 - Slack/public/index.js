const socket = io("http://localhost:9000");
let nsSocket = "";
// listen for nsList , which is a list of all the namespaces
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
      joinNs(nsEndpoint);
    });
  });
  joinNs("/wiki");
});
