import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { useSelector } from "react-redux";

const SearchCount = ({ searchQuery, textareaRef }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const markdown = useSelector((state) => state.markdown.markdown);

  const [currentMatch, setCurrentMatch] = useState(0);
  const [matches, setMatches] = useState([]);
  const [textPositions, setTextPositions] = useState([]);

  useEffect(() => {
    if (searchQuery && markdown) {
      try {
        const regex = new RegExp(searchQuery, "gi");
        const found = [];
        const positions = [];

        // Find all matches and their line positions
        let match;
        while ((match = regex.exec(markdown)) !== null) {
          found.push(match);

          // Calculate the line number and column for this match
          const textBeforeMatch = markdown.substring(0, match.index);
          const lineNumber = textBeforeMatch.split("\n").length - 1;
          const lastNewLine = textBeforeMatch.lastIndexOf("\n");
          const column = match.index - (lastNewLine + 1);

          positions.push({ line: lineNumber, column, index: match.index });
        }

        setMatches(found);
        setTextPositions(positions);

        // Reset to first match when search query changes
        setCurrentMatch(0);

        // Scroll to first match if exists
        if (positions.length > 0) {
          scrollToPosition(positions[0]);
        }
      } catch (error) {
        console.error("Search regex error:", error);
        setMatches([]);
        setTextPositions([]);
      }
    } else {
      setMatches([]);
      setTextPositions([]);
      setCurrentMatch(0);
    }
  }, [searchQuery, markdown]);

  const scrollToPosition = (position) => {
    if (!textareaRef.current) return;

    const lineHeight = parseInt(
      getComputedStyle(textareaRef.current).lineHeight
    );
    const padding = parseInt(getComputedStyle(textareaRef.current).paddingTop);

    // Calculate scroll position based on line number and padding
    const scrollPosition = position.line * lineHeight - padding;

    // Smooth scroll to the position
    textareaRef.current.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });

    // Highlight the text by selecting it
    textareaRef.current.setSelectionRange(
      position.index,
      position.index + searchQuery.length
    );
  };

  const navigateMatch = (direction) => {
    if (matches.length === 0) return;

    const newMatch =
      direction === "up"
        ? (currentMatch - 1 + matches.length) % matches.length
        : (currentMatch + 1) % matches.length;

    scrollToPosition(textPositions[newMatch]);
    setCurrentMatch(newMatch);
  };

  if (!searchQuery) return null;

  return (
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
            className="w-4 h-4"
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
            className="w-4 h-4"
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
  );
};

export default SearchCount;
