import React from "react";
import { useDispatch } from "react-redux";
import {
  setRunTour,
  setStepIndex,
  incrementTourKey,
} from "../slices/tourSlice";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const HelpButton = ({ theme }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleRestartTour = () => {
    dispatch(setStepIndex(0));
    dispatch(incrementTourKey());
    dispatch(setRunTour(true));
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleRestartTour}
      className={`fixed z-40 shadow-lg flex items-center gap-2 ${
        isMobile
          ? "bottom-20 right-4 px-4 py-2 rounded-lg"
          : "bottom-8 right-8 p-3 rounded-xl"
      } transition-colors ${
        theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
          : "bg-white hover:bg-gray-50 text-gray-700"
      } border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
      aria-label="Restart Tour"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        className="h-5 w-5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
      {isMobile && <span className="text-sm font-medium">Need Help?</span>}
    </motion.button>
  );
};

export default HelpButton;
