const PreviewControls = ({
  isDarkTheme,
  markdown,
  copyMarkdown,
  downloadMarkdown,
  togglePreviewFullScreen,
  isPreviewFullScreen,
  copied,
  downloaded,
}) => {
  return (
    <div className="flex space-x-4">
      {/* <CopyButton
        isDarkTheme={isDarkTheme}
        markdown={markdown}
        copyMarkdown={copyMarkdown}
        copied={copied}
      />

      <DownloadButton
        isDarkTheme={isDarkTheme}
        markdown={markdown}
        downloadMarkdown={downloadMarkdown}
        downloaded={downloaded}
      />

      <FullScreenButton
        isDarkTheme={isDarkTheme}
        togglePreviewFullScreen={togglePreviewFullScreen}
        isPreviewFullScreen={isPreviewFullScreen}
      /> */}
    </div>
  );
};

export default PreviewControls;
