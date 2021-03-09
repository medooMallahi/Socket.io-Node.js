function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
  });
  nsSocket.on("historyCatchUp", (history) => {
    const messageUl = document.querySelector("#messages");
    messageUl.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = buildHTML(msg);
      const currentMessage = messageUl.innerHTML;
      messageUl.innerHTML = currentMessage + newMsg;
    });
    messageUl.scrollTo(0, messageUl.scrollHeight);
  });
  nsSocket.on("updateMembers", (numMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span>`;
    document.querySelector(".curr-room-text").innerText = roomName;
  });
}
