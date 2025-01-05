import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, toggleSearchBar } from "../../slices/markdownSlice";
import SearchCount from "./SearchCount";

const EditorSearch = ({ textareaRef, isDarkTheme }) => {
  const dispatch = useDispatch();
  const { searchQuery, isSearchBarOpen } = useSelector(
    (state) => state.markdown
  );

  return isSearchBarOpen ? (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search..."
        className={`pl-4 pr-[4.8rem] py-[6px] text-[15px] rounded-lg focus:outline-none w-[12rem] md:w-72 ${
          isDarkTheme
            ? "bg-gray-800 text-gray-100"
            : "bg-gray-200 text-gray-800"
        }`}
      />
      <SearchCount searchQuery={searchQuery} textareaRef={textareaRef} />
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
