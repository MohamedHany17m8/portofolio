import React, { useState, useEffect } from "react";
import ChatBot from "./ChatBot";
import { MessageCircle } from "lucide-react";
import { app } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const SignIn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const auth = getAuth(app);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };
    setData({ ...data, ...inputs });
  };

  const addData = async () => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("Login Successful!");
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message); // Show a more useful error message
    }
  };

  const handlelogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        alert("Logged In");
      } else {
        alert("Not Logged In");
      }
    });
  }, []);

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
          Sign In
        </h2>
        <div className="space-y-6">
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={data.email}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputs}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={data.password}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputs}
          />
          <button
            onClick={addData}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300 hover:ring-4 hover:ring-blue-300"
          >
            Log In
          </button>
          <button
            onClick={handlelogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all duration-300 hover:ring-4 hover:ring-red-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
