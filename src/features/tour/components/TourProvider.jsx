import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Joyride, { STATUS, ACTIONS } from "react-joyride";
import { setRunTour, setStepIndex } from "../slices/tourSlice";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";

const TourProvider = ({ theme }) => {
  const dispatch = useDispatch();
  const { runTour, stepIndex, tourKey } = useSelector((state) => state.tour);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const getMobileSteps = () => [
    {
      target: ".mobile-tabs",
      content: "Switch between editor and preview modes easily with these tabs",
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: ".templates-section",
      content: "Get started quickly with our pre-made templates",
      placement: "bottom",
    },
    {
      target: ".editor-section",
      content:
        "Write your Markdown here - tap the preview tab to see the result!",
      placement: "left",
    },
  ];

  const getDesktopSteps = () => [
    {
      target: ".templates-section",
      content:
        "Start your journey with our pre-made templates! Choose from Blog Posts, Resumes, and more.",
      placement: "left",
      disableBeacon: true,
    },
    {
      target: ".editor-section",
      content:
        "Write or paste your Markdown content here. New to Markdown? Check out our handy cheat sheet!",
      placement: "right",
    },
    {
      target: ".preview-section",
      content:
        "Watch your content come to life! Your Markdown transforms into beautifully formatted text here.",
      placement: "right",
    },
    {
      target: ".editor-controls",
      content:
        "Customize your workspace with font settings and powerful search features.",
      placement: "bottom",
    },
    {
      target: ".preview-controls",
      content:
        "Export your work or copy the formatted content with a single click.",
      placement: "bottom",
    },
  ];

  const steps = isMobile ? getMobileSteps() : getDesktopSteps();

  const handleJoyrideCallback = (data) => {
    const { status, type, index, action } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      dispatch(setRunTour(false));
      toast.success("Tour completed! Click the help icon anytime to restart.");
    } else if ([ACTIONS.CLOSE].includes(action)) {
      dispatch(setRunTour(false));
      toast("Tour closed. Click the help icon to restart anytime!");
    }

    if (type === "step:after") {
      dispatch(setStepIndex(index + 1));
    }
  };

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
      styles={{
        options: {
          arrowColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
          backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
          overlayColor: "rgba(0, 0, 0, 0.5)",
          primaryColor: "#3B82F6",
          textColor: theme === "dark" ? "#F3F4F6" : "#1F2937",
          zIndex: 1000,
          width: isMobile ? 290 : 400,
          padding: isMobile ? 16 : 24,
        },
        tooltip: {
          fontSize: isMobile ? 14 : 16,
        },
        tooltipTitle: { fontSize: isMobile ? 16 : 18 },
        buttonNext: {
          backgroundColor: "#3B82F6",
          fontSize: isMobile ? 14 : 16,
          padding: isMobile ? "8px 16px" : "12px 24px",
        },
        buttonBack: {
          marginRight: 10,
          fontSize: isMobile ? 14 : 16,
          padding: isMobile ? "8px 16px" : "12px 24px",
        },
        buttonSkip: {
          fontSize: isMobile ? 14 : 16,
          padding: isMobile ? "8px 16px" : "12px 24px",
        },
      }}
      callback={handleJoyrideCallback}
      floaterProps={{
        disableAnimation: true,
        hideArrow: isMobile,
      }}
    />
  );
};

export default TourProvider;
