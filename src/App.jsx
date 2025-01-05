import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import MarkdownPreviewer from "./features/markdown/components/MarkdownPreviewer";
import TourProvider from "./features/tour/components/TourProvider";
import WelcomeModal from "./features/tour/components/WelcomeModal";
import HelpButton from "./features/tour/components/HelpButton";
import Header from "./components/Header";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`font-chakra min-h-screen ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } transition-colors duration-300 overflow-y-hidden`}
    >
      <Header />
      <TourProvider theme={theme} />
      <WelcomeModal theme={theme} />
      <HelpButton theme={theme} />
      <MarkdownPreviewer />
    </div>
  );
};

export default App;
