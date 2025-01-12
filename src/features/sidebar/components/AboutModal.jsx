import React, { useContext } from "react";
import {
  X,
  Github,
  Linkedin,
  Globe,
  Mail,
  Feather,
  Stars,
  Heart,
  BookOpen,
} from "lucide-react";
import { ThemeContext } from "../../../context/ThemeContext";

const AboutModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  // You can customize these details
  const appInfo = {
    version: "1.0.0",
    lastUpdated: "January 2024",
    repository: "https://github.com/yourusername/your-repo",
    website: "https://yourwebsite.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    email: "your.email@example.com",
  };

  const features = [
    {
      icon: Feather,
      title: "Markdown Editor",
      description: "A powerful, real-time Markdown editor with instant preview",
    },
    {
      icon: Stars,
      title: "Feature Rich",
      description: "Supports GFM, code highlighting, tables, and more",
    },
    {
      icon: Heart,
      title: "User Friendly",
      description: "Intuitive interface with customizable themes and settings",
    },
    {
      icon: BookOpen,
      title: "Export Options",
      description: "Export to multiple formats including PDF, HTML, and more",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-3xl h-[85vh] rounded-xl shadow-xl overflow-hidden
        ${isDarkTheme ? "bg-gray-900" : "bg-white"}`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between
          ${isDarkTheme ? "border-gray-800" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-6 h-6 md:w-7 md:h-7 ${
                isDarkTheme ? "text-blue-400" : "text-gray-900"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
              />
            </svg>
            <h2
              className={`text-xl font-bold ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              About Markdown Editor
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

        {/* Content */}
        <div className="overflow-y-auto h-[calc(85vh-4rem)] custom-scrollbar">
          {/* Hero Section */}
          <div
            className={`px-6 py-8 text-center border-b
            ${isDarkTheme ? "border-gray-800" : "border-gray-200"}`}
          >
            <h1
              className={`text-3xl font-bold mb-4
              ${isDarkTheme ? "text-white" : "text-gray-900"}`}
            >
              Your Markdown Editor
            </h1>
            <p
              className={`text-lg max-w-2xl mx-auto
              ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}
            >
              A modern, feature-rich markdown editor designed for developers,
              writers, and anyone who loves clean, formatted content.
            </p>
          </div>

          {/* Features Grid */}
          <div className="px-6 py-8">
            <h3
              className={`text-xl font-semibold mb-6
              ${isDarkTheme ? "text-white" : "text-gray-900"}`}
            >
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl
                    ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}
                >
                  <feature.icon
                    className={`w-6 h-6 mb-3
                    ${isDarkTheme ? "text-blue-400" : "text-blue-500"}`}
                  />
                  <h4
                    className={`text-lg font-medium mb-2
                    ${isDarkTheme ? "text-white" : "text-gray-900"}`}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className={isDarkTheme ? "text-gray-300" : "text-gray-600"}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Info */}
          <div
            className={`px-6 py-8 border-t
            ${isDarkTheme ? "border-gray-800" : "border-gray-200"}`}
          >
            <h3
              className={`text-xl font-semibold mb-6
              ${isDarkTheme ? "text-white" : "text-gray-900"}`}
            >
              Connect With Me
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={appInfo.repository}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${
                    isDarkTheme
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href={appInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${
                    isDarkTheme
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={appInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${
                    isDarkTheme
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
              >
                <Globe className="w-5 h-5" />
                <span>Website</span>
              </a>
              <a
                href={`mailto:${appInfo.email}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${
                    isDarkTheme
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* App Info */}
          <div
            className={`px-6 py-4 text-sm border-t
            ${
              isDarkTheme
                ? "border-gray-800 text-gray-400"
                : "border-gray-200 text-gray-500"
            }`}
          >
            <p>Version {appInfo.version}</p>
            <p>Last updated: {appInfo.lastUpdated}</p>
          </div>
        </div>
      </div>{" "}
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

export default AboutModal;
