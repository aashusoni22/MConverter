const FontControls = ({
  isDarkTheme,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  toggleEditorFullScreen,
  isEditorFullScreen,
}) => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <select
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        className={`p-2 rounded-lg ${
          isDarkTheme
            ? "bg-gray-800 text-gray-200"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
      </select>

      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
        className={`p-2 rounded-lg ${
          isDarkTheme
            ? "bg-gray-800 text-gray-200"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <option value="Arial">Arial</option>
        <option value="Courier">Courier</option>
        <option value="Georgia">Georgia</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Verdana">Verdana</option>
        <option value="Chakra">Chakra</option>
      </select>

      <button
        onClick={toggleEditorFullScreen}
        className={`p-2 rounded-lg ${
          isDarkTheme
            ? "bg-gray-800 hover:bg-gray-700"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {isEditorFullScreen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default FontControls;
