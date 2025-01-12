import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowWelcomeModal,
  setRunTour,
  setStepIndex,
  setUserTourStatus,
  setIsLoading,
} from "../slices/tourSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, Code, Cloud, ArrowRight } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { getUserProfile, updateUserTourStatus } from "../../../lib/firestore";

const WelcomeModal = ({ theme }) => {
  const dispatch = useDispatch();
  const { showWelcomeModal, userTourStatus, isLoading } = useSelector(
    (state) => state.tour
  );
  const isDarkTheme = theme === "dark";
  const { user } = useAuth();

  useEffect(() => {
    const checkTourStatus = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            dispatch(setUserTourStatus(profile.hasSeenTour));
            dispatch(setShowWelcomeModal(!profile.hasSeenTour));
          } else {
            dispatch(setShowWelcomeModal(true));
          }
        } catch (error) {
          console.error("Error fetching tour status:", error);
          dispatch(setShowWelcomeModal(false));
        }
      } else {
        const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
        dispatch(setShowWelcomeModal(!hasSeenTour));
        dispatch(setUserTourStatus(hasSeenTour));
      }
      dispatch(setIsLoading(false));
    };

    checkTourStatus();
  }, [user, dispatch]);

  const startTour = async () => {
    if (user) {
      await updateUserTourStatus(user.uid);
      dispatch(setUserTourStatus(true));
    } else {
      localStorage.setItem("hasSeenTour", "true");
    }
    dispatch(setStepIndex(0));
    dispatch(setShowWelcomeModal(false));
    setTimeout(() => {
      dispatch(setRunTour(true));
    }, 500);
  };

  const skipTour = async () => {
    if (user) {
      await updateUserTourStatus(user.uid);
      dispatch(setUserTourStatus(true));
    } else {
      localStorage.setItem("hasSeenTour", "true");
    }
    dispatch(setShowWelcomeModal(false));
  };

  if (isLoading || userTourStatus || !showWelcomeModal) return null;

  const features = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Smart Editor",
      description:
        "Write in Markdown with real-time preview and syntax highlighting",
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      title: "Auto-Save",
      description: "Your work is automatically saved and synced across devices",
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Code Support",
      description: "Syntax highlighting for multiple programming languages",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Rich Features",
      description: "Templates, custom themes, and keyboard shortcuts",
    },
  ];
  return (
    <AnimatePresence>
      {showWelcomeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={skipTour}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`relative w-full max-w-2xl rounded-2xl p-6 ${
              isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            } shadow-xl`}
          >
            {/* Welcome Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`p-3 rounded-xl inline-block mb-4 ${
                  isDarkTheme ? "bg-blue-500/10" : "bg-blue-50"
                }`}
              >
                <div
                  className={`text-3xl ${
                    isDarkTheme ? "text-blue-400" : "text-blue-500"
                  }`}
                >
                  ✨
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Welcome to MConverter</h2>
              <p
                className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                Your powerful markdown editor with modern features
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-4 rounded-xl ${
                    isDarkTheme ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`mb-2 ${
                      isDarkTheme ? "text-blue-400" : "text-blue-500"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p
                    className={`text-sm ${
                      isDarkTheme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startTour}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 
                         text-white rounded-xl hover:bg-blue-600 transition-colors 
                         duration-200 font-medium"
              >
                Take the Tour
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={skipTour}
                className={`px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                  isDarkTheme
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                Skip Tour
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
