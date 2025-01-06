// src/features/markdown/components/Editor/EditorSearch.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, toggleSearchBar } from "../../slices/markdownSlice";

const EditorSearch = ({ textareaRef, isDarkTheme }) => {
  const dispatch = useDispatch();
  const { searchQuery, isSearchBarOpen, markdown } = useSelector(
    (state) => state.markdown
  );
  const [currentMatch, setCurrentMatch] = React.useState(0);
  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    if (searchQuery && markdown) {
      const regex = new RegExp(searchQuery, "gi");
      const found = [...markdown.matchAll(regex)];
      setMatches(found);
      setCurrentMatch(0);

      if (found.length > 0) {
        scrollToMatch(found[0].index);
      }
    } else {
      setMatches([]);
      setCurrentMatch(0);
    }
  }, [searchQuery, markdown]);

  const scrollToMatch = (matchIndex) => {
    if (!textareaRef.current) return;

    const lineHeight = parseInt(
      getComputedStyle(textareaRef.current).lineHeight
    );
    const lines = markdown.substr(0, matchIndex).split("\n").length - 1;
    textareaRef.current.scrollTop = lines * lineHeight;
  };

  const navigateMatch = (direction) => {
    if (matches.length === 0) return;

    const newMatch =
      direction === "up"
        ? (currentMatch - 1 + matches.length) % matches.length
        : (currentMatch + 1) % matches.length;

    scrollToMatch(matches[newMatch].index);
    setCurrentMatch(newMatch);
  };

  const SearchCount = () =>
    searchQuery ? (
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

  return isSearchBarOpen ? (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search..."
        className={`pl-4 pr-[4.8rem] py-[6px] text-[15px] rounded-lg focus:outline-none w-[10rem] md:w-72 ${
          isDarkTheme
            ? "bg-gray-800 text-gray-100"
            : "bg-gray-200 text-gray-800"
        }`}
      />
      <SearchCount />
      <button
        onClick={() => dispatch(toggleSearchBar())}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        ✖
      </button>
    </div>
  ) : (
    <button
      onClick={() => dispatch(toggleSearchBar())}
      className={`p-2 rounded-lg ${
        isDarkTheme
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 md:w-[24px] md:h-[23px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m2.1-6.6a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"
        />
      </svg>
    </button>
  );
};

export default EditorSearch;
