import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Github, Menu, X } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <header className="relative">
      {/* Main Header */}
      <div
        className={`
        px-4 md:px-3 py-3 
        ${isDark ? "bg-gray-900" : "bg-white"} 
        border-b ${isDark ? "border-gray-800" : "border-gray-200"}
        transition-all duration-300 sticky top-0 z-50
        backdrop-blur-md bg-opacity-80
      `}
      >
        <div className="mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div
              className={`
              p-2 rounded-xl
              ${isDark ? "bg-blue-500/10" : "bg-blue-500/10"}
              transition-colors duration-300
            `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke={isDark ? "#60A5FA" : "#3B82F6"}
                fill="none"
                className="w-6 h-6 md:w-7 md:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                />
              </svg>
            </div>
            <div>
              <h1
                className={`
                text-xl md:text-2xl font-bold tracking-tight
                ${isDark ? "text-gray-100" : "text-gray-700"}
              `}
              >
                MConverter
              </h1>
              <p
                className={`
                text-xs hidden md:block
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
              >
                Markdown Editor & Converter
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                p-2 rounded-lg flex items-center space-x-2
                ${
                  isDark
                    ? "hover:bg-gray-800 text-gray-300 hover:text-gray-100"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }
                transition-colors duration-200
              `}
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">Star on GitHub</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`
                p-2 rounded-lg flex items-center justify-center
                ${
                  isDark
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
                transition-all duration-200
              `}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`
          md:hidden fixed inset-0 top-[57px] z-40
          ${isDark ? "bg-gray-900" : "bg-white"}
          transition-all duration-300
        `}
        >
          <div className="p-4 space-y-3">
            {/* Mobile GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                w-full p-3 rounded-lg flex items-center space-x-3
                ${
                  isDark
                    ? "hover:bg-gray-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }
              `}
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">Star on GitHub</span>
            </a>

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className={`
                w-full p-3 rounded-lg flex items-center space-x-3
                ${
                  isDark
                    ? "hover:bg-gray-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }
              `}
            >
              {isDark ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span className="font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span className="font-medium">Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
