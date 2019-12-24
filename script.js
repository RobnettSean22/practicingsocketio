const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const messageForm = document.getElementById("second-container");
const existedUser = document.getElementById("user-log");

const name = prompt("Create username");
appendMessage("you joined");
socket.emit("new-user", name);
socket.on("chat-message", data => {
  appendMessage(`${data.name}:${data.message}`);
});
socket.on("user-connected", name => {
  appendMessage(`${name} connected`);
});
socket.on("user-disconnected", name => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You:${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
function appendMessage(name) {
  const nameLock = document.createElement("div");
  nameLock.innerText = name;
  existedUser.append(nameLock);
}
