import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showWelcomeModal: true,
  runTour: false,
  stepIndex: 0,
  tourKey: 0,
  userTourStatus: null,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setShowWelcomeModal: (state, action) => {
      state.showWelcomeModal = action.payload;
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
      state.showWelcomeModal = false;
      state.runTour = false;
      localStorage.setItem("tourCompleted", "true");
    },
    setUserTourStatus: (state, action) => {
      state.userTourStatus = action.payload;
      state.showWelcomeModal = !action.payload;
    },
  },
});

export const {
  setShowWelcomeModal,
  setRunTour,
  setStepIndex,
  incrementTourKey,
  completeTour,
  setUserTourStatus,
} = tourSlice.actions;

export default tourSlice.reducer;
