import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowWelcomeModal,
  setRunTour,
  setStepIndex,
} from "../slices/tourSlice";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeModal = ({ theme }) => {
  const dispatch = useDispatch();
  const { showWelcomeModal, runTour } = useSelector((state) => state.tour);

  const startTour = () => {
    console.log("Starting tour...");
    dispatch(setStepIndex(0)); // Reset step index
    dispatch(setShowWelcomeModal(false));
    // Add a slight delay to ensure modal is closed before tour starts
    setTimeout(() => {
      console.log("Dispatching setRunTour(true)");
      dispatch(setRunTour(true));
    }, 300);
  };

  if (!showWelcomeModal) return null;

  return (
    <AnimatePresence>
      {showWelcomeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          {/* ... rest of your modal JSX ... */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startTour}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                transition-colors duration-200 font-medium"
            >
              Show Me Around
            </motion.button>
            {/* ... rest of your buttons ... */}
          </div>
          {/* ... rest of your modal content ... */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
