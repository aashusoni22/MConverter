import { Settings } from "lucide-react";
import React from "react";

const MobileSettingsButton = ({ onToggle, isDarkTheme }) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg md:hidden transition-colors ${
        isDarkTheme
          ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
    >
      <Settings className="w-5 h-5" />
    </button>
  );
};

export default MobileSettingsButton;
