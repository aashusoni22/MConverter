import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  runTour: false,
  stepIndex: 0,
  tourKey: 0,
  showWelcomeModal: !localStorage.getItem("hideWelcome"),
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setRunTour: (state, action) => {
      state.runTour = action.payload;
    },
    setStepIndex: (state, action) => {
      state.stepIndex = action.payload;
    },
    incrementTourKey: (state) => {
      state.tourKey += 1;
    },
    setShowWelcomeModal: (state, action) => {
      state.showWelcomeModal = action.payload;
    },
  },
});

export const {
  setRunTour,
  setStepIndex,
  incrementTourKey,
  setShowWelcomeModal,
} = tourSlice.actions;

export default tourSlice.reducer;
