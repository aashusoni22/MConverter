import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFontSize, setFontFamily } from "../../slices/markdownSlice";

const FontControls = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const { fontSize, fontFamily } = useSelector((state) => state.markdown);

  return (
    <>
      <select
        value={fontSize}
        onChange={(e) => dispatch(setFontSize(e.target.value))}
        className={`p-2 rounded-lg ${
          isDarkTheme
            ? "bg-gray-800 text-gray-200"
            : "bg-gray-200         text-gray-800"
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
        onChange={(e) => dispatch(setFontFamily(e.target.value))}
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
    </>
  );
};

export default FontControls;
