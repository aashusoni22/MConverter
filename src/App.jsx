import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import MConverterComponents from "./features/markdown/components/MConverterComponents";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./context/AuthContext";
import { useSettings } from "./hooks/useSettings";
import TourProvider from "./features/tour/components/TourProvider";
import WelcomeModal from "./features/tour/components/WelcomeModal";
import HelpButton from "./features/tour/components/HelpButton";

const App = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { settings } = useSettings();

  useEffect(() => {
    if (settings.themePreference === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isDark ? "dark" : "light");
    } else {
      setTheme(settings.themePreference);
    }
  }, [settings.themePreference]);

  return (
    <AuthProvider>
      <div
        style={{
          fontFamily: settings.fontFamily,
          fontSize: settings.fontSize,
        }}
        className={`font-chakra min-h-screen ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } transition-colors duration-300`}
      >
        <TourProvider theme={theme} className="z-50" />
        <WelcomeModal theme={theme} />
        <Header className="fixed top-0 w-full z-40" />
        <div className="flex">
          <Sidebar className="z-30" />
          <main className="flex-1 transition-all duration-300 ml-20 lg:ml-24 lg:mr-4 mt-1">
            <MConverterComponents className="z-20" />
          </main>
        </div>
        <HelpButton theme={theme} />
      </div>
    </AuthProvider>
  );
};

export default App;
