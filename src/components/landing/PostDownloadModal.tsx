import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostDownloadModal({ visible, onClose }) {
    const nav = useNavigate();
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6 text-center">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Your screenshot is ready 🎉
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
          Download is ready.  
          Want something better?
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <p>💾 <strong>Save this code permanently</strong></p>
          <p>📂 Build your personal snippet library</p>
          <p>🔄 Track changes & edits</p>
          <p>🌐 Access from any device anytime</p>
        </div>

        <button
          onClick={() => nav("/register")}
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium w-full py-3 rounded-lg mb-4"
        >
          Create Free Account
        </button>

        <button
          onClick={onClose}
          className="text-gray-600 dark:text-gray-300 hover:underline text-sm"
        >
          Close for now
        </button>
      </div>
    </div>
  );
}
