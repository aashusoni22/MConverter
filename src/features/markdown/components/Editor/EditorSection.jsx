import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMarkdown, setEditorEnabled } from "../../slices/markdownSlice";
import EditorControls from "./EditorControls";
import EditorHeader from "./EditorHeader";
import MarkdownUpload from "./MarkdownUpload";

const EditorSection = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const overlayRef = useRef(null);
  const {
    markdown,
    editorEnabled,
    fontSize,
    fontFamily,
    isEditorFullScreen,
    activeTab,
    isPreviewFullScreen,
    searchQuery,
  } = useSelector((state) => state.markdown);

  const handleMarkdownChange = (event) => {
    dispatch(setMarkdown(event.target.value));
  };

  // Sync overlay scroll with textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    const overlay = overlayRef.current;

    if (!textarea || !overlay) return;

    const handleScroll = () => {
      overlay.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener("scroll", handleScroll);
    return () => textarea.removeEventListener("scroll", handleScroll);
  }, []);

  // Create highlighted HTML content
  const getHighlightedContent = () => {
    if (!searchQuery) return markdown;

    try {
      const escapedSearchQuery = searchQuery.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const parts = markdown.split(new RegExp(`(${escapedSearchQuery})`, "gi"));
      return parts
        .map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase()
            ? `<mark class="bg-yellow-200 dark:bg-yellow-800">${part}</mark>`
            : part
        )
        .join("");
    } catch (error) {
      console.error("Regex error:", error);
      return markdown;
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
          ? "block h-[50vh] md:h-[80vh]"
          : "hidden md:block"
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <EditorHeader />
        <EditorControls textareaRef={textareaRef} isDarkTheme={isDarkTheme} />
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
        <div className="relative">
          <textarea
            ref={textareaRef}
            style={{
              fontSize: fontSize,
              fontFamily: fontFamily,
              color: "transparent",
              caretColor: isDarkTheme ? "#e5e7eb" : "#1f2937",
              background: "transparent",
              position: "absolute",
              top: 0,
              left: 0,
              margin: 0,
              border: 0,
              padding: "1rem",
              resize: "none",
              zIndex: 2,
            }}
            className={`w-full h-[39vh] md:h-[70vh] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === "editor" ? "h-[49vh]" : ""
            } `}
            placeholder="Type your markdown here..."
            value={markdown}
            onChange={handleMarkdownChange}
          />
          <div
            ref={overlayRef}
            style={{
              fontSize: fontSize,
              fontFamily: fontFamily,
              padding: "1rem",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              color: isDarkTheme ? "#e5e7eb" : "#1f2937",
              position: "relative",
              pointerEvents: "none",
              minHeight: "100%",
            }}
            className={`w-full h-[39vh] md:h-[70vh] overflow-auto ${
              isDarkTheme ? "bg-gray-800" : "bg-white"
            } rounded-md`}
            dangerouslySetInnerHTML={{ __html: getHighlightedContent() }}
          />
        </div>
      )}
    </div>
  );
};

export default EditorSection;
