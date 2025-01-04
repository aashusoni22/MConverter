import React, { useContext, useState } from "react";
import Header from "./components/Header";
import MarkdownPreviewer from "./components/MarkdownPreviewer";
import { ThemeContext } from "./context/ThemeContext";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`font-chakra min-h-screen ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } transition-colors duration-300 overflow-y-hidden`}
    >
      <Header />
      <MarkdownPreviewer />
    </div>
  );
};

export default App;
