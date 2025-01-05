import React, { useRef } from "react";

const UploadButton = ({ onImageUpload, isDarkTheme }) => {
  const fileInputRef = useRef(null);

  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isDarkTheme
            ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
        }`}
        aria-label="Upload Image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-[24px] h-[23px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
      />
    </>
  );
};

export default UploadButton;
