import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMarkdown, setEditorEnabled } from "../../slices/markdownSlice";
import EditorHeader from "./EditorHeader";
import MarkdownUpload from "./MarkdownUpload";
import StatusBar from "../shared/StatusBar";
import EditorTools from "./EditorTools";
import { useSettings } from "../../../../hooks/useSettings";
import { EditIcon } from "lucide-react";

const EditorSection = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const { markdown, editorEnabled, fontSize, fontFamily, view } = useSelector(
    (state) => state.markdown
  );
  const { settings } = useSettings();
  return (
    <div
      style={{
        fontSize: settings.fontSize,
        fontFamily: settings.fontFamily,
      }}
      className={`w-full ${
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
          <EditorTools editorRef={textareaRef} isDarkTheme={isDarkTheme} />
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
                className={`w-full h-full custom-scrollbar resize-none p-4 rounded-md focus:outline-none ${
                  isDarkTheme
                    ? "bg-gray-800 placeholder-gray-500"
                    : "bg-white placeholder-gray-400"
                }`}
                placeholder="Type your markdown here..."
                spellCheck="false"
              />
            </div>
            <StatusBar type="markdown" />
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
    </div>
  );
};

export default EditorSection;
