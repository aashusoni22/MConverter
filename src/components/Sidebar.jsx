import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../context/AuthContext";
import GuidesModal from "../features/sidebar/components/GuidesModal";
import TemplatesModal from "../features/sidebar/components/TemplatesModal";
import ExamplesModal from "../features/sidebar/components/ExamplesModal";
import ProfileModal from "../features/sidebar/components/ProfileModal";

import {
  FileText,
  Layout,
  Box,
  Upload,
  Printer,
  CircleHelp,
  Settings,
  HelpCircle,
  BookOpen,
  ChevronRight,
  LogIn,
  TableOfContents,
  LogOut,
} from "lucide-react";
import AuthModal from "./AuthModal";
import { useSelector } from "react-redux";
import PrintPreviewModal from "../features/sidebar/components/PrintPreviewModal";
import ImportExportModal from "../features/sidebar/components/ImportExportModal";
import FAQModal from "../features/sidebar/components/FAQModal";
import AboutModal from "../features/sidebar/components/AboutModal";
import SettingsModal from "../features/sidebar/components/SettingsModal";
import { useSettings } from "../hooks/useSettings";
import DocumentsModal from "../features/sidebar/components/DocumentsModal";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isExpanded, setIsExpanded] = useState(isMobile);
  const [activeItem, setActiveItem] = useState("editor");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [showGuidesModal, setShowGuidesModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showImportExportModal, setShowImportExportModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showExamplesModal, setShowExamplesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  const { markdown, fontSize, fontFamily } = useSelector(
    (state) => state.markdown
  );
  const { user, logOut } = useAuth();
  const { settings } = useSettings();

  const menuItems = [
    {
      category: "Main",
      items: [
        { id: "documents", icon: FileText, label: "My Documents" },
        { id: "templates", icon: Layout, label: "Templates" },
        { id: "examples", icon: Box, label: "Examples" },
      ],
    },
    {
      category: "Tools",
      items: [
        { id: "importexport", icon: Upload, label: "Import/Export" },
        { id: "print", icon: Printer, label: "Print" },
        {
          id: "guides",
          icon: BookOpen,
          label: "Guides",
        },
      ],
    },
    {
      category: "Support",
      items: [
        { id: "faqs", icon: TableOfContents, label: "FAQs" },
        { id: "settings", icon: Settings, label: "Settings" },
        { id: "about", icon: CircleHelp, label: "About" },
      ],
    },
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (itemId === "documents") {
      setShowDocumentsModal(true);
    } else if (itemId === "guides") {
      setShowGuidesModal(true);
    } else if (itemId === "print") {
      setShowPrintModal(true);
    } else if (itemId === "importexport") {
      setShowImportExportModal(true);
    } else if (itemId === "faqs") {
      setShowFAQModal(true);
    } else if (itemId === "about") {
      setShowAboutModal(true);
    } else if (itemId === "settings") {
      setShowSettingsModal(true);
    } else if (itemId === "templates") {
      setShowTemplatesModal(true);
    } else if (itemId === "examples") {
      setShowExamplesModal(true);
    }
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const handleSignupComplete = () => {
    setIsNewUser(true);
    setShowProfileModal(true);
    setShowAuthModal(false);
  };

  const handleProfileModalClose = () => {
    setShowProfileModal(false);
    setIsNewUser(false);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleAuth = () => {
    setAuthMode("signin");
    setShowAuthModal(true);
  };

  const handleSignOut = () => {
    logOut();
    setShowAuthModal(false);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ")[0][0].toUpperCase();
  };

  return (
    <>
      <div
        style={{
          fontFamily: settings.fontFamily,
          fontSize: settings.fontSize,
        }}
        className={`sidebar-section ${
          isDarkTheme
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        } fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 transition-all duration-200
        ${isExpanded ? "w-56" : "w-[4.3rem]"} 
        ${
          isMobile
            ? isExpanded
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }
        border-r`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${
            isDarkTheme
              ? "bg-gray-800 text-gray-400 hover:text-gray-200"
              : "bg-gray-100 text-gray-600 hover:text-gray-900"
          } absolute -right-4 top-6 p-1 rounded-full
          transition-all duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}
          ${isMobile ? "hidden" : "block"}`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex flex-col h-full py-6 overflow-y-auto">
          <div className="flex-1 px-3">
            {menuItems.map((section, index) => (
              <div key={section.category} className={index !== 0 ? "mt-6" : ""}>
                {isExpanded && (
                  <h2
                    className={`px-3 mb-2 text-xs font-medium uppercase tracking-wider ${
                      isDarkTheme ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {section.category}
                  </h2>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-150
                        ${
                          activeItem === item.id
                            ? isDarkTheme
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-900"
                            : isDarkTheme
                            ? "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          !isExpanded ? "mx-auto" : "mr-3"
                        }`}
                      />
                      {isExpanded && (
                        <div className="flex flex-1 items-center justify-between">
                          <span>{item.label}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-6 px-3 ${!isExpanded && "text-center"}`}>
            {user ? (
              <div
                className={`p-3 rounded-lg ${
                  isDarkTheme ? "bg-gray-800" : "bg-gray-100"
                } transition-all duration-200`}
                onClick={handleProfileClick}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${
                      isExpanded ? "w-8 h-8" : "w-5 h-5"
                    } rounded-full bg-blue-500 flex items-center justify-center text-white font-medium`}
                  >
                    {getInitials(user?.displayName)}
                  </div>
                  {isExpanded && (
                    <div
                      className={`flex-1 min-w-0 ${
                        isDarkTheme ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <p className="font-medium truncate">
                        {user?.displayName || "Guest"}
                      </p>
                      <p className="text-xs opacity-75 truncate">
                        {user?.email}
                      </p>
                    </div>
                  )}
                  {isExpanded && (
                    <button
                      onClick={handleSignOut}
                      className="p-1 rounded hover:bg-gray-700/50 text-gray-400 hover:text-gray-200"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className={`space-y-2 ${!isExpanded && "space-y-4"}`}>
                {isExpanded ? (
                  <button
                    onClick={handleAuth}
                    className="w-full py-2 px-4 rounded-lg font-medium bg-blue-500 text-white
                        hover:bg-blue-600 transition-colors duration-150"
                  >
                    Sign In/Sign Up
                  </button>
                ) : (
                  <button
                    onClick={handleAuth}
                    className="p-2 rounded-lg bg-blue-500 text-white
                      hover:bg-blue-600 transition-colors duration-150"
                  >
                    <LogIn className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        onSignupComplete={handleSignupComplete}
      />
      <GuidesModal
        isOpen={showGuidesModal}
        onClose={() => setShowGuidesModal(false)}
      />
      <PrintPreviewModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        markdown={markdown}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />
      <ImportExportModal
        isOpen={showImportExportModal}
        onClose={() => setShowImportExportModal(false)}
        currentMarkdown={markdown}
      />
      <FAQModal isOpen={showFAQModal} onClose={() => setShowFAQModal(false)} />
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
      <TemplatesModal
        isOpen={showTemplatesModal}
        onClose={() => setShowTemplatesModal(false)}
      />
      <ExamplesModal
        isOpen={showExamplesModal}
        onClose={() => setShowExamplesModal(false)}
      />
      <ProfileModal
        isOpen={showProfileModal}
        onClose={handleProfileModalClose}
        isNewUser={isNewUser}
        user={user}
        onUpdateProfile={async (profileData) => {
          try {
            await updateUserProfile(profileData);
            setIsNewUser(false);
          } catch (error) {
            toast.error("Error updating profile");
            throw error;
          }
        }}
      />
      <DocumentsModal
        isOpen={showDocumentsModal}
        onClose={() => setShowDocumentsModal(false)}
      />
    </>
  );
};

export default Sidebar;
