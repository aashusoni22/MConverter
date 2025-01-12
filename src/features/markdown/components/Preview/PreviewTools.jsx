import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCopied, setDownloaded } from "../../slices/markdownSlice";
import { Check, Copy, Download } from "lucide-react";
import toast from "react-hot-toast";

const PreviewTools = ({ isDarkTheme }) => {
  const dispatch = useDispatch();
  const { markdown, copied, downloaded } = useSelector(
    (state) => state.markdown
  );

  const handleCopy = async () => {
    if (markdown.length > 0) {
      await navigator.clipboard.writeText(markdown);
      dispatch(setCopied(true));
      setTimeout(() => dispatch(setCopied(false)), 3000);
      toast.success("Markdown Copied");
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

  const buttonClass = `p-2 rounded-lg transition-all duration-200 ${
    isDarkTheme
      ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
  } ${markdown.length < 1 ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className="flex space-x-2 preview-controls">
      <button
        onClick={handleCopy}
        disabled={markdown.length < 1}
        className={buttonClass}
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>

      <button
        onClick={handleDownload}
        disabled={markdown.length < 1}
        className={buttonClass}
      >
        <Download size={18} />
      </button>
    </div>
  );
};

export default PreviewTools;
