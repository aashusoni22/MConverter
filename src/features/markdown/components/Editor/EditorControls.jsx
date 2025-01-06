import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettings } from "../../slices/markdownSlice";
import EditorSearch from "./EditorSearch";
import FontControls from "../shared/FontControls";
import FullScreenButton from "../shared/FullScreenButton";
import UploadButton from "../shared/UploadButton";
import MobileSettingsButton from "../shared/MobileSettingsButton";
import EditorHeader from "./EditorHeader";
import { toggleEditorFullScreen } from "../../slices/markdownSlice";

const EditorControls = ({ textareaRef, isDarkTheme, onImageUpload }) => {
  const dispatch = useDispatch();
  const { isEditorFullScreen } = useSelector((state) => state.markdown);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2 editor-controls">
        <EditorSearch textareaRef={textareaRef} isDarkTheme={isDarkTheme} />
        <UploadButton onImageUpload={onImageUpload} isDarkTheme={isDarkTheme} />
        <MobileSettingsButton
          onToggle={() => dispatch(toggleSettings())}
          isDarkTheme={isDarkTheme}
        />
        <div className="hidden md:flex items-center space-x-2">
          <FontControls isDarkTheme={isDarkTheme} />
          <FullScreenButton
            isFullScreen={isEditorFullScreen}
            toggleFullScreen={() => dispatch(toggleEditorFullScreen())}
            isDarkTheme={isDarkTheme}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default EditorControls;
