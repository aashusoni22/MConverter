import React from "react";
import toast from "react-hot-toast";

const DownloadButton = ({ onDownload, downloaded, disabled, isDarkTheme }) => {
  const handleClick = () => {
    onDownload();
    toast.success("Markdown File Downloaded");
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`p-2 rounded-md ${
        isDarkTheme
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-white hover:bg-gray-200"
      } transition text-green-400 ${disabled ? "opacity-50" : "opacity-100"}`}
    >
      {downloaded ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5 transition-transform duration-300 ease-out scale-150 opacity-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      )}
    </button>
  );
};

export default DownloadButton;
