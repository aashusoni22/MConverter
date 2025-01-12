import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bold,
  Italic,
  Code,
  Link,
  List,
  ListOrdered,
  Heading1,
  Quote,
  Strikethrough,
  Table,
  ImagePlus,
  Search,
  ChevronUp,
  ChevronDown,
  X,
  Upload,
  Loader,
  Undo2,
  Redo2,
} from "lucide-react";
import {
  setMarkdown,
  insertText,
  setSearchQuery,
  toggleSearchBar,
  setUploading,
  setUploadError,
} from "../../slices/markdownSlice";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const EditorTools = ({ editorRef, isDarkTheme }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);

  const { searchQuery, isSearchBarOpen, markdown, isUploading } = useSelector(
    (state) => state.markdown
  );

  const [matches, setMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [searchInProgress, setSearchInProgress] = useState(false);

  // History states for undo/redo
  const [undoStack, setUndoStack] = useState([""]);
  const [redoStack, setRedoStack] = useState([]);
  const isUndoRedoAction = useRef(false);

  // Track markdown changes for undo/redo
  useEffect(() => {
    if (
      !isUndoRedoAction.current &&
      markdown !== undoStack[undoStack.length - 1]
    ) {
      setUndoStack((prev) => [...prev, markdown]);
      setRedoStack([]);
    }
    isUndoRedoAction.current = false;
  }, [markdown]);

  const handleUndo = () => {
    if (undoStack.length > 1) {
      // Keep at least one state in undo stack
      const currentState = undoStack[undoStack.length - 1];
      const newState = undoStack[undoStack.length - 2];

      isUndoRedoAction.current = true;
      setUndoStack((prev) => prev.slice(0, -1));
      setRedoStack((prev) => [...prev, currentState]);
      dispatch(setMarkdown(newState));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const newState = redoStack[redoStack.length - 1];

      isUndoRedoAction.current = true;
      setRedoStack((prev) => prev.slice(0, -1));
      setUndoStack((prev) => [...prev, newState]);
      dispatch(setMarkdown(newState));
    }
  };

  // Search functionality
  useEffect(() => {
    if (!searchQuery || !markdown) {
      setMatches([]);
      return;
    }

    try {
      const regex = new RegExp(searchQuery, "gi");
      const foundMatches = [];
      let match;

      while ((match = regex.exec(markdown)) !== null) {
        foundMatches.push({
          start: match.index,
          end: match.index + match[0].length,
        });
      }

      setMatches(foundMatches);
      setCurrentMatchIndex(0);

      if (foundMatches.length > 0) {
        highlightMatch(foundMatches[0]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setMatches([]);
    }
  }, [searchQuery, markdown]);

  const highlightMatch = (match) => {
    if (!editorRef.current || !match || searchInProgress) return;

    const textarea = editorRef.current;
    const textBeforeMatch = markdown.substring(0, match.start);
    const lines = textBeforeMatch.split("\n");
    const lineNumber = lines.length;
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const scrollPosition = (lineNumber - 1) * lineHeight;

    textarea.scrollTop = scrollPosition;
    requestAnimationFrame(() => {
      textarea.setSelectionRange(match.start, match.end);
      searchInputRef.current?.focus();
    });
  };

  const navigateMatches = (direction) => {
    if (matches.length === 0) return;

    setSearchInProgress(true);
    const nextIndex =
      direction === "next"
        ? (currentMatchIndex + 1) % matches.length
        : (currentMatchIndex - 1 + matches.length) % matches.length;

    setCurrentMatchIndex(nextIndex);
    highlightMatch(matches[nextIndex]);

    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
      setSearchInProgress(false);
    });
  };

  // Markdown formatting
  const handleMarkdownAction = (type) => {
    if (!editorRef.current) return;

    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const selectedText = editorRef.current.value.substring(start, end);

    // Find the actual text boundaries within the selection
    const trimmedText = selectedText.trim();
    const startTrim = selectedText.indexOf(trimmedText);
    const endTrim = startTrim + trimmedText.length;

    // Calculate the actual positions in the text
    const actualStart = start + startTrim;
    const actualEnd = start + endTrim;

    // Get the surrounding whitespace from the selection
    const leadingSpace = selectedText.substring(0, startTrim);
    const trailingSpace = selectedText.substring(endTrim);

    let insertContent = "";
    let newCursorPos = actualStart;

    switch (type) {
      case "bold":
        insertContent = trimmedText
          ? `${leadingSpace}**${trimmedText}**${trailingSpace}`
          : "**bold text**";
        newCursorPos = trimmedText ? actualEnd + 4 : actualStart + 2;
        break;
      case "italic":
        insertContent = trimmedText
          ? `${leadingSpace}_${trimmedText}_${trailingSpace}`
          : "_italic text_";
        newCursorPos = trimmedText ? actualEnd + 2 : actualStart + 1;
        break;
      case "code":
        insertContent = trimmedText
          ? `${leadingSpace}\`${trimmedText}\`${trailingSpace}`
          : "`code`";
        newCursorPos = trimmedText ? actualEnd + 2 : actualStart + 1;
        break;
      case "link":
        insertContent = trimmedText
          ? `${leadingSpace}[${trimmedText}](url)${trailingSpace}`
          : "[link text](url)";
        newCursorPos = trimmedText ? actualEnd + 3 : actualStart + 1;
        break;
      case "list":
        insertContent = trimmedText ? `\n- ${trimmedText}` : "\n- list item";
        break;
      case "numbered-list":
        insertContent = trimmedText
          ? `\n1. ${trimmedText}`
          : "\n1. numbered item";
        break;
      case "heading":
        insertContent = trimmedText ? `\n# ${trimmedText}` : "\n# Heading";
        break;
      case "quote":
        insertContent = trimmedText ? `\n> ${trimmedText}` : "\n> quote";
        break;
      case "strikethrough":
        insertContent = trimmedText
          ? `${leadingSpace}~~${trimmedText}~~${trailingSpace}`
          : "~~strikethrough text~~";
        newCursorPos = trimmedText ? actualEnd + 4 : actualStart + 2;
        break;
      case "table":
        insertContent =
          "\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n";
        break;
    }

    dispatch(
      insertText({
        position: start,
        text: insertContent,
        replaceLength: selectedText.length,
      })
    );

    setTimeout(() => {
      editorRef.current.focus();
      editorRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // File upload handling
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editorRef.current) return;

    try {
      dispatch(setUploading(true));
      dispatch(setUploadError(null));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "markdown-editor");

      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      const imageMarkdown = `![${file.name}](${data.secure_url})\n`;
      const cursorPosition = editorRef.current.selectionStart;

      dispatch(
        insertText({
          position: cursorPosition,
          text: imageMarkdown,
        })
      );

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
      e.target.value = "";
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!editorRef.current) return;

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            handleMarkdownAction("bold");
            break;
          case "i":
            e.preventDefault();
            handleMarkdownAction("italic");
            break;
          case "k":
            e.preventDefault();
            handleMarkdownAction("link");
            break;
          case "`":
            e.preventDefault();
            handleMarkdownAction("code");
            break;
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case "y":
            e.preventDefault();
            handleRedo();
            break;
          default:
            break;
        }
      }
    };

    // Add event listener to the textarea
    const textarea = editorRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [editorRef, undoStack, redoStack]);

  const buttonClass = `p-2 rounded-lg transition-all duration-200 ${
    isDarkTheme
      ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
  }  ${markdown.length < 1 ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className="flex flex-col space-y-2 toolbar-section">
      <div className="flex items-center space-x-2 flex-wrap gap-y-2">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleMarkdownAction("bold")}
            className={buttonClass}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </button>

          <button
            onClick={() => handleMarkdownAction("italic")}
            className={buttonClass}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </button>

          <button
            onClick={() => handleMarkdownAction("code")}
            className={buttonClass}
            title="Code (Ctrl+`)"
          >
            <Code size={18} />
          </button>

          <button
            onClick={() => handleMarkdownAction("strikethrough")}
            className={buttonClass}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>

          <div className="h-6 w-px bg-gray-400 mx-1" />

          <button
            onClick={() => handleMarkdownAction("link")}
            className={buttonClass}
            title="Link (Ctrl+K)"
          >
            <Link size={18} />
          </button>

          <button
            onClick={() => handleMarkdownAction("list")}
            className={buttonClass}
            title="Bullet List"
          >
            <List size={18} />
          </button>

          <button
            onClick={() => handleMarkdownAction("numbered-list")}
            className={buttonClass}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>

          <button
            onClick={() => handleMarkdownAction("heading")}
            className={buttonClass}
            title="Heading"
          >
            <Heading1 size={18} />
          </button>

          <button
            onClick={() => handleMarkdownAction("quote")}
            className={buttonClass}
            title="Quote"
          >
            <Quote size={18} />
          </button>

          <button
            onClick={() => handleMarkdownAction("table")}
            className={buttonClass}
            title="Insert Table"
          >
            <Table size={18} />
          </button>

          <div className="h-6 w-px bg-gray-400 mx-1" />

          {/* Undo/Redo */}
          <button
            onClick={handleUndo}
            disabled={undoStack.length <= 1}
            className={`${buttonClass} ${
              undoStack.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={18} />
          </button>

          <button
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className={`${buttonClass} ${
              redoStack.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
          >
            <Redo2 size={18} />
          </button>

          <div className="h-6 w-px bg-gray-400 mx-1" />

          {/* Search */}
          {isSearchBarOpen ? (
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (e.shiftKey) navigateMatches("prev");
                    else navigateMatches("next");
                  }
                }}
                placeholder="Search..."
                className={`pl-4 pr-24 py-[0.45rem] text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-[15rem] ${
                  isDarkTheme
                    ? "bg-gray-800 text-gray-100"
                    : "bg-gray-100 text-gray-800"
                }`}
                autoFocus
              />
              {matches.length > 0 && (
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {`${currentMatchIndex + 1}/${matches.length}`}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => navigateMatches("prev")}
                      className="p-1 rounded hover:bg-gray-700/20"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => navigateMatches("next")}
                      className="p-1 rounded hover:bg-gray-700/20"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  dispatch(toggleSearchBar());
                  dispatch(setSearchQuery(""));
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(toggleSearchBar())}
              className={buttonClass}
              title="Search (Ctrl+F)"
            >
              <Search size={18} />
            </button>
          )}

          {/* Upload */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`${buttonClass} ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Upload Image"
          >
            {isUploading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              <Upload size={18} />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorTools;
