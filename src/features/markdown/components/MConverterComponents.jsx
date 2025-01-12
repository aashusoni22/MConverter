import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../../../context/ThemeContext";
import { Toaster } from "react-hot-toast";
import TemplatesSection from "../../templates/components/TemplatesSection";
import EditorSection from "./Editor/EditorSection";
import PreviewSection from "./Preview/PreviewSection";
import MobileTabs from "./MobileTabs";
import TemplatesModal from "../../sidebar/components/TemplatesModal";

const MConverterComponents = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  return (
    <div
      className={`${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      } text-gray-200 transition-colors duration-300 min-h-[90vh]`}
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
      <TemplatesSection
        isDarkTheme={isDarkTheme}
        onOpenTemplatesModal={() => setShowTemplatesModal(true)}
      />
      <TemplatesModal
        isOpen={showTemplatesModal}
        onClose={() => setShowTemplatesModal(false)}
      />

      <div className="flex flex-col lg:flex-row justify-between items-stretch px-5 md:px-6 py-2 gap-6">
        <EditorSection isDarkTheme={isDarkTheme} />
        <PreviewSection isDarkTheme={isDarkTheme} />
      </div>
    </div>
  );
};

export default MConverterComponents;
