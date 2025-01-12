// src/features/sidebar/components/DocumentsModal.jsx
import React, { useContext } from "react";
import { X, FolderIcon } from "lucide-react";
import DocumentsList from "../../markdown/components/DocumentsList";
import NewDocumentButton from "../../markdown/components/NewDocumentButton";
import { ThemeContext } from "../../../context/ThemeContext";

const DocumentsModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={`relative w-full max-w-3xl max-h-[85vh] rounded-xl transform transition-all ${
            isDarkTheme
              ? "bg-gray-900 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-6 border-b ${
              isDarkTheme ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  isDarkTheme
                    ? "bg-gray-800 text-blue-400"
                    : "bg-blue-50 text-blue-500"
                }`}
              >
                <FolderIcon size={24} />
              </div>
              <div>
                <h2
                  className={`text-xl font-bold ${
                    isDarkTheme ? "text-white" : "text-gray-900"
                  }`}
                >
                  My Documents
                </h2>
                <p
                  className={`text-sm ${
                    isDarkTheme ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Manage your saved documents
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDarkTheme
                  ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <NewDocumentButton isDarkTheme={isDarkTheme} />
            </div>

            {/* Scrollable content area */}
            <div
              className={`overflow-y-auto max-h-[50vh] rounded-lg ${
                isDarkTheme ? "custom-scrollbar-dark" : "custom-scrollbar-light"
              }`}
            >
              <DocumentsList />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar-dark::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 4px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }

        .custom-scrollbar-light::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default DocumentsModal;
