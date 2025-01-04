import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const SearchNav = ({ searchQuery, markdown, textareaRef }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  const [currentMatch, setCurrentMatch] = useState(0);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (searchQuery && markdown) {
      const regex = new RegExp(searchQuery, "gi");
      const found = [...markdown.matchAll(regex)];
      setMatches(found);
      setCurrentMatch(0);
    } else {
      setMatches([]);
      setCurrentMatch(0);
    }
  }, [searchQuery, markdown]);

  const navigateMatch = (direction) => {
    if (matches.length === 0 || !textareaRef.current) return;

    const newMatch =
      direction === "up"
        ? (currentMatch - 1 + matches.length) % matches.length
        : (currentMatch + 1) % matches.length;

    const matchIndex = matches[newMatch].index;
    const matchLength = searchQuery.length;

    // Highlight current match
    const text = textareaRef.current.value;
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(matchIndex, matchIndex + matchLength);

    // Scroll to match
    const lineHeight = parseInt(
      getComputedStyle(textareaRef.current).lineHeight
    );
    const lines = text.substr(0, matchIndex).split("\n").length - 1;
    textareaRef.current.scrollTop = lines * lineHeight;

    setCurrentMatch(newMatch);
  };

  return searchQuery ? (
    <div className="flex items-center gap-2 absolute right-5 top-1 mr-1">
      <span className="text-sm text-gray-400">
        {matches.length > 0 ? `${currentMatch + 1}/${matches.length}` : "0"}
      </span>
      <div className="flex flex-col -space-y-1">
        <button
          onClick={() => navigateMatch("up")}
          disabled={matches.length === 0}
          className={`${
            isDarkTheme
              ? "text-gray-500 hover:text-gray-300"
              : "text-gray-500 hover:text-gray-700"
          } rounded duration-300 transition-colors`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={() => navigateMatch("down")}
          disabled={matches.length === 0}
          className={`${
            isDarkTheme
              ? "text-gray-500 hover:text-gray-300"
              : "text-gray-500 hover:text-gray-700"
          } rounded duration-300 transition-colors mr-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchNav;
