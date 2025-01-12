import React from "react";
import { useDispatch } from "react-redux";
import {
  setMarkdown,
  setEditorEnabled,
} from "../../markdown/slices/markdownSlice";
import { setSelectedTemplate } from "../slices/templateSlice";
import templates from "../../../data/templates.json";
import { FileText, FileCode, Book, LayoutTemplate } from "lucide-react";

const TemplatesSection = ({ isDarkTheme, onOpenTemplatesModal }) => {
  const dispatch = useDispatch();

  const quickStartTemplates = [
    {
      id: "readme",
      label: "README",
      icon: FileCode,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      hoverBg: "hover:bg-blue-500/20",
    },
    {
      id: "blogPost",
      label: "Blog Post",
      icon: FileText,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      hoverBg: "hover:bg-emerald-500/20",
    },
    {
      id: "notes",
      label: "Notes",
      icon: Book,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      hoverBg: "hover:bg-amber-500/20",
    },
  ];

  const loadTemplate = (templateType) => {
    const template = templates[templateType];
    dispatch(setMarkdown(template.content));
    dispatch(setSelectedTemplate(template.content));
    dispatch(setEditorEnabled(true));
  };

  return (
    <div className="px-4 py-3">
      <div className="max-w-screen-2xl lg:ml-2 py-3">
        <div className="flex items-center gap-3">
          {/* Quick start templates */}
          <h3
            className={`text-sm font-medium ${
              isDarkTheme ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Quick Start Templates
          </h3>{" "}
          {quickStartTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => loadTemplate(template.id)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-md
                  ${template.bgColor}
                  ${template.hoverBg}
                  transition-all duration-200`}
              >
                <Icon className={`w-3.5 h-3.5 ${template.color}`} />
                <span className={`text-xs font-medium ${template.color}`}>
                  {template.label}
                </span>
              </button>
            );
          })}
          {/* More templates button */}
          <button
            onClick={onOpenTemplatesModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md
              ${
                isDarkTheme
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }
              transition-all duration-200`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">More templates</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesSection;
