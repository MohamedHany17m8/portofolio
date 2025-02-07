import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const PORT = 8000;
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON requests
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_API_KEY);

app.post("/gemini", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Convert history to proper format
    const history = req.body.history.map((item) => ({
      role: item.role,
      parts: item.parts.map((part) =>
        typeof part === "string" ? { text: part } : part
      ),
    }));

    const chat = model.startChat({
      history: history,
    });

    // Convert message parts to proper format
    const msgParts = req.body.message.parts.map((part) =>
      typeof part === "string" ? { text: part } : part
    );

    const result = await chat.sendMessage(msgParts);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Something went wrong on the server.");
  }
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
