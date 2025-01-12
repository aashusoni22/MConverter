import React, { useState, useRef, useEffect } from "react";
import { Check, X, Edit2 } from "lucide-react";

const EditableTitle = ({
  initialTitle,
  onSave,
  isDarkTheme,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className={`group ${className}`}>
      {isEditing ? (
        <div className="flex items-center space-x-2 z-20 relative">
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`px-2 py-1 rounded-md w-full outline-none border ${
              isDarkTheme
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            }`}
          />
          <div className="flex items-center space-x-1 bg-inherit">
            <button
              onClick={handleSave}
              className={`p-1 rounded-md ${
                isDarkTheme
                  ? "hover:bg-green-800/50 text-green-400"
                  : "hover:bg-green-100 text-green-600"
              }`}
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className={`p-1 rounded-md ${
                isDarkTheme
                  ? "hover:bg-red-800/50 text-red-400"
                  : "hover:bg-red-100 text-red-600"
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <h3
            className={`truncate ${
              isDarkTheme ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <button
            onClick={() => setIsEditing(true)}
            className={`ml-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
              isDarkTheme
                ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <Edit2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableTitle;
