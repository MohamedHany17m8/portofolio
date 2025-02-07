import React from "react";

const ChatBot = () => {
  return (
    <div class="app mt-10 flex justify-center items-center">
      <section class="search-section bg-white p-8 dark:bg-gray-800 dark:text-white rounded-lg border shadow-md">
        <p class="text-lg font-medium text-gray-800 mb-4 dark:text-white">
          What do you want to know?
          <button class="surprise bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
            Surprise me
          </button>
        </p>
      </section>
    </div>
  );
};

export default ChatBot;
