import React from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import PreviewControls from "./PreviewControls";
import PreviewHeader from "./PreviewHeader";
import StatusBar from "../shared/StatusBar";
import { useSettings } from "../../../../hooks/useSettings";
import { Eye } from "lucide-react";

const PreviewSection = ({ isDarkTheme }) => {
  const {
    markdown,
    fontSize,
    fontFamily,
    isPreviewFullScreen,
    isEditorFullScreen,
    activeTab,
    view,
  } = useSelector((state) => state.markdown);
  const { settings } = useSettings();

  return (
    <div
      className={`preview-section w-full ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100 text-gray-800"
      } rounded-md shadow-md p-4 ${
        view === "preview"
          ? "w-full h-[79.2vh]"
          : view === "split"
          ? "lg:w-1/2 h-[79vh]"
          : "hidden"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="flex items-center space-x-2">
          <Eye
            className={`${
              isDarkTheme ? "text-gray-400" : "text-gray-500"
            } w-5 h-5`}
          />
          <h2
            className={`${
              isDarkTheme ? "text-white" : "text-gray-700"
            } text-lg font-semibold`}
          >
            Preview
          </h2>
        </span>
        <PreviewControls isDarkTheme={isDarkTheme} />
      </div>

      <div
        style={{
          fontSize: settings.fontSize,
          fontFamily: settings.fontFamily,
        }}
        className={`markdown-preview prose ${
          isDarkTheme ? "prose-invert" : ""
        } w-full ${
          isPreviewFullScreen ? "lg:h-[66.9vh]" : "lg:h-[66.9vh]"
        } p-4 ${
          isDarkTheme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
        } ${
          activeTab === "preview" ? "h-[39.5vh]" : ""
        } rounded-t-md overflow-y-auto custom-scrollbar`}
      >
        {markdown ? (
          <ReactMarkdown
            children={markdown}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialLight}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          />
        ) : (
          <p className="text-gray-400 italic">
            Your rendered markdown preview will appear here...
          </p>
        )}
      </div>
      <StatusBar type="html" />
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

export default PreviewSection;
