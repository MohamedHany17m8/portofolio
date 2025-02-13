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

      {/* Authentication Section */}
      <div className="w-full max-w-md mt-28 p-8 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create Account or Sign In
        </h2>
        <form className="space-y-6">
          <input
            placeholder="Email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-all duration-300 hover:ring-4 hover:ring-green-300">
            Sign Up
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300 hover:ring-4 hover:ring-blue-300">
            Sign In
          </button>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all duration-300 hover:ring-4 hover:ring-red-300">
            Sign In with Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
