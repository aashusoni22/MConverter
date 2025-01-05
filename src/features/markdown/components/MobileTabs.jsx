import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../slices/markdownSlice";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const MobileTabs = () => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.markdown);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="mobile-tabs md:hidden flex rounded-lg overflow-hidden mx-4 mt-4 border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => dispatch(setActiveTab("editor"))}
        className={`flex-1 py-2 text-sm font-medium transition-colors ${
          activeTab === "editor"
            ? theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
            : theme === "dark"
            ? "bg-gray-900 text-gray-400"
            : "bg-gray-50 text-gray-500"
        }`}
      >
        Editor
      </button>
      <button
        onClick={() => dispatch(setActiveTab("preview"))}
        className={`flex-1 py-2 text-sm font-medium transition-colors ${
          activeTab === "preview"
            ? theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
            : theme === "dark"
            ? "bg-gray-900 text-gray-400"
            : "bg-gray-50 text-gray-500"
        }`}
      >
        Preview
      </button>
    </div>
  );
};

export default MobileTabs;
