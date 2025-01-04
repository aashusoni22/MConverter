import MarkdownUpload from "../MarkdownUpload";
import EditorHeader from "./EditorHeader";
import MobileSettings from "./MobileSettings";

const EditorSection = ({
  isDarkTheme,
  isEditorFullScreen,
  isPreviewFullScreen,
  activeTab,
  editorEnabled,
  textareaRef,
  fontSize,
  fontFamily,
  markdown,
  handleMarkdownChange,
  setMarkdown,
  setEditorEnabled,
  ...props
}) => {
  return (
    <div
      className={`w-full ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100 text-gray-800"
      } rounded-md shadow-md p-4  ${
        isEditorFullScreen ? "h-[80vh] md:w-full" : "lg:w-1/2"
      } ${isPreviewFullScreen ? "hidden" : "block"} ${
        activeTab === "editor"
          ? "block h-[65vh] md:h-[80vh]"
          : "hidden md:block"
      }`}
    >
      <EditorHeader {...props} isDarkTheme={isDarkTheme} />
      <MobileSettings {...props} isDarkTheme={isDarkTheme} />

      {!editorEnabled ? (
        <MarkdownUpload
          onMarkdownLoad={(content) => {
            setMarkdown(content);
            setEditorEnabled(true);
          }}
          onStartWriting={() => setEditorEnabled(true)}
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
            activeTab === "editor" ? "h-[55vh]" : ""
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
