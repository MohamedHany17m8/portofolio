// Import the express module using ES module syntax
import express from "express";

// Create an instance of express
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Endpoint for chatbot
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  // Simple chatbot logic
  let botResponse;
  if (userMessage.toLowerCase().includes("hello")) {
    botResponse = "Hi there!";
  } else if (userMessage.toLowerCase().includes("how are you")) {
    botResponse = "I am just a bot, but I am functioning well!";
  } else {
    botResponse = "I did not understand that.";
  }

  res.json({ response: botResponse });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Endpoint for chatbot
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  // Simple chatbot logic
  let botResponse;
  if (userMessage.toLowerCase().includes("hello")) {
    botResponse = "Hi there!";
  } else if (userMessage.toLowerCase().includes("how are you")) {
    botResponse = "I am just a bot, but I am functioning well!";
  } else {
    botResponse = "I did not understand that.";
  }

  res.json({ response: botResponse });
});
