// Select elements from the DOM
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Ollama host URL
const ollamaUrl = "https://ready-crisp-titmouse.ngrok-free.app/"; // Replace this with your host URL

function addMessage(message, isUser = true) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  // Prefix user messages
  if (isUser) {
    messageDiv.innerHTML = `<strong>You:</strong> ${marked.parse(message)}`;
  } else {
    messageDiv.innerHTML = `<strong>LLM:</strong> ${marked.parse(message)}`;
  }

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get the response from LLaMA
async function getLLaMAResponse(message) {
  try {
    const response = await fetch(ollamaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: message
      })
    });

    const data = await response.json();
    return data.response; // Assuming the response from LLaMA API is in this format
  } catch (error) {
    console.error("Error fetching LLaMA response:", error);
    return "Error: Unable to get a response from the server.";
  }
}

// Event listener for sending a message
sendButton.addEventListener("click", async () => {
  const message = messageInput.value.trim();

  if (message) {
    // Display the user's message
    addMessage(message, true);
    messageInput.value = ""; // Clear input field

    // Get the response from LLaMA
    const llamaResponse = await getLLaMAResponse(message);

    // Display the LLaMA's response
    addMessage(llamaResponse, false);
  }
});

// Allow pressing 'Enter' to send a message
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});

console.log(typeof marked); // This should output "function"
