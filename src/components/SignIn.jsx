import React, { useState, useEffect } from "react";
import ChatBot from "./ChatBot";
import { MessageCircle } from "lucide-react";

const SignIn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Load chat history from localStorage when the component mounts
  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  return (
    <section className="h-screen flex flex-col items-center dark:bg-gray-900 p-4 relative">
      {/* Floating Chat Button */}
      <div
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:ring-4 hover:ring-blue-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={28} />
      </div>

      {/* Chat Window (50% screen height & scrollable history) */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[50vh] bg-white dark:bg-gray-800 dark:text-white border-2 border-blue-500 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <ChatBot chatHistory={chatHistory} setChatHistory={setChatHistory} />
        </div>
      )}
    </section>
  );
};

export default SignIn;
