const username = prompt("What is your username?");

const socket = io("http://localhost:9000", {
  query: {
    username,
  },
});

let nsSocket = "";

socket.on("nsList", (nsData) => {
  let namesapcesDiv = document.querySelector(".namespaces");
  namesapcesDiv.innerHTML = "";

  nsData.forEach((ns) => {
    namesapcesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" /></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("ns");
      joinNS(nsEndpoint);
    });
  });
  joinNS("/wiki");
});
