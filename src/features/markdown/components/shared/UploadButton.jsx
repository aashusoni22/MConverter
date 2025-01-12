import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUploading,
  setUploadError,
  insertText,
} from "../../slices/markdownSlice";

// Your Cloudinary configuration
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const UploadButton = ({ editorRef, isDarkTheme }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.markdown.isUploading);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editorRef.current) return;

    try {
      dispatch(setUploading(true));
      dispatch(setUploadError(null));

      // Prepare form data for Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "markdown-editor"); // Optional: organize uploads in a folder

      // Upload to Cloudinary
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // Create markdown image syntax with Cloudinary URL
      const imageMarkdown = `![${file.name}](${data.secure_url})\n`;

      // Get cursor position
      const cursorPosition = editorRef.current.selectionStart;

      // Insert markdown at cursor position
      dispatch(
        insertText({
          position: cursorPosition,
          text: imageMarkdown,
        })
      );

      // Update cursor position
      setTimeout(() => {
        editorRef.current.focus();
        const newPosition = cursorPosition + imageMarkdown.length;
        editorRef.current.setSelectionRange(newPosition, newPosition);
      }, 0);
    } catch (error) {
      console.error("Upload failed:", error);
      dispatch(setUploadError(error.message));
    } finally {
      dispatch(setUploading(false));
      e.target.value = ""; // Reset file input
    }
  };

  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isDarkTheme
            ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
        } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Upload Image"
      >
        {isUploading ? (
          // Loading spinner
          <svg
            className="animate-spin w-[23px] h-[21px] md:w-[24px] md:h-[23px]"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          // Upload icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-[23px] h-[21px] md:w-[24px] md:h-[23px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </>
  );
};

export default UploadButton;
