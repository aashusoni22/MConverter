import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSettings,
  setFontSize,
  setFontFamily,
} from "../../slices/markdownSlice";
import { Settings, X } from "lucide-react";

const SettingsPanel = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const { isSettingsOpen, fontSize, fontFamily } = useSelector(
    (state) => state.markdown
  );

  const fontSizes = ["14px", "16px", "18px", "20px"];
  const fontFamilies = ["Arial", "Times New Roman", "Courier New", "Georgia"];

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => dispatch(toggleSettings())}
      />
      <div
        className={`absolute right-0 top-0 h-full w-80 p-6 transform transition-transform duration-300 ease-in-out ${
          isDarkTheme ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-semibold ${
              isDarkTheme ? "text-white" : "text-gray-900"
            }`}
          >
            Settings
          </h2>
          <button
            onClick={() => dispatch(toggleSettings())}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label
              className={`block mb-2 font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Font Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fontSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => dispatch(setFontSize(size))}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    fontSize === size
                      ? "bg-blue-500 text-white"
                      : isDarkTheme
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              className={`block mb-2 font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Font Family
            </label>
            <div className="space-y-2">
              {fontFamilies.map((font) => (
                <button
                  key={font}
                  onClick={() => dispatch(setFontFamily(font))}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    fontFamily === font
                      ? "bg-blue-500 text-white"
                      : isDarkTheme
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: font }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
