const TemplateSelector = ({ isDarkTheme, loadTemplate }) => {
  return (
    <div className="px-5 lg:flex md:px-9">
      <h3
        className={`text-lg ${isDarkTheme ? "text-gray-300" : "text-gray-500"}`}
      >
        Templates:
      </h3>

      <ul className="flex mt-2 lg:mt-0 lg:ml-4 space-x-4 items-center text-sm lg:text-base">
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
            Todo List
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
  );
};

export default TemplateSelector;
