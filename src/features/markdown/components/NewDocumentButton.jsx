import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentDocument } from "../slices/documentsSlice";
import { setMarkdown, setEditorEnabled } from "../slices/markdownSlice";
import { PlusCircle } from "lucide-react";

const NewDocumentButton = ({ isDarkTheme }) => {
  const dispatch = useDispatch();

  const handleNewDocument = () => {
    dispatch(setCurrentDocument(null));
    dispatch(setMarkdown(""));
    dispatch(setEditorEnabled(true));
  };

  return (
    <button
      onClick={handleNewDocument}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isDarkTheme
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      <PlusCircle size={20} />
      <span>New Document</span>
    </button>
  );
};

export default NewDocumentButton;
