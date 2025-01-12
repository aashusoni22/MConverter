import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../../../context/ThemeContext";
import { Toaster } from "react-hot-toast";
import TemplatesSection from "../../templates/components/TemplatesSection";
import EditorSection from "./Editor/EditorSection";
import PreviewSection from "./Preview/PreviewSection";
import MobileTabs from "./MobileTabs";
import TemplatesModal from "../../sidebar/components/TemplatesModal";
import ViewToggle from "../../../components/ViewToggle";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import { fetchUserDocuments } from "../slices/documentsSlice";

const MConverterComponents = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserDocuments(user.uid));
    }
  }, [dispatch, user]);

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
      <div className="flex items-center justify-between mx-6">
        <TemplatesSection
          isDarkTheme={isDarkTheme}
          onOpenTemplatesModal={() => setShowTemplatesModal(true)}
        />
        <ViewToggle isDarkTheme={isDarkTheme} />
      </div>
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
