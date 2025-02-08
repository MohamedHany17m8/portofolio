import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const ChatBot = ({ chatHistory, setChatHistory }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory.map((chatItem) => ({
            role: chatItem.role,
            parts: [{ text: chatItem.parts }],
          })),
          message: {
            parts: [{ text: value }],
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

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        { role: "user", parts: value },
        { role: "model", parts: data },
      ]);

      setValue("");
      setError("");
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
        <h1 className="text-sm font-bold">AI Chat</h1>
      </div>

      {/* Chat History (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {chatHistory.map((chatItem, index) => (
          <div
            key={index}
            className={`flex ${
              chatItem.role === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                chatItem.role === "user"
                  ? "bg-blue-500 text-white dark:bg-blue-700 rounded-bl-none"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-white rounded-br-none"
              }`}
            >
              <ReactMarkdown className="text-sm">
                {chatItem.parts}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t dark:border-gray-700">
        <div className="relative">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="w-full pr-12 pl-4 py-2 border text-black dark:text-white dark:bg-gray-700 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && getResponse()}
          />
          <button
            onClick={getResponse}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center"
          >
            →
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 ml-2">{error}</p>}
      </div>
    </div>
  );
};

export default ChatBot;
