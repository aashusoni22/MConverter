import React from "react";
import { useDispatch } from "react-redux";
import {
  setMarkdown,
  setEditorEnabled,
} from "../../markdown/slices/markdownSlice";
import { setSelectedTemplate } from "../slices/templateSlice";
import templates from "../../../data/templates.json";

const TemplatesSection = ({ isDarkTheme }) => {
  const dispatch = useDispatch();

  const loadTemplate = (templateType) => {
    const template = templates[templateType];
    dispatch(setMarkdown(template.content));
    dispatch(setSelectedTemplate(template.content));
    dispatch(setEditorEnabled(true));
  };

  return (
    <div className="px-5 py-6 lg:flex md:px-9 templates-section">
      <h3
        className={`md:text-lg ${
          isDarkTheme ? "text-gray-300" : "text-gray-500"
        }`}
      >
        Get Started:
      </h3>

      <ul className="flex mt-2 lg:mt-0 lg:ml-4 space-x-4 items-center text-sm lg:text-base">
        <li>
          <button
            onClick={() => loadTemplate("blogPost")}
            className="text-teal-400 hover:text-teal-400 underline"
          >
            Blog Post
          </button>
        </li>
        <li>
          <button
            onClick={() => loadTemplate("resume")}
            className="text-rose-400 hover:text-rose-400 underline"
          >
            Resume
          </button>
        </li>
        <li>
          <button
            onClick={() => loadTemplate("todoList")}
            className="text-sky-400 hover:text-sky-400 underline"
          >
            To-Do List
          </button>
        </li>
        <li>
          <button
            onClick={() => loadTemplate("githubProfile")}
            className="text-gray-400 hover:text-gray-400 underline"
          >
            GitHub Profile
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TemplatesSection;
