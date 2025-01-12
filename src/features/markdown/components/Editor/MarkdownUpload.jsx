import React, { useContext, useRef, useState } from "react";
import { FileText, Edit, Upload, File } from "lucide-react";
import { ThemeContext } from "../../../../context/ThemeContext";

const MarkdownUpload = ({ onMarkdownLoad, onStartWriting }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      onMarkdownLoad(text);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const text = await file.text();
      onMarkdownLoad(text);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-full ${
        isDarkTheme ? "bg-gray-800" : "bg-gray-50"
      }`}
      onDragEnter={handleDrag}
    >
      <div
        className={`w-full max-w-2xl transition-all duration-300 ${
          dragActive
            ? isDarkTheme
              ? "bg-blue-900/20"
              : "bg-blue-50"
            : isDarkTheme
            ? "bg-gray-800/50"
            : "bg-white"
        } ${
          isDarkTheme ? "border-gray-700" : "border-gray-200"
        } border rounded-lg`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-8 p-8 md:p-10">
          {/* Main Content */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className={`p-4 rounded-full ${
                isDarkTheme ? "bg-gray-700/50" : "bg-gray-100"
              }`}
            >
              <FileText
                size={32}
                className={isDarkTheme ? "text-blue-400" : "text-blue-600"}
              />
            </div>

            <h3
              className={`text-xl font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Create or Upload Markdown
            </h3>

            <p
              className={`text-sm ${
                isDarkTheme ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Start writing or import an existing file
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center w-full gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={onStartWriting}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-md transition-all duration-200 ${
                isDarkTheme
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Edit size={18} />
              <span>New Document</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-md transition-all duration-200 ${
                isDarkTheme
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Upload size={18} />
              <span>Upload File</span>
            </button>
          </div>

          {/* File Info */}
          <div
            className={`flex items-center gap-2 text-xs ${
              isDarkTheme ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <File size={12} />
            <span>.md, .txt files supported</span>
          </div>
        </div>

        {/* Drop Overlay */}
        {dragActive && (
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-lg ${
              isDarkTheme ? "bg-blue-900/20" : "bg-blue-50/90"
            }`}
          >
            <div
              className={`px-6 py-3 rounded-lg ${
                isDarkTheme
                  ? "bg-gray-800 text-blue-400"
                  : "bg-white text-blue-600"
              }`}
            >
              Drop to upload
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default MarkdownUpload;
