import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowWelcomeModal } from "../slices/tourSlice";
import { setRunTour } from "../slices/tourSlice";

const WelcomeModal = ({ theme }) => {
  const dispatch = useDispatch();
  const { showWelcomeModal } = useSelector((state) => state.tour);

  if (!showWelcomeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
      <div
        className={`w-full max-w-md transform rounded-xl p-6 md:p-8 shadow-2xl transition-all ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="relative">
          <button
            onClick={() => dispatch(setShowWelcomeModal(false))}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="text-center">
            <div className="mb-4 md:mb-6">
              <svg
                className="mx-auto h-12 w-12 md:h-16 md:w-16 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2
              className={`text-2xl md:text-3xl font-bold mb-3 md:mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome to MConverter! 👋
            </h2>

            <p
              className={`mb-6 md:mb-8 text-sm md:text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Transform your ideas into beautifully formatted documents with our
              powerful Markdown editor. Let's get you started!
            </p>

            <div className="flex flex-col gap-3 md:gap-4">
              <button
                onClick={() => {
                  dispatch(setShowWelcomeModal(false));
                  setTimeout(() => dispatch(setRunTour(true)), 400);
                }}
                className="w-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Take the Tour
              </button>

              <button
                onClick={() => dispatch(setShowWelcomeModal(false))}
                className={`w-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg transition-colors duration-200 ${
                  theme === "dark"
                    ? "border border-gray-600 hover:bg-gray-700"
                    : "border border-gray-300 hover:bg-gray-100 text-gray-500"
                }`}
              >
                Skip Tour
              </button>
            </div>

            <div className="mt-4 md:mt-6">
              <label
                className={`flex items-center justify-center gap-2 text-xs md:text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem("hideWelcome", "true");
                    } else {
                      localStorage.removeItem("hideWelcome");
                    }
                  }}
                />
                Don't show this again
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
