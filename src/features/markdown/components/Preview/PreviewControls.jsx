import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCopied,
  setDownloaded,
  togglePreviewFullScreen,
} from "../../slices/markdownSlice";
import CopyButton from "../shared/CopyButton";
import DownloadButton from "../shared/DownloadButton";
import FullScreenButton from "../shared/FullScreenButton";

const PreviewControls = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const { markdown, isPreviewFullScreen, copied, downloaded } = useSelector(
    (state) => state.markdown
  );

  const handleCopy = async () => {
    if (markdown.length > 0) {
      await navigator.clipboard.writeText(markdown);
      dispatch(setCopied(true));
      setTimeout(() => dispatch(setCopied(false)), 3000);
    }
  };

  const handleDownload = () => {
    if (markdown.length > 0) {
      const blob = new Blob([markdown], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "markdown.md";
      link.click();
      dispatch(setDownloaded(true));
      setTimeout(() => dispatch(setDownloaded(false)), 3000);
    }
  };

  return (
    <div className="flex space-x-2 preview-controls">
      <CopyButton
        onCopy={handleCopy}
        copied={copied}
        disabled={markdown.length < 1}
        isDarkTheme={isDarkTheme}
      />
      <DownloadButton
        onDownload={handleDownload}
        downloaded={downloaded}
        disabled={markdown.length < 1}
        isDarkTheme={isDarkTheme}
      />
      <FullScreenButton
        isFullScreen={isPreviewFullScreen}
        toggleFullScreen={() => dispatch(togglePreviewFullScreen())}
        isDarkTheme={isDarkTheme}
      />
    </div>
  );
};

export default PreviewControls;
