import PreviewHeader from "./PreviewHeader";

const PreviewSection = ({
  isDarkTheme,
  isPreviewFullScreen,
  isEditorFullScreen,
  activeTab,
  fontSize,
  fontFamily,
  markdown,
  ...props
}) => {
  return (
    <div
      className={`w-full ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100 text-gray-800"
      } rounded-md shadow-md p-4  ${
        isPreviewFullScreen ? "h-[85vh] lg:h-[80vh] lg:w-full" : "lg:w-1/2"
      } ${isEditorFullScreen ? "hidden" : "block"} ${
        activeTab === "preview"
          ? "block h-[65vh] md:h-[80vh]"
          : "hidden md:block"
      }`}
    >
      <PreviewHeader {...props} isDarkTheme={isDarkTheme} />

      <div
        style={{
          fontSize: fontSize,
          fontFamily: fontFamily,
        }}
        className={`prose ${isDarkTheme ? "prose-invert" : ""} w-full ${
          isPreviewFullScreen ? "lg:h-[70vh]" : "lg:h-[70vh]"
        } p-4 ${
          isDarkTheme ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
        } ${
          activeTab === "preview" ? "h-[55vh]" : ""
        } rounded-md overflow-y-auto`}
      >
        {markdown ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(markdown)),
            }}
          />
        ) : (
          <p className="text-gray-400 italic">
            Your rendered markdown preview will appear here...
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewSection;
