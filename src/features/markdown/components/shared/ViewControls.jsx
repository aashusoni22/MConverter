import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PanelLeft, PanelRight, Columns } from "lucide-react";
import { setView } from "../../slices/markdownSlice";

const ViewControls = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.markdown);

  const views = [
    { id: "editor", icon: PanelLeft, label: "Editor Only" },
    { id: "split", icon: Columns, label: "Split View" },
    { id: "preview", icon: PanelRight, label: "Preview Only" },
  ];

  const handleViewChange = (viewId) => {
    dispatch(setView(viewId));
  };

  return (
    <div
      className={`hidden lg:flex items-center gap-2 mb-4 p-2 rounded-lg
      ${isDarkTheme ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {views.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleViewChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
            ${
              view === id
                ? isDarkTheme
                  ? "bg-blue-500 text-white"
                  : "bg-blue-500 text-white"
                : isDarkTheme
                ? "text-gray-400 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          title={label}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewControls;
