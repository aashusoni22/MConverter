import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const StatusBar = ({ type = "markdown" }) => {
  const { markdown } = useSelector((state) => state.markdown);
  const [stats, setStats] = useState({
    bytes: 0,
    words: 0,
    lines: 0,
    chars: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    if (!markdown) {
      setStats({ bytes: 0, words: 0, lines: 0, chars: 0, paragraphs: 0 });
      return;
    }

    let text = markdown;
    if (type === "html") {
      text = text
        .replace(/[#*_`~]/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/!\[(.*?)\]\(.*?\)/g, "$1")
        .trim();
    }

    const bytes = new TextEncoder().encode(text).length;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const lines = text.split("\n").length;
    const chars = text.length;
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((para) => para.trim().length > 0).length;

    setStats({ bytes, words, lines, chars, paragraphs });
  }, [markdown, type]);

  return (
    <div
      className={`flex items-center justify-between px-3 py-1 text-xs font-mono text-white rounded-b-md ${
        type === "markdown" ? "bg-sky-800" : "bg-teal-800"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="font-semibold">
          {type === "markdown" ? "Markdown" : "HTML"}
        </span>
        <span>{stats.bytes} bytes</span>
        <span>{stats.words} words</span>
        <span>{stats.lines} lines</span>
      </div>
      {type === "html" && (
        <div className="flex items-center gap-4">
          <span>{stats.chars} characters</span>
          <span>{stats.paragraphs} paragraphs</span>
        </div>
      )}
    </div>
  );
};

export default StatusBar;
