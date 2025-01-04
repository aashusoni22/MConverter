const MobileSettings = ({
  isSettingsOpen,
  isDarkTheme,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
}) => {
  if (!isSettingsOpen) return null;

  return (
    <div
      className={`absolute right-8 top-52 z-50 w-48 md:hidden rounded-lg shadow-lg ${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="p-3 space-y-3">
        <div>
          <label className="block text-sm mb-1">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className={`w-full p-2 rounded-lg ${
              isDarkTheme
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Font Family</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className={`w-full p-2 rounded-lg ${
              isDarkTheme
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <option value="Arial">Arial</option>
            <option value="Courier">Courier</option>
            <option value="Georgia">Georgia</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Verdana">Verdana</option>
            <option value="Chakra">Chakra</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MobileSettings;
