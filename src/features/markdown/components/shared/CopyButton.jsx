import { Check, Copy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const CopyButton = ({ onCopy, copied, disabled, isDarkTheme }) => {
  const handleClick = () => {
    onCopy();
    toast.success("Markdown Copied");
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`p-2 rounded-md ${
        isDarkTheme
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-white hover:bg-gray-200"
      } transition text-yellow-400 ${disabled ? "opacity-50" : "opacity-100"}`}
    >
      {copied ? <Check /> : <Copy />}
    </button>
  );
};

export default CopyButton;
