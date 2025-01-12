import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettings } from "../../slices/markdownSlice";
import EditorSearch from "./EditorSearch";
import UploadButton from "../shared/UploadButton";
import MobileSettingsButton from "../shared/MobileSettingsButton";
import SettingsPanel from "./SettingsPanel";
import MarkdownTools from "./EditorTools";

const EditorControls = ({ textareaRef, isDarkTheme, onImageUpload }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col space-y-2">
        <MarkdownTools editorRef={textareaRef} isDarkTheme={isDarkTheme} />

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <EditorSearch textareaRef={textareaRef} isDarkTheme={isDarkTheme} />
            <UploadButton
              onImageUpload={onImageUpload}
              isDarkTheme={isDarkTheme}
              editorRef={textareaRef}
            />
            <MobileSettingsButton
              onToggle={() => dispatch(toggleSettings())}
              isDarkTheme={isDarkTheme}
            />
          </div>
        </div>
      </div>
      <SettingsPanel isDarkTheme={isDarkTheme} />
    </>
  );
};

export default EditorControls;
