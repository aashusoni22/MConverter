import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  X,
  Code,
  Table,
  ListTree,
  Image,
  Quote,
  List,
  Eye,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  setMarkdown,
  setEditorEnabled,
} from "../../markdown/slices/markdownSlice";

const ExamplesModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (!isOpen) return null;

  const categories = [
    { id: "all", label: "All" },
    { id: "basic", label: "Basic Syntax" },
    { id: "advanced", label: "Advanced" },
    { id: "tables", label: "Tables" },
    { id: "media", label: "Media" },
  ];

  const examples = [
    {
      id: "basic-text",
      category: "basic",
      icon: List,
      title: "Basic Text Formatting",
      description: "Examples of headers, bold, italic, and lists",
      preview:
        "# Heading 1\n## Heading 2\n**Bold** and *Italic*\n- List item 1\n- List item 2",
      example: `# Heading 1
## Heading 2
### Heading 3

**Bold Text** and *Italic Text*
***Bold and Italic***

- Bullet point 1
- Bullet point 2
  - Nested bullet
  - Another nested bullet

1. Numbered item
2. Another numbered item
   1. Nested numbered item
   2. Another nested item

> This is a blockquote
> Multiple lines work too`,
    },
    {
      id: "code-blocks",
      category: "basic",
      icon: Code,
      title: "Code Blocks",
      description: "Different ways to format code in markdown",
      preview: '```javascript\nconst greeting = "Hello";\n```',
      example: `# Code Examples

Inline code: \`const x = 42;\`

\`\`\`javascript
// JavaScript code block
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

\`\`\`python
# Python code block
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
\`\`\`

\`\`\`css
/* CSS code block */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\``,
    },
    {
      id: "tables",
      category: "tables",
      icon: Table,
      title: "Tables",
      description: "Various table formats and alignments",
      preview:
        "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |",
      example: `# Table Examples

## Simple Table
| Name    | Age | Role    |
|---------|-----|---------|
| John    | 30  | Dev     |
| Alice   | 25  | Design  |
| Bob     | 35  | Manager |

## Aligned Table
| Left     | Center   | Right    |
|:---------|:--------:|----------:|
| Text     | Text     | Text     |
| Left     | Center   | Right    |

## Complex Table
| Feature | Basic | Pro | Enterprise |
|---------|:-----:|:---:|:----------:|
| Users   | 10    | 100 | Unlimited |
| Storage | 5GB   | 50GB| 500GB     |
| Support | Email | 24/7| Priority  |
| Price   | Free  | $10 | Custom    |`,
    },
    {
      id: "advanced-formatting",
      category: "advanced",
      icon: ListTree,
      title: "Advanced Formatting",
      description: "Task lists, footnotes, and special formatting",
      preview: "- [x] Completed task\n- [ ] Pending task",
      example: `# Advanced Markdown Features

## Task Lists
- [x] Completed task
- [ ] Pending task
- [x] Another completed task
  - [ ] Nested task
  - [x] Completed nested task

## Definition Lists
Term 1
: Definition 1

Term 2
: Definition 2

## Footnotes
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Abbreviations
*[HTML]: Hyper Text Markup Language
The HTML specification is maintained by W3C.

## Special Characters
Copyright: &copy;
Registered: &reg;
Trademark: &trade;`,
    },
    {
      id: "media",
      category: "media",
      icon: Image,
      title: "Media Elements",
      description: "Images, links, and badges",
      preview: "![Alt text](image.jpg)\n[Link](https://example.com)",
      example: `# Media in Markdown

## Images
![Alt text](https://via.placeholder.com/150)

## Links
[Regular link](https://example.com)
[Link with title](https://example.com "Website title")

## Images with Links
[![Alt text](https://via.placeholder.com/150)](https://example.com)

## Badges
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-stable-green)

## Videos (as links)
[![Video Title](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID)`,
    },
  ];

  const filteredExamples =
    selectedCategory === "all"
      ? examples
      : examples.filter((ex) => ex.category === selectedCategory);

  const handleExampleSelect = (example) => {
    dispatch(setMarkdown(example.example));
    dispatch(setEditorEnabled(true));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border ${
          isDarkTheme
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-8 py-6 border-b ${
            isDarkTheme ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Eye
              className={`w-5 h-5 ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <h2
              className={`text-lg font-semibold ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Markdown Examples
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkTheme
                ? "hover:bg-gray-800 text-gray-400 hover:text-gray-300"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div
          className={`px-8 py-4 border-b ${
            isDarkTheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white"
                    : isDarkTheme
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className={`p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto ${
            isDarkTheme ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {filteredExamples.map((example) => (
            <div
              key={example.id}
              className={`group relative rounded-xl p-6 cursor-pointer transition-all hover:scale-[1.02] ${
                isDarkTheme
                  ? "bg-gray-800 hover:bg-gray-750"
                  : "bg-white hover:bg-gray-50"
              } shadow-sm hover:shadow-md`}
              onClick={() => handleExampleSelect(example)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    isDarkTheme ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <example.icon
                    className={`w-6 h-6 ${
                      isDarkTheme ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-medium mb-2 ${
                      isDarkTheme ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {example.title}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      isDarkTheme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {example.description}
                  </p>
                  <div
                    className={`p-3 rounded-lg font-mono text-sm ${
                      isDarkTheme
                        ? "bg-gray-900 text-gray-300"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {example.preview}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamplesModal;
