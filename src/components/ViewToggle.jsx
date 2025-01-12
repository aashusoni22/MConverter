import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SplitSquareHorizontal, Maximize2, Edit3, Eye } from "lucide-react";
import { setView } from "../features/markdown/slices/markdownSlice";

const ViewToggle = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => ({
    view: state.markdown.view,
    theme: state.theme,
  }));

  const views = [
    {
      id: "editor",
      icon: Edit3,
      label: "Editor",
      tooltip: "Editor only",
    },
    {
      id: "split",
      icon: SplitSquareHorizontal,
      label: "Split",
      tooltip: "Split view",
    },
    {
      id: "preview",
      icon: Eye,
      label: "Preview",
      tooltip: "Preview only",
    },
  ];

  return (
    <div
      className={`flex items-center w-fit gap-2 p-1 rounded-lg ${
        isDarkTheme
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200 shadow-sm"
      }`}
    >
      {views.map(({ id, icon: Icon, label, tooltip }) => {
        const isActive = view === id;
        return (
          <button
            key={id}
            onClick={() => dispatch(setView(id))}
            className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 ${
              isActive
                ? isDarkTheme
                  ? "bg-gray-700 text-blue-400"
                  : "bg-blue-50 text-blue-600"
                : isDarkTheme
                ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
            aria-label={label}
          >
            <Icon size={18} />
            <span className="text-sm font-medium hidden sm:inline">
              {label}
            </span>

            {/* Tooltip for mobile */}
            <span
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity sm:hidden ${
                isDarkTheme
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-800 text-white"
              }`}
            >
              {tooltip}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ViewToggle;
