import React, { useContext } from "react";
import {
  X,
  Monitor,
  Sun,
  Moon,
  Layout,
  PanelLeft,
  PanelRight,
  Cog,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useSettings } from "../../../hooks/useSettings";
import { ThemeContext } from "../../../context/ThemeContext";
import { setView } from "../../markdown/slices/markdownSlice";

const SettingsModal = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const { settings, updateSetting } = useSettings();
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.markdown);

  // Handle theme preference changes
  const handleThemeChange = (value) => {
    updateSetting("themePreference", value);
    if (value === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    } else {
      setTheme(value);
    }
  };

  // Handle view changes
  const handleViewChange = (newView) => {
    updateSetting("defaultView", newView);
    dispatch(setView(newView));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-md rounded-xl shadow-xl p-6 ${
          isDarkTheme ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Cog
              className={`w-5 h-5 ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              } `}
            />
            <h2
              className={`text-lg font-semibold ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${
              isDarkTheme
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkTheme ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Theme
            </label>
            <div className="flex gap-2">
              {[
                { value: "system", icon: Monitor, label: "System" },
                { value: "light", icon: Sun, label: "Light" },
                { value: "dark", icon: Moon, label: "Dark" },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => handleThemeChange(value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg capitalize
                    ${
                      settings.themePreference === value
                        ? "bg-blue-500 text-white"
                        : isDarkTheme
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkTheme ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Font Size
            </label>
            <select
              value={settings.fontSize}
              onChange={(e) => updateSetting("fontSize", e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${
                isDarkTheme
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {["12px", "14px", "16px", "18px"].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Font Family */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkTheme ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Font Family
            </label>
            <select
              value={settings.fontFamily}
              onChange={(e) => updateSetting("fontFamily", e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${
                isDarkTheme
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-200"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {[
                { value: "inter", label: "Inter" },
                { value: "arial", label: "Arial" },
                { value: "georgia", label: "Georgia" },
              ].map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Default View */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkTheme ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Default View
            </label>
            <div className="flex gap-2">
              {[
                { id: "editor", icon: PanelLeft, label: "Editor" },
                { id: "split", icon: Layout, label: "Split" },
                { id: "preview", icon: PanelRight, label: "Preview" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => handleViewChange(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg
                    ${
                      settings.defaultView === id
                        ? "bg-blue-500 text-white"
                        : isDarkTheme
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
