import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Joyride, { STATUS, ACTIONS } from "react-joyride";
import { completeTour, setRunTour, setStepIndex } from "../slices/tourSlice";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";

const TourProvider = ({ theme }) => {
  const dispatch = useDispatch();
  const { runTour, stepIndex, tourKey } = useSelector((state) => state.tour);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const getDesktopSteps = () => {
    const elements = {
      sidebar: document.querySelector(".sidebar-section"),
      editor: document.querySelector(".editor-section"),
      templates: document.querySelector(".templates-button"),
      preview: document.querySelector(".preview-section"),
      toolbar: document.querySelector(".toolbar-section"),
    };

    return [
      elements.sidebar && {
        target: ".sidebar-section",
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Welcome to Your Workspace! 👋
            </h3>
            <p>
              This is your command center. Access all features from this
              sidebar.
            </p>
          </div>
        ),
        placement: "right",
        disableBeacon: true,
      },
      elements.editor && {
        target: ".editor-section",
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Smart Markdown Editor ✨</h3>
            <p>
              Write or paste your Markdown here. You'll love our syntax
              highlighting and real-time preview!
            </p>
            <div className="text-sm opacity-75 mt-2">
              Pro tip: Use Ctrl + Space for quick formatting options
            </div>
          </div>
        ),
        placement: "right",
        styles: {
          spotlight: {
            borderRadius: "12px",
          },
        },
      },
      elements.templates && {
        target: ".templates-button",
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Quick-Start Templates 🚀</h3>
            <p>
              Jump-start your writing with our professionally designed
              templates.
            </p>
            <ul className="text-sm list-disc pl-4 mt-1">
              <li>Professional Resume</li>
              <li>Blog Posts</li>
              <li>Documentation</li>
            </ul>
          </div>
        ),
        placement: "left",
        styles: {
          spotlight: {
            borderRadius: "8px",
          },
        },
      },
      elements.preview && {
        target: ".preview-section",
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Live Preview 🎯</h3>
            <p>
              Watch your markdown transform instantly! Your formatted content
              appears here in real-time.
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Always in sync with your editor</span>
            </div>
          </div>
        ),
        placement: "right",
        styles: {
          spotlight: {
            borderRadius: "12px",
          },
        },
      },
      elements.toolbar && {
        target: ".toolbar-section",
        content: (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Power Tools ⚡</h3>
            <p>All the tools you need for perfect formatting:</p>
            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM19 19H5V5H19V19Z" />
                </svg>
                <span>Format</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 3H19C20.11 3 21 3.89 21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.11 3 19V5C3 3.89 3.89 3 5 3ZM7 7V9H17V7H7ZM7 11V13H17V11H7ZM7 15V17H14V15H7Z" />
                </svg>
                <span>Export</span>
              </div>
            </div>
          </div>
        ),
        placement: "bottom",
        styles: {
          spotlight: {
            borderRadius: "8px",
          },
        },
      },
    ].filter(Boolean);
  };

  const getMobileSteps = () => [
    {
      target: ".mobile-header",
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Welcome! 👋</h3>
          <p>Let's get you started with the essentials.</p>
        </div>
      ),
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: ".mobile-tabs",
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Easy Navigation 🎯</h3>
          <p>Switch between your editor and preview with a single tap.</p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: ".mobile-editor",
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Write Here ✍️</h3>
          <p>Your markdown editor with smart features and formatting tools.</p>
        </div>
      ),
      placement: "top",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status, type, index, action } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      dispatch(completeTour());
      const toastContent = (
        <div className="flex items-center gap-2">
          <span>🎉</span>
          <div>
            <p className="font-medium">Tour completed!</p>
            <p className="text-sm opacity-90">
              Click the help icon anytime to restart
            </p>
          </div>
        </div>
      );
      toast.success(toastContent, {
        duration: 3000,
        position: "top-center",
      });
    } else if ([ACTIONS.CLOSE].includes(action)) {
      dispatch(completeTour());
    }

    if (type === "step:after") {
      dispatch(setStepIndex(index + 1));
    }
  };

  const steps = isMobile ? getMobileSteps() : getDesktopSteps();

  return (
    <Joyride
      key={tourKey}
      steps={steps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      scrollToFirstStep
      spotlightClicks
      debug={true}
      styles={{
        options: {
          arrowColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
          backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
          overlayColor: "rgba(0, 0, 0, 0.75)",
          primaryColor: "#3B82F6",
          textColor: theme === "dark" ? "#F3F4F6" : "#1F2937",
          zIndex: 1000,
          width: isMobile ? 300 : 420,
          borderRadius: "12px",
          spotlight: {
            borderRadius: "12px",
          },
        },
        spotlight: {
          borderRadius: "12px",
        },
        tooltip: {
          padding: 20,
          borderRadius: "12px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
        tooltipContainer: {
          textAlign: "left",
        },
        buttonNext: {
          backgroundColor: "#3B82F6",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "15px",
          fontWeight: 500,
          border: "none",
        },
        buttonBack: {
          color: theme === "dark" ? "#9CA3AF" : "#4B5563",
          marginRight: 12,
          padding: "10px 20px",
          fontSize: "15px",
          fontWeight: 500,
        },
        buttonSkip: {
          color: theme === "dark" ? "#9CA3AF" : "#4B5563",
          fontSize: "15px",
          fontWeight: 500,
        },
      }}
      callback={handleJoyrideCallback}
      floaterProps={{
        disableAnimation: false,
      }}
    />
  );
};

export default TourProvider;
