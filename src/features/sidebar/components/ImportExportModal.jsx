import React, { useContext, useRef } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Upload, Download, X, FileText, FileCode, File } from "lucide-react";
import { useDispatch } from "react-redux";
import { setMarkdown } from "../../markdown/slices/markdownSlice"; // Adjust the import path as needed

const ImportExportModal = ({ isOpen, onClose, currentMarkdown }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // Handle file import
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      dispatch(setMarkdown(content));
      onClose();
    };
    reader.readAsText(file);
  };

  // Handle file export
  const handleExport = (format) => {
    let content = currentMarkdown;
    let mimeType = "text/plain";
    let extension = "txt";

    // Convert content based on format
    if (format === "html") {
      // Basic HTML conversion - you can enhance this further
      content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Exported Markdown</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
        pre { background: #f4f4f4; padding: 1em; border-radius: 4px; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
      mimeType = "text/html";
      extension = "html";
    } else if (format === "md") {
      mimeType = "text/markdown";
      extension = "md";
    }

    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exported-document.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-lg shadow-xl overflow-hidden
        ${
          isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b
          ${isDarkTheme ? "border-gray-700" : "border-gray-200"}`}
        >
          <h2 className="text-xl font-bold">Import/Export</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors
              ${
                isDarkTheme
                  ? "hover:bg-gray-800 text-gray-400 hover:text-gray-100"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Import Section */}
          <div
            className={`p-4 rounded-lg border mb-4
            ${isDarkTheme ? "border-gray-700" : "border-gray-200"}`}
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import
            </h3>
            <p
              className={`text-sm mb-4 ${
                isDarkTheme ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Import a markdown (.md) or text (.txt) file
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept=".md,.txt"
              onChange={handleFileImport}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-full py-2 px-4 rounded-lg border transition-colors
                ${
                  isDarkTheme
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
            >
              Choose File
            </button>
          </div>

          {/* Export Section */}
          <div
            className={`p-4 rounded-lg border
            ${isDarkTheme ? "border-gray-700" : "border-gray-200"}`}
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </h3>
            <p
              className={`text-sm mb-4 ${
                isDarkTheme ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Export your content in different formats
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleExport("md")}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg border transition-colors
                  ${
                    isDarkTheme
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <FileText className="w-4 h-4" />
                Export as Markdown (.md)
              </button>
              <button
                onClick={() => handleExport("txt")}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg border transition-colors
                  ${
                    isDarkTheme
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <File className="w-4 h-4" />
                Export as Text (.txt)
              </button>
              <button
                onClick={() => handleExport("html")}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg border transition-colors
                  ${
                    isDarkTheme
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <FileCode className="w-4 h-4" />
                Export as HTML (.html)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportModal;
