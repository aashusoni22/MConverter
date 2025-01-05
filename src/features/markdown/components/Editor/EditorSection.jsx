import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMarkdown, setEditorEnabled } from "../../slices/markdownSlice";
import EditorControls from "./EditorControls";
import EditorHeader from "./EditorHeader";
import MarkdownUpload from "../../../templates/components/MarkdownUpload";

const EditorSection = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const {
    markdown,
    editorEnabled,
    fontSize,
    fontFamily,
    isEditorFullScreen,
    activeTab,
    isPreviewFullScreen,
  } = useSelector((state) => state.markdown);

  const handleMarkdownChange = (event) => {
    dispatch(setMarkdown(event.target.value));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Replace this with your upload logic
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        const fileUrl = data.secure_url;
        const markdownSyntax = `![${file.name}](${fileUrl})`;
        dispatch(
          setMarkdown((prevMarkdown) => `${prevMarkdown}\n${markdownSyntax}`)
        );
        toast.success("File uploaded and added to editor!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload file. Please try again.");
    }
  };

  return (
    <div
      className={`editor-section w-full ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100 text-gray-800"
      } rounded-md shadow-md p-4 ${
        isEditorFullScreen ? "h-[80vh] md:w-full" : "lg:w-1/2"
      } ${isPreviewFullScreen ? "hidden" : "block"} ${
        activeTab === "editor"
          ? "block h-[60vh] md:h-[80vh]"
          : "hidden md:block"
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <EditorHeader />
        <EditorControls
          textareaRef={textareaRef}
          isDarkTheme={isDarkTheme}
          onImageUpload={handleImageUpload}
        />
      </div>

      {!editorEnabled ? (
        <MarkdownUpload
          onMarkdownLoad={(content) => {
            dispatch(setMarkdown(content));
            dispatch(setEditorEnabled(true));
          }}
          onStartWriting={() => dispatch(setEditorEnabled(true))}
        />
      ) : (
        <textarea
          ref={textareaRef}
          style={{
            fontSize: fontSize,
            fontFamily: fontFamily,
          }}
          className={`w-full ${
            isEditorFullScreen ? "lg:h-[70vh]" : "lg:h-[70vh]"
          } p-4 ${
            isDarkTheme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
          } ${
            activeTab === "editor" ? "h-[49vh]" : ""
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
          placeholder="Type your markdown here..."
          value={markdown}
          onChange={handleMarkdownChange}
        />
      )}
    </div>
  );
};

export default EditorSection;
