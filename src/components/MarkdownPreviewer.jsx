import React, { useContext, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import templates from "../data/templates.json";
import { jsPDF } from "jspdf";
import SearchNav from "./SearchNav";
import MarkdownUpload from "./MarkdownUpload";

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false);
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [template, setTemplate] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [editorEnabled, setEditorEnabled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { theme } = useContext(ThemeContext);
  const textareaRef = useRef(null);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const copyMarkdown = () => {
    if (markdown.length > 0) {
      navigator.clipboard.writeText(markdown);
      toast.success("Markdown Copied");
      setCopied((prev) => !prev);
      setTimeout(() => setCopied((prev) => !prev), 3000);
    }
  };

  const downloadMarkdown = () => {
    if (markdown.length > 0) {
      const blob = new Blob([markdown], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "markdown.md";
      link.click();
      toast.success("Markdown File Downloaded");
      setDownloaded((prev) => !prev);
      setTimeout(() => setDownloaded((prev) => !prev), 3000);
    }
  };

  const toggleEditorFullScreen = () => {
    setIsEditorFullScreen((prev) => !prev);
    if (isPreviewFullScreen) {
      setIsPreviewFullScreen(false);
    }
  };
  const togglePreviewFullScreen = () => {
    setIsPreviewFullScreen((prev) => !prev);
    if (isEditorFullScreen) {
      setIsEditorFullScreen(false);
    }
  };

  const loadTemplate = (templateType) => {
    const template = templates[templateType];
    setMarkdown(template.content);
    setTemplate(template.content);
    setEditorEnabled(true);
  };

  const toggleSearchBar = () => {
    setIsSearchBarOpen((prev) => !prev);
    if (isSearchBarOpen) {
      setSearchQuery("");
    }
  };

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Replace this with your upload logic, e.g., Firebase or Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset"); // For Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        // Construct Markdown syntax and insert it into the editor
        const fileUrl = data.secure_url;
        const markdownSyntax = `![${file.name}](${fileUrl})`; // For images
        setMarkdown((prevMarkdown) => `${prevMarkdown}\n${markdownSyntax}`);
        toast.success("File uploaded and added to editor!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload file. Please try again.");
    }
  };

  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      } text-gray-200 transition-colors duration-300`}
    >
      <Toaster position="top-center" />

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex rounded-lg overflow-hidden mx-4 mt-4 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("editor")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === "editor"
              ? theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
              : theme === "dark"
              ? "bg-gray-900 text-gray-400"
              : "bg-gray-50 text-gray-500"
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === "preview"
              ? theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
              : theme === "dark"
              ? "bg-gray-900 text-gray-400"
              : "bg-gray-50 text-gray-500"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch px-4 md:px-8 py-7 gap-6">
        {/* Editor Section */}
        <div
          className={`w-full ${
            isDarkTheme ? "bg-gray-900" : "bg-gray-100 text-gray-800"
          } rounded-md shadow-md p-4  ${
            isEditorFullScreen ? "h-[80vh] md:w-full" : "lg:w-1/2"
          } ${isPreviewFullScreen ? "hidden" : "block"} ${
            activeTab === "editor"
              ? "block h-[60vh] md:h-[80vh]"
              : "hidden md:block"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <h2 className="text-lg font-semibold">Editor</h2>
            </span>

            <div className="flex items-center space-x-2">
              {/* Search Bar */}
              {isSearchBarOpen ? (
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className={`pl-4 pr-[4.8rem] py-[6px] text-[15px] rounded-lg focus:outline-none w-[12rem] md:w-72 ${
                      isDarkTheme
                        ? "bg-gray-800 text-gray-100"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  />
                  <SearchNav
                    searchQuery={searchQuery}
                    markdown={markdown}
                    textareaRef={textareaRef}
                  />
                  <button
                    onClick={toggleSearchBar}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    ✖
                  </button>
                </div>
              ) : (
                <button
                  onClick={toggleSearchBar}
                  className={`p-2 rounded-lg ${
                    isDarkTheme
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 md:w-[24px] md:h-[23px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m2.1-6.6a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"
                    />
                  </svg>
                </button>
              )}

              {/* Upload Button */}
              <button
                onClick={() => document.getElementById("fileInput").click()}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkTheme
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
                aria-label="Upload Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-[24px] h-[23px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Settings Button for Mobile */}
              <button
                onClick={toggleSettings}
                className={`p-2 rounded-lg md:hidden ${
                  isDarkTheme
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>

              {/* Desktop Controls */}
              <div className="hidden md:flex items-center space-x-2">
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className={`p-2 rounded-lg ${
                    isDarkTheme
                      ? "bg-gray-800 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                </select>

                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className={`p-2 rounded-lg ${
                    isDarkTheme
                      ? "bg-gray-800 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier">Courier</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Tahoma">Tahoma</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Chakra">Chakra</option>
                </select>

                <button
                  onClick={toggleEditorFullScreen}
                  className={`p-2 rounded-lg ${
                    isDarkTheme
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {isEditorFullScreen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Settings Menu */}
          {isSettingsOpen && (
            <div
              className={`absolute right-8 top-52 z-50 w-48 md:hidden rounded-lg shadow-lg ${
                isDarkTheme ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="p-3 space-y-3">
                <div>
                  <label className="block text-sm mb-1">Font Size</label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className={`w-full p-2 rounded-lg ${
                      isDarkTheme
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">Font Family</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className={`w-full p-2 rounded-lg ${
                      isDarkTheme
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier">Courier</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Chakra">Chakra</option>
                  </select>
                </div>
              </div>
            </div>
          )}

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
                isDarkTheme
                  ? "bg-gray-800 text-gray-300"
                  : "bg-white text-gray-800"
              } ${
                activeTab === "editor" ? "h-[49vh]" : ""
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  resize-none`}
              placeholder="Type your markdown here..."
              value={markdown}
              onChange={handleMarkdownChange}
            />
          )}
        </div>

        {/* Preview Section */}
        <div
          className={`w-full ${
            isDarkTheme ? "bg-gray-900" : "bg-gray-100 text-gray-800"
          } rounded-md shadow-md p-4  ${
            isPreviewFullScreen ? "h-[85vh] lg:h-[80vh] lg:w-full" : "lg:w-1/2"
          } ${isEditorFullScreen ? "hidden" : "block"} ${
            activeTab === "preview"
              ? "block h-[60vh] md:h-[80vh]"
              : "hidden md:block"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            {/*Section heading*/}
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>

              <h2 className="text-lg font-semibold">Preview</h2>
            </span>

            {/*Buttons*/}
            <div className="flex space-x-4">
              {/*Copy Button*/}
              <button
                onClick={copyMarkdown}
                className={`p-2 rounded-md ${
                  isDarkTheme
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-200"
                } transition text-yellow-400 ${
                  markdown.length < 1 ? "opacity-50" : "opacity-100"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center ${
                    copied ? "animate-none" : ""
                  }`}
                >
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className={`size-5 transition-transform duration-300 ease-out ${
                        copied ? "scale-150 opacity-100" : "scale-100 opacity-0"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="size-5 text-yellow-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                  )}
                </div>
              </button>

              {/*Download Button*/}
              <button
                onClick={downloadMarkdown}
                className={`p-2 rounded-md ${
                  isDarkTheme
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white  hover:bg-gray-200"
                } transition text-green-400 ${
                  markdown.length < 1 ? "opacity-50" : "opacity-100"
                }`}
              >
                {downloaded ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    className={`size-5 transition-transform duration-300 ease-out ${
                      downloaded
                        ? "scale-150 opacity-100"
                        : "scale-100 opacity-0"
                    }`}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                )}
              </button>

              {/*Full Screen Button*/}
              <button
                onClick={togglePreviewFullScreen}
                className={`p-2 rounded-md ${
                  isDarkTheme
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                } transition hidden lg:block`}
              >
                {!isPreviewFullScreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/*Preview Container*/}
          <div
            style={{
              fontSize: fontSize,
              fontFamily: fontFamily,
            }}
            className={`prose ${isDarkTheme ? "prose-invert" : ""} w-full ${
              isPreviewFullScreen ? "lg:h-[70vh]" : "lg:h-[70vh]"
            } p-4 ${
              isDarkTheme
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-800"
            } ${
              activeTab === "preview" ? "h-[49vh]" : ""
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
      </div>

      {/*Templates*/}
      <div className="px-5 lg:flex md:px-9">
        <h3
          className={`text-lg ${
            isDarkTheme ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Templates:
        </h3>

        <ul className="flex mt-2 lg:mt-0 lg:ml-4 space-x-4 items-center text-sm lg:text-base ">
          <li>
            <button
              onClick={() => loadTemplate("blogPost")}
              className="text-teal-300 hover:text-teal-400 underline"
            >
              Blog Post
            </button>
          </li>
          <li>
            <button
              onClick={() => loadTemplate("resume")}
              className="text-rose-300 hover:text-rose-400 underline"
            >
              Resume
            </button>
          </li>
          <li>
            <button
              onClick={() => loadTemplate("todoList")}
              className="text-sky-300 hover:text-sky-400 underline"
            >
              To-Do List
            </button>
          </li>
          <li>
            <button
              onClick={() => loadTemplate("githubProfile")}
              className="text-gray-300 hover:text-gray-400 underline"
            >
              GitHub Profile
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
