// TextAreaField.jsx
import React from "react";

const TextAreaField = ({ value, onChange }) => {
  return (
    <div className="relative w-full h-full">
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Введите текст"
        className="w-full h-full bg-blue-500 text-white placeholder-white outline-none p-4 rounded-md resize-none min-h-32"
      />
      <div className="absolute bottom-8 right-4 text-white">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
    </div>
  );
};

export default TextAreaField;