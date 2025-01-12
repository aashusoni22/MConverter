import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import {
  updateExistingDocument,
  saveNewDocument,
} from "../features/markdown/slices/documentsSlice";
import debounce from "lodash/debounce";

export const useAutoSave = (setSavingStatus) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { markdown } = useSelector((state) => state.markdown);
  const { currentDocument } = useSelector((state) => state.documents);

  const saveContent = useCallback(
    debounce(async (content) => {
      if (!user) return;

      try {
        setSavingStatus("saving");

        if (currentDocument) {
          await dispatch(
            updateExistingDocument({
              docId: currentDocument.id,
              updates: {
                content,
                title: currentDocument.title,
              },
            })
          ).unwrap();
        } else {
          // If it's a new document, save with a temporary title
          await dispatch(
            saveNewDocument({
              userId: user.uid,
              title: "Untitled Document",
              content,
            })
          ).unwrap();
        }

        setSavingStatus("saved");

        // Reset status after a delay
        setTimeout(() => {
          setSavingStatus("idle");
        }, 2000);
      } catch (error) {
        console.error("Auto-save failed:", error);
        setSavingStatus("error");
      }
    }, 1500), // Debounce delay of 1.5 seconds
    [dispatch, currentDocument, user]
  );

  useEffect(() => {
    if (markdown && markdown.trim()) {
      saveContent(markdown);
    }
  }, [markdown, saveContent]);

  return null;
};
