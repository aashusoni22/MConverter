import { configureStore } from "@reduxjs/toolkit";
import markdownReducer from "../features/markdown/slices/markdownSlice";
import tourReducer from "../features/tour/slices/tourSlice";
import templateReducer from "../features/templates/slices/templateSlice";
import settingsReducer from "../features/sidebar/slices/settingsSlice";
import documentsReducer from "../features/markdown/slices/documentsSlice";

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
    tour: tourReducer,
    template: templateReducer,
    settings: settingsReducer,
    documents: documentsReducer,
  },
});
