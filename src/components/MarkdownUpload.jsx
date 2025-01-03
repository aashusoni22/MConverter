import React, { useRef } from "react";

const MarkdownUpload = ({ onMarkdownLoad, onStartWriting }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      onMarkdownLoad(text);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[45vh] md:h-[70vh] gap-6 p-8 border-2 border-dashed rounded-lg border-gray-600">
      <div className="flex flex-col items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-12 h-12 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
        <h3 className="md:text-xl font-semibold">Choose how to start</h3>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onStartWriting}
          className="px-2 py-2 md:px-4 md:py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Write Markdown
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-2 py-2 md:px-4 md:py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300"
        >
          Upload File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.txt"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MarkdownUpload;
