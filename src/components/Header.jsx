import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header
      className={`px-4 md:px-9 py-4 flex justify-between items-center ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-800"
      } transition-colors duration-300 sticky top-0 z-50`}
    >
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 md:w-7 md:h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">
          MConverter
        </h1>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg"
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              isMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            }
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-black bg-opacity-50 z-40">
          <div
            className={`p-4 ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            }`}
          >
            <button
              className={`w-full mb-3 py-2 px-4 rounded-lg ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => {
                toggleModal();
                setIsMenuOpen(false);
              }}
            >
              Markdown Guide
            </button>
            <button
              onClick={toggleTheme}
              className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-600"
              }`}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
              <span className="ml-2">
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-5">
        <button
          className={`${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
          } py-2 px-4 rounded-lg`}
          onClick={toggleModal}
        >
          Markdown Guide
        </button>

        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-lg transition-all duration-200 ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
          }`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Modal (unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`w-11/12 max-w-lg rounded-lg shadow-lg p-6 ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Markdown Syntax Guide</h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>

            <ul className="list-disc ml-5 space-y-2">
              <li>
                **Bold**: <code>**text**</code> → <b>text</b>
              </li>
              <li>
                _Italic_: <code>_text_</code> → <i>text</i>
              </li>
              <li>
                Headers: <code># Header</code>, <code>## Subheader</code>
              </li>
              <li>
                Links: <code>[title](url)</code> → <a href="#">Example</a>
              </li>
              <li>
                Lists:
                <ul className="list-disc ml-5">
                  <li>
                    Unordered: <code>- Item</code>
                  </li>
                  <li>
                    Ordered: <code>1. Item</code>
                  </li>
                </ul>
              </li>
              <li>
                Images: <code>![alt text](url)</code>
              </li>
              <li>
                Code: <code>`inline code`</code>, <code>```code block```</code>
              </li>
              <li>
                Strikethrough: <code>~~strikethrough text~~</code>
              </li>
              <li>
                Horizontal Rule: <code>---</code>
              </li>
              <li>
                Blockquote: <code>&gt; blockquote text</code>
              </li>
              <li className="text-blue-500 underline list-none">
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              </li>
            </ul>

            <div className="flex justify-end mt-4">
              <button
                onClick={toggleModal}
                className={`${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-800 text-gray-200"
                } hover:bg-gray-600 px-4 py-2 rounded-md`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
