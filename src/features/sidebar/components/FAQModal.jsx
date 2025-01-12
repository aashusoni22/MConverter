import React, { useState, useContext, useMemo } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  Search,
  X,
  PlusCircle,
  MinusCircle,
  MessageCircleQuestion,
} from "lucide-react";

const FAQModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const faqData = [
    {
      category: "Getting Started",
      items: [
        {
          question: "How do I start writing in Markdown?",
          answer:
            "Writing in Markdown is simple. The left panel is your editor where you write using Markdown syntax. The right panel shows you a live preview of how your content will look when formatted. Try typing # Hello World to create a heading!",
        },
        {
          question: "What are the basic formatting options?",
          answer:
            "Markdown offers several basic formatting options:\n• Use * or _ for italic text (*italic*)\n• Use ** or __ for bold text (**bold**)\n• Use # for headings (# Heading 1)\n• Use - or * for bullet points\n• Use numbers for ordered lists (1. First item)",
        },
      ],
    },
    {
      category: "Advanced Features",
      items: [
        {
          question: "How do I create tables in Markdown?",
          answer:
            "To create tables, use pipes (|) to separate columns and hyphens (-) to create headers:\n\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |",
        },
        {
          question: "Can I use custom styling?",
          answer:
            "Yes! You can customize:\n• Font size\n• Font family\n• Theme (Light/Dark)\n• Editor layout\n• Preview settings",
        },
      ],
    },
    {
      category: "Export & Sharing",
      items: [
        {
          question: "What export options are available?",
          answer:
            "You can export your content as:\n• Markdown (.md)\n• HTML file\n• Plain text (.txt)",
        },
        {
          question: "How do I share my documents?",
          answer:
            "You can share your work by:\n1. Exporting to your preferred format\n2. Using the built-in share feature\n3. Copying the content directly\n4. Saving to your local device",
        },
      ],
    },
  ];

  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Filter questions based on search
  const filteredFAQ = useMemo(() => {
    if (!searchQuery) return faqData;

    const query = searchQuery.toLowerCase();
    return faqData
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [faqData, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-3xl h-[85vh] rounded-md shadow-xl overflow-hidden
        ${isDarkTheme ? "bg-gray-900" : "bg-white"}`}
      >
        {/* Header with Search */}
        <div
          className={`p-8 border-b ${
            isDarkTheme ? "border-gray-800" : "border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <MessageCircleQuestion
                className={`w-5 h-5 ${
                  isDarkTheme ? "text-gray-400" : "text-gray-500"
                } `}
              />

              <h2
                className={`text-lg font-semibold ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}
              >
                Frequently Asked Questions
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

          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5
              ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}
            />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-md outline-none transition-colors
                ${
                  isDarkTheme
                    ? "bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-750"
                    : "bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-gray-100"
                }`}
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="overflow-y-auto h-[calc(85vh-8.5rem)] custom-scrollbar">
          {filteredFAQ.length === 0 ? (
            <div
              className={`text-center py-12 ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No matching questions found
            </div>
          ) : (
            <div className="p-6 space-y-8">
              {filteredFAQ.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDarkTheme ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {section.category}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => {
                      const isExpanded = expandedQuestions.includes(
                        `${sectionIndex}-${itemIndex}`
                      );
                      return (
                        <div
                          key={itemIndex}
                          className={`rounded-md transition-all duration-200
                            ${
                              isDarkTheme
                                ? isExpanded
                                  ? "bg-gray-800"
                                  : "bg-gray-800/50"
                                : isExpanded
                                ? "bg-gray-50"
                                : "bg-gray-50/50"
                            }`}
                        >
                          <button
                            onClick={() =>
                              toggleQuestion(`${sectionIndex}-${itemIndex}`)
                            }
                            className="w-full text-left p-4 flex items-center justify-between gap-4"
                          >
                            <span
                              className={`font-medium ${
                                isDarkTheme ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {item.question}
                            </span>
                            {isExpanded ? (
                              <MinusCircle
                                className={`w-5 h-5 flex-shrink-0 ${
                                  isDarkTheme
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              />
                            ) : (
                              <PlusCircle
                                className={`w-5 h-5 flex-shrink-0 ${
                                  isDarkTheme
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              />
                            )}
                          </button>
                          {isExpanded && (
                            <div
                              className={`px-4 pb-4 whitespace-pre-wrap
                              ${
                                isDarkTheme ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
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

export default FAQModal;
