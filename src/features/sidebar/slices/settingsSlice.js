import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fontSize: "14px",
  fontFamily: "inter",
  defaultView: "split",
  themePreference: "system",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSettings: () => initialState,
  },
});

export const { updateSettings, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
