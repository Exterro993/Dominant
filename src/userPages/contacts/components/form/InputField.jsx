// InputField.jsx
import React from "react";

const InputField = ({ placeholder, value, onChange, icon }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-blue-500 text-white placeholder-white outline-none p-4 rounded-md"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
        {icon}
      </div>
    </div>
  );
};

export default InputField;