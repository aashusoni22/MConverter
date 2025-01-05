import { configureStore } from "@reduxjs/toolkit";
import markdownReducer from "../features/markdown/slices/markdownSlice";
import tourReducer from "../features/tour/slices/tourSlice";
import templateReducer from "../features/templates/slices/templateSlice";

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
    tour: tourReducer,
    template: templateReducer,
  },
});
