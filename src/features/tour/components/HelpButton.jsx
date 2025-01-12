import React from "react";
import { useDispatch } from "react-redux";
import {
  setRunTour,
  setStepIndex,
  incrementTourKey,
} from "../slices/tourSlice";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

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
      className={`
        fixed z-40 shadow-lg flex items-center gap-2 
        ${
          isMobile
            ? "bottom-20 right-4 px-4 py-2 rounded-lg"
            : "bottom-8 right-8 p-3 rounded-xl"
        }
        transition-all duration-200
        ${
          theme === "dark"
            ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
            : "bg-white hover:bg-gray-50 text-gray-700"
        }
        border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
      `}
      aria-label="Restart Tour"
    >
      <HelpCircle className="w-6 h-6" strokeWidth={1.5} />
      {isMobile && <span className="text-sm font-medium">Need Help?</span>}
    </motion.button>
  );
};

export default HelpButton;
