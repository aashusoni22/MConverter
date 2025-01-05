import { createSlice } from "@reduxjs/toolkit";
import templates from "../../../data/templates.json";

const initialState = {
  templates,
  selectedTemplate: "",
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
});

export const { setSelectedTemplate } = templateSlice.actions;
export default templateSlice.reducer;
