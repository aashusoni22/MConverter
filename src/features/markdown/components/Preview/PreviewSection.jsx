import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import PreviewTools from "./PreviewTools";
import { useSettings } from "../../../../hooks/useSettings";
import { Eye } from "lucide-react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const PreviewSection = ({ isDarkTheme }) => {
  const { markdown, activeTab, view } = useSelector((state) => state.markdown);
  const { settings } = useSettings();
  const renderedContent = useMemo(() => markdown, [markdown]);

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
        <PreviewTools isDarkTheme={isDarkTheme} />
      </div>

      <div
        style={{
          fontSize: settings.fontSize,
          fontFamily: settings.fontFamily,
        }}
        className={`markdown-preview prose ${
          isDarkTheme ? "prose-invert" : ""
        } w-full h-[70vh] p-4 ${
          isDarkTheme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
        } ${
          activeTab === "preview" ? "h-[39.5vh]" : ""
        } rounded-md overflow-y-auto custom-scrollbar`}
      >
        {markdown ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "";

                if (!inline && language) {
                  return (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={language}
                      PreTag="div"
                      customStyle={{
                        margin: "1.5em 0",
                        borderRadius: "0.375rem",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {renderedContent}
          </ReactMarkdown>
        ) : (
          <p className="text-gray-400 italic">
            Your rendered markdown preview will appear here...
          </p>
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

export default PreviewSection;
