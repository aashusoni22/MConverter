import React, { useState, useContext } from "react";
import {
  BookOpen,
  Code,
  TextQuote,
  Image,
  Table,
  X,
  Link,
  List,
  CheckSquare,
  Quote,
  Heading,
  Bold,
  Film,
  FileDown,
  Braces,
} from "lucide-react";
import { ThemeContext } from "../../../context/ThemeContext";

const GuidesModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("basics");
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  const guides = {
    basics: [
      {
        title: "Headers",
        content:
          "Use # symbols for headers:\n# Main Title (H1)\n## Section Title (H2)\n### Subsection (H3)\n#### Minor Section (H4)",
        icon: Heading,
      },
      {
        title: "Text Formatting",
        content:
          "Bold: **bold text** or __bold text__\nItalic: *italic text* or _italic text_\nBold & Italic: ***combined***\nStrikethrough: ~~deleted text~~",
        icon: Bold,
      },
      {
        title: "Lists",
        content:
          "Unordered list:\n* Item 1\n* Item 2\n  * Nested item\n\nOrdered list:\n1. First item\n2. Second item\n   1. Nested item",
        icon: List,
      },
      {
        title: "Links",
        content:
          'Basic link: [Link text](URL)\nLink with title: [Link text](URL "Title")\nReference link: [Link text][ref]\n[ref]: URL',
        icon: Link,
      },
    ],
    code: [
      {
        title: "Code Blocks",
        content:
          "Fenced code blocks:\n```javascript\nfunction hello() {\n  console.log('Hello world!');\n}\n```\nOr indent with 4 spaces",
        icon: Code,
      },
      {
        title: "Inline Code",
        content:
          "Use `backticks` for inline code\nExample: The `const` keyword declares a constant.",
        icon: Braces,
      },
      {
        title: "Syntax Highlighting",
        content:
          "```python\ndef greet(name):\n    return f'Hello, {name}!'\n```\n\n```css\n.className {\n    color: blue;\n}```",
        icon: Code,
      },
    ],
    advanced: [
      {
        title: "Tables",
        content:
          "| Header 1 | Header 2 | Header 3 |\n|----------|-----------|----------|\n| Row 1-1  | Row 1-2   | Row 1-3  |\n| Row 2-1  | Row 2-2   | Row 2-3  |",
        icon: Table,
      },
      {
        title: "Task Lists",
        content:
          "- [x] Completed task\n- [ ] Incomplete task\n- [x] Task with **formatting**\n  - [ ] Nested task",
        icon: CheckSquare,
      },
      {
        title: "Blockquotes",
        content:
          "> Single line quote\n\n> Multi-line quote\n> Continued line\n>> Nested quote",
        icon: Quote,
      },
    ],
    media: [
      {
        title: "Images",
        content:
          "Basic image:\n![Alt text](image.jpg)\n\nLinked image:\n[![Alt text](image.jpg)](https://link.com)",
        icon: Image,
      },
      {
        title: "Videos",
        content:
          "Videos aren't directly supported in Markdown, but you can:\n1. Use linked thumbnails:\n[![Video](thumbnail.jpg)](https://video-url.com)\n\n2. Or embed with HTML:\n<video src='video.mp4' controls></video>",
        icon: Film,
      },
      {
        title: "File Downloads",
        content:
          "Create download links:\n[Download PDF](./document.pdf)\n[Download ZIP](./archive.zip 'Click to download')",
        icon: FileDown,
      },
    ],
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
            <BookOpen
              className={`w-5 h-5 ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              } `}
            />
            <h2
              className={`text-lg font-semibold ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Markdown Guides
            </h2>
          </div>
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

        {/* Tabs */}
        <div className="p-6 pb-4">
          <div
            className={`flex space-x-2 border-b ${
              isDarkTheme ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {Object.keys(guides).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize transition-colors  ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : isDarkTheme
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 overflow-y-auto h-[calc(80vh-12rem)] custom-scrollbar">
          <div className="grid gap-4">
            {guides[activeTab].map((guide, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border
                  ${
                    isDarkTheme
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <guide.icon className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">{guide.title}</h3>
                </div>
                <pre
                  className={`p-3 rounded-md text-sm whitespace-pre-wrap font-mono
                  ${
                    isDarkTheme
                      ? "bg-gray-950 text-gray-200"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {guide.content}
                </pre>
              </div>
            ))}
          </div>
        </div>
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

export default GuidesModal;
