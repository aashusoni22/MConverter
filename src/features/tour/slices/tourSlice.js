// tourSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showWelcomeModal: false,
  isLoading: true,
  userTourStatus: false,
  runTour: false,
  stepIndex: -1,
  tourKey: 0,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setShowWelcomeModal: (state, action) => {
      state.showWelcomeModal = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserTourStatus: (state, action) => {
      state.userTourStatus = action.payload;
      if (action.payload === true) {
        state.showWelcomeModal = false;
      }
    },
    setRunTour: (state, action) => {
      state.runTour = action.payload;
    },
    setStepIndex: (state, action) => {
      state.stepIndex = action.payload;
    },
    incrementTourKey: (state) => {
      state.tourKey += 1;
    },
    completeTour: (state) => {
      state.runTour = false;
      state.stepIndex = -1;
      state.showWelcomeModal = false;
      state.userTourStatus = true;
    },
    resetTourState: (state) => {
      state.showWelcomeModal = false;
      state.userTourStatus = false;
      state.runTour = false;
      state.stepIndex = -1;
    },
  },
});

export const {
  setShowWelcomeModal,
  setIsLoading,
  setUserTourStatus,
  setRunTour,
  setStepIndex,
  incrementTourKey,
  completeTour,
  resetTourState,
} = tourSlice.actions;

// Selectors
export const selectTourState = (state) => state.tour;
export const selectShowWelcomeModal = (state) => state.tour.showWelcomeModal;
export const selectIsLoading = (state) => state.tour.isLoading;
export const selectUserTourStatus = (state) => state.tour.userTourStatus;
export const selectTourKey = (state) => state.tour.tourKey;

export default tourSlice.reducer;
