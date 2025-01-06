import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { useMediaQuery } from "react-responsive";
import { Toaster } from "react-hot-toast";
import EditorSection from "./Editor/EditorSection";
import PreviewSection from "./Preview/PreviewSection";
import MobileTabs from "./MobileTabs";
import TemplatesSection from "../../templates/components/TemplatesSection";

const MConverterComponents = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      className={`${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      } text-gray-200 transition-colors duration-300`}
    >
      <Toaster
        position={isMobile ? "bottom-center" : "top-center"}
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === "dark" ? "#1F2937" : "#FFFFFF",
            color: theme === "dark" ? "#F3F4F6" : "#1F2937",
            fontSize: isMobile ? "14px" : "16px",
            padding: isMobile ? "8px 16px" : "16px 24px",
          },
        }}
      />

      <MobileTabs />
      <TemplatesSection isDarkTheme={isDarkTheme} />

      <div className="flex flex-col lg:flex-row justify-between items-stretch px-4 md:px-8 py-2 gap-6">
        <EditorSection isDarkTheme={isDarkTheme} />
        <PreviewSection isDarkTheme={isDarkTheme} />
      </div>
    </div>
  );
};

export default MConverterComponents;
