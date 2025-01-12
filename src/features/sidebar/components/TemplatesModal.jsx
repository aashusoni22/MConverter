import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setMarkdown,
  setEditorEnabled,
} from "../../markdown/slices/markdownSlice";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import {
  X,
  FileText,
  BookOpen,
  FileCheck,
  PenTool,
  Github,
  ScrollText,
  Library,
  MessagesSquare,
  FileCode,
  Boxes,
  Book,
  Briefcase,
} from "lucide-react";
import templates from "../../../data/templates.json";

const TEMPLATE_METADATA = {
  resume: {
    icon: FileCheck,
    category: "professional",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description:
      "Professional resume with sections for experience, skills, and education",
  },
  coverLetter: {
    icon: ScrollText,
    category: "professional",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    description: "Professional cover letter template for job applications",
  },
  blogPost: {
    icon: FileText,
    category: "personal",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    description: "Well-structured template for writing blog articles",
  },
  notes: {
    icon: Book,
    category: "personal",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    description: "Organized template for taking study notes",
  },
  projectPlan: {
    icon: PenTool,
    category: "personal",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
    description: "Template for planning and tracking project progress",
  },
  meetingNotes: {
    icon: MessagesSquare,
    category: "personal",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    description: "Template for effective meeting documentation",
  },
  readme: {
    icon: FileCode,
    category: "documentation",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    description: "Professional README template for your projects",
  },
  api: {
    icon: Boxes,
    category: "documentation",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    description: "Document your API endpoints and usage",
  },
  changelog: {
    icon: Library,
    category: "documentation",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
    description: "Track version changes and updates",
  },
  documentation: {
    icon: BookOpen,
    category: "documentation",
    color: "text-fuchsia-400",
    bgColor: "bg-fuchsia-400/10",
    description: "Comprehensive technical documentation template",
  },
  githubProfile: {
    icon: Github,
    category: "professional",
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    description: "Create an impressive GitHub profile README",
  },
};

const TemplatesModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (!isOpen) return null;

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "professional", label: "Professional" },
    { id: "personal", label: "Personal" },
    { id: "documentation", label: "Documentation" },
  ];

  // Convert templates from JSON into array with metadata
  const templateArray = Object.entries(templates).map(([id, template]) => ({
    id,
    title: template.title,
    content: template.content,
    ...TEMPLATE_METADATA[id],
  }));

  const filteredTemplates =
    selectedCategory === "all"
      ? templateArray
      : templateArray.filter(
          (template) => template.category === selectedCategory
        );

  const handleTemplateSelect = (template) => {
    dispatch(setMarkdown(template.content));
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
            <FileText
              className={`w-5 h-5 ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <h2
              className={`text-lg font-semibold ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Choose a Template
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
            isDarkTheme ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex gap-2">
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

        {/* Templates Grid */}
        <div
          className={`p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto ${
            isDarkTheme ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {filteredTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className={`group flex flex-col text-left p-4 rounded-xl
                  ${template.bgColor}
                  hover:scale-[1.02] transition-all duration-200`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-5 h-5 ${template.color}`} />
                  <h3 className={`text-base font-medium ${template.color}`}>
                    {template.title}
                  </h3>
                </div>
                <p
                  className={`text-sm ${
                    isDarkTheme ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {template.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplatesModal;
