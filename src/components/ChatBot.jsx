import React from "react";
import { useState } from "react";

const ChatBot = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who won the Latest Novel Peace Prize?",
    "Where does pizza come from?",
    "How do you make a BLT sandwich?",
    "What is the capital of France?",
    "Who wrote 'To Kill a Mockingbird'?",
    "What is the largest planet in our solar system?",
    "How many continents are there?",
    "What is the boiling point of water?",
    "Who painted the Mona Lisa?",
    "What is the speed of light?",
  ];

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }
    try {
      // Update the options in getResponse method
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory.map((chatItem) => ({
            role: chatItem.role,
            parts: [{ text: chatItem.parts }], // Wrap parts in array with text objects
          })),
          message: {
            parts: [{ text: value }], // Wrap message in text object
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      console.log("Server response:", data);

      // Update chat history correctly
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);
      setValue("");
      setError("");
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="app mt-10 flex justify-center items-center">
      <section className="search-section bg-white p-8 dark:bg-gray-800 dark:text-white rounded-lg border shadow-md">
        <p className="text-lg font-medium text-gray-800 mb-4 dark:text-white">
          What do you want to know?
          <button
            onClick={surprise}
            disabled={!chatHistory}
            className="surprise bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Surprise me
          </button>
        </p>
        <div className="input-container relative">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="When is Christmas?"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-lg"
          />
          {!error && (
            <button
              onClick={getResponse}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Ask me
            </button>
          )}
          {error && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p>{error}</p>}

        <div className="search-result">
          {chatHistory.map((chatItem, _index) => (
            <div key={_index}>
              <p className="answer">
                {chatItem.role} : {chatItem.parts}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChatBot;
