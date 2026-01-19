const API_URL = "http://127.0.0.1:8000/chat" //local fastapi endpoint
const session_id = "user_" + Math.floor(Math.random() * 10000);//temporary user session


function togglechat(){
    const chat = document.getElementById("chatContainer");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}


function appendMessage(role, text) {
    const box = document.getElementById("chatBox");
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${role}:</strong> ${text}`;
    msg.style.margin = "6px 0";
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}


async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.ariaValueMax.trim();
    if (!text) return;


    appendMessage("You", text);
    input.value = "";


    try {
  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      query: message
    })
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  const data = await response.json();
  appendMessage("MindEase", data.response);

} catch (error) {
  appendMessage(
    "MindEase",
    "I'm here with you. Please refresh the page and try again."
  );
}

}