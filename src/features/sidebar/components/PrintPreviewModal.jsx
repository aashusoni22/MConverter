import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Printer, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const PrintPreviewModal = ({
  isOpen,
  onClose,
  markdown,
  fontSize,
  fontFamily,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center print:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-4xl h-[80vh] rounded-lg shadow-xl overflow-hidden
        ${
          isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b
          ${isDarkTheme ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-2">
            <Printer
              className={`w-5 h-5 ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              } `}
            />
            <h2
              className={`text-lg font-semibold ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Print Preview
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Print
            </button>
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
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(80vh-5rem)] custom-scrollbar">
          <div
            style={{ fontSize, fontFamily }}
            className={`markdown-preview prose ${
              isDarkTheme ? "prose-invert" : ""
            } max-w-none  ${
              isDarkTheme ? "bg-gray-800" : "bg-gray-100"
            } p-6 rounded-lg`}
          >
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
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .markdown-preview,
          .markdown-preview * {
            visibility: visible;
          }
          .markdown-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2rem !important;
          }
          .print-hide {
            display: none !important;
          }
        }
      `}</style>
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

export default PrintPreviewModal;
