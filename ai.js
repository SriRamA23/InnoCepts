const API_KEY = "AIzaSyALHFJlBfw_12IycYhso6CfjaXMmwgBAPQ"; // Replace with your actual API key
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    // Display user message
    displayMessage(message, "user");

    // Call Gemini API for AI response
    const response = await getAIResponse(message);

    // Display AI response
    displayMessage(response, "bot");

    // Clear input field
    userInput.value = "";
}

function displayMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    chatbox.appendChild(messageDiv);

    // Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function getAIResponse(userMessage) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${API_KEY}`;

    const requestBody = {
        contents: [{ parts: [{ text: userMessage }] }]  // Properly formatted request
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        // Check if response contains valid AI output
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Sorry, I couldn't generate a response.";
        }
    } catch (error) {
        console.error("API Error:", error);
        return "Error: Failed to connect to AI.";
    }
}
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

