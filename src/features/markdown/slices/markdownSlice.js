import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  markdown: "",
  fontSize: "16px",
  fontFamily: "Arial",
  editorEnabled: false,
  isEditorFullScreen: false,
  isPreviewFullScreen: false,
  activeTab: "editor",
  searchQuery: "",
  isSearchBarOpen: false,
  isSettingsOpen: false,
  copied: false,
  downloaded: false,
};

const markdownSlice = createSlice({
  name: "markdown",
  initialState,
  reducers: {
    setMarkdown: (state, action) => {
      state.markdown = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setEditorEnabled: (state, action) => {
      state.editorEnabled = action.payload;
    },
    toggleEditorFullScreen: (state) => {
      state.isEditorFullScreen = !state.isEditorFullScreen;
      if (state.isPreviewFullScreen) state.isPreviewFullScreen = false;
    },
    togglePreviewFullScreen: (state) => {
      state.isPreviewFullScreen = !state.isPreviewFullScreen;
      if (state.isEditorFullScreen) state.isEditorFullScreen = false;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleSearchBar: (state) => {
      state.isSearchBarOpen = !state.isSearchBarOpen;
      if (!state.isSearchBarOpen) state.searchQuery = "";
    },
    toggleSettings: (state) => {
      state.isSettingsOpen = !state.isSettingsOpen;
    },
    setCopied: (state, action) => {
      state.copied = action.payload;
    },
    setDownloaded: (state, action) => {
      state.downloaded = action.payload;
    },
  },
});

export const {
  setMarkdown,
  setFontSize,
  setFontFamily,
  setEditorEnabled,
  toggleEditorFullScreen,
  togglePreviewFullScreen,
  setActiveTab,
  setSearchQuery,
  toggleSearchBar,
  toggleSettings,
  setCopied,
  setDownloaded,
} = markdownSlice.actions;

export default markdownSlice.reducer;
