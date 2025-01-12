import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, toggleSearchBar } from "../../slices/markdownSlice";

const EditorSearch = ({ textareaRef, isDarkTheme }) => {
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const { searchQuery, isSearchBarOpen, markdown } = useSelector(
    (state) => state.markdown
  );

  const [matches, setMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [searchInProgress, setSearchInProgress] = useState(false);

  // Find all matches when search query changes
  useEffect(() => {
    if (!searchQuery || !markdown) {
      setMatches([]);
      return;
    }

    try {
      const regex = new RegExp(searchQuery, "gi");
      const foundMatches = [];
      let match;

      while ((match = regex.exec(markdown)) !== null) {
        foundMatches.push({
          start: match.index,
          end: match.index + match[0].length,
        });
      }

      setMatches(foundMatches);
      setCurrentMatchIndex(0);

      if (foundMatches.length > 0) {
        highlightMatch(foundMatches[0]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setMatches([]);
    }
  }, [searchQuery, markdown]);

  // Keep focus on search input
  useEffect(() => {
    if (isSearchBarOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchBarOpen]);

  const highlightMatch = (match) => {
    if (!textareaRef.current || !match || searchInProgress) return;

    const textarea = textareaRef.current;

    // Calculate the line number of the match
    const textBeforeMatch = markdown.substring(0, match.start);
    const lines = textBeforeMatch.split("\n");
    const lineNumber = lines.length;

    // Calculate scroll position
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const scrollPosition = (lineNumber - 1) * lineHeight;

    // Update scroll position without focusing the textarea
    textarea.scrollTop = scrollPosition;

    // Select the text in the textarea without focusing it
    requestAnimationFrame(() => {
      textarea.setSelectionRange(match.start, match.end);
      searchInputRef.current?.focus();
    });
  };

  const navigateMatches = (direction) => {
    if (matches.length === 0) return;

    setSearchInProgress(true);
    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentMatchIndex + 1) % matches.length;
    } else {
      nextIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
    }

    setCurrentMatchIndex(nextIndex);
    highlightMatch(matches[nextIndex]);

    // Ensure search input keeps focus
    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
      setSearchInProgress(false);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.shiftKey) {
        navigateMatches("prev");
      } else {
        navigateMatches("next");
      }
    }
  };

  return (
    <div className="relative">
      {isSearchBarOpen ? (
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className={`pl-4 pr-24 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[16rem] ${
                isDarkTheme
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gray-100 text-gray-800"
              }`}
              autoFocus
            />
            {matches.length > 0 && (
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {`${currentMatchIndex + 1}/${matches.length}`}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => navigateMatches("prev")}
                    className="p-1 rounded hover:bg-gray-700/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigateMatches("next")}
                    className="p-1 rounded hover:bg-gray-700/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                dispatch(toggleSearchBar());
                dispatch(setSearchQuery(""));
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => dispatch(toggleSearchBar())}
          className={`p-[7.5px] rounded-lg transition-colors ${
            isDarkTheme
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default EditorSearch;
