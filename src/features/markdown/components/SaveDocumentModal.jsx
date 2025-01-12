import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveNewDocument,
  updateExistingDocument,
} from "../slices/documentsSlice";
import { useAuth } from "../../../context/AuthContext";

const SaveDocumentModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { markdown } = useSelector((state) => state.markdown);
  const { currentDocument } = useSelector((state) => state.documents);
  const [title, setTitle] = useState(currentDocument?.title || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    try {
      if (currentDocument) {
        await dispatch(
          updateExistingDocument({
            docId: currentDocument.id,
            updates: { title, content: markdown },
          })
        ).unwrap();
      } else {
        await dispatch(
          saveNewDocument({
            userId: user.uid,
            title,
            content: markdown,
          })
        ).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Error saving document:", error);
      // Handle error (show toast notification, etc.)
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          {currentDocument ? "Update Document" : "Save Document"}
        </h2>
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document title"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || !title.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveDocumentModal;
