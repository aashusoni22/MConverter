import React from "react";
import { useDispatch } from "react-redux";
import {
  setRunTour,
  setStepIndex,
  incrementTourKey,
} from "../slices/tourSlice";
import { useMediaQuery } from "react-responsive";

const HelpButton = ({ theme }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleRestartTour = () => {
    dispatch(setStepIndex(0));
    dispatch(incrementTourKey());
    dispatch(setRunTour(true));
  };

  return (
    <button
      onClick={handleRestartTour}
      className={`fixed ${
        isMobile && "bottom-8 right-4"
      } md:top-24 md:right-8 p-3 md:p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        theme === "dark"
          ? "bg-gray-700 hover:bg-gray-600 text-gray-400"
          : "bg-gray-200 hover:bg-gray-300 text-gray-500"
      }`}
      aria-label="Restart Tour"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="h-6 w-6 md:h-6 md:w-6"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    </button>
  );
};

export default HelpButton;
