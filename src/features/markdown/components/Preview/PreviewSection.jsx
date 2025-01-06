//src/features/markdown/components/Preview/PreviewSection.jsx
import React from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import PreviewControls from "./PreviewControls";
import PreviewHeader from "./PreviewHeader";

const PreviewSection = ({ isDarkTheme }) => {
  const {
    markdown,
    fontSize,
    fontFamily,
    isPreviewFullScreen,
    isEditorFullScreen,
    activeTab,
  } = useSelector((state) => state.markdown);

  return (
    <div
      className={`preview-section w-full ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100 text-gray-800"
      } rounded-md shadow-md p-4 ${
        isPreviewFullScreen ? "h-[85vh] lg:h-[80vh] lg:w-full" : "lg:w-1/2"
      } ${isEditorFullScreen ? "hidden" : "block"} ${
        activeTab === "preview"
          ? "block h-[50vh] md:h-[80vh]"
          : "hidden md:block"
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <PreviewHeader />
        <PreviewControls isDarkTheme={isDarkTheme} />
      </div>

      <div
        style={{
          fontSize: fontSize,
          fontFamily: fontFamily,
        }}
        className={`markdown-preview prose ${
          isDarkTheme ? "prose-invert" : ""
        } w-full ${isPreviewFullScreen ? "lg:h-[70vh]" : "lg:h-[70vh]"} p-4 ${
          isDarkTheme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
        } ${
          activeTab === "preview" ? "h-[39.5vh]" : ""
        } rounded-md overflow-y-auto`}
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
    </div>
  );
};

export default PreviewSection;
