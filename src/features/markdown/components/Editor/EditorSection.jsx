import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMarkdown, setEditorEnabled } from "../../slices/markdownSlice";
import MarkdownUpload from "./MarkdownUpload";
import EditorTools from "./EditorTools";
import { useSettings } from "../../../../hooks/useSettings";
import { AlertCircle, CheckCircle, EditIcon, SaveIcon } from "lucide-react";
import SaveDocumentModal from "../SaveDocumentModal";
import { useAutoSave } from "../../../../hooks/useAutoSave";

const EditorSection = ({ isDarkTheme }) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const [savingStatus, setSavingStatus] = useState("idle");
  const { markdown, editorEnabled, view } = useSelector(
    (state) => state.markdown
  );
  const { settings } = useSettings();
  useAutoSave(setSavingStatus);

  const getSavingIndicator = () => {
    switch (savingStatus) {
      case "saving":
        return (
          <div
            className={`flex items-center space-x-2 text-sm ${
              isDarkTheme ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <SaveIcon size={16} className="animate-spin" />
            <span>Saving...</span>
          </div>
        );
      case "saved":
        return (
          <div
            className={`flex items-center space-x-2 text-sm ${
              isDarkTheme ? "text-green-400" : "text-green-600"
            }`}
          >
            <CheckCircle size={16} />
            <span>Saved</span>
          </div>
        );
      case "error":
        return (
          <div
            className={`flex items-center space-x-2 text-sm ${
              isDarkTheme ? "text-red-400" : "text-red-600"
            }`}
          >
            <AlertCircle size={16} />
            <span>Save failed</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        fontSize: settings.fontSize,
        fontFamily: settings.fontFamily,
      }}
      className={`editor-section w-full ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100"
      } rounded-md shadow-lg p-4 ${
        view === "editor"
          ? "w-full h-[79.2vh]"
          : view === "split"
          ? "lg:w-1/2 h-[79vh]"
          : "hidden"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <span className="flex items-center space-x-2">
            <EditIcon
              className={`${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              } w-5 h-5`}
            />
            <h2
              className={`${
                isDarkTheme ? "text-white" : "text-gray-700"
              } text-lg font-semibold`}
            >
              Editor
            </h2>
          </span>
          <div className="flex items-center space-x-2">
            {getSavingIndicator()}
            <EditorTools editorRef={textareaRef} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        {!editorEnabled ? (
          <MarkdownUpload
            onMarkdownLoad={(content) => {
              dispatch(setMarkdown(content));
              dispatch(setEditorEnabled(true));
            }}
            onStartWriting={() => dispatch(setEditorEnabled(true))}
          />
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={markdown}
                onChange={(e) => dispatch(setMarkdown(e.target.value))}
                style={{
                  fontSize: settings.fontSize,
                  fontFamily: settings.fontFamily,
                  color: isDarkTheme ? "#e5e7eb" : "#1f2937",
                  transition: "background-color 0.2s ease",
                }}
                className={`w-full custom-scrollbar resize-none p-4 h-[70vh]  rounded-md focus:outline-none ${
                  isDarkTheme
                    ? "bg-gray-800 placeholder-gray-500"
                    : "bg-white placeholder-gray-400"
                }`}
                placeholder="Type your markdown here..."
                spellCheck="false"
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkTheme ? "#1f2937" : "#f3f4f6"};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkTheme ? "#4b5563" : "#d1d5db"};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkTheme ? "#6b7280" : "#9ca3af"};
        }
      `}</style>

      <SaveDocumentModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </div>
  );
};

export default EditorSection;
