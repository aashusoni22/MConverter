import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  fetchUserDocuments,
  deleteExistingDocument,
  setCurrentDocument,
  updateExistingDocument,
} from "../slices/documentsSlice";
import { setMarkdown, setEditorEnabled } from "../slices/markdownSlice";
import { FileText, Trash2, Edit, Calendar } from "lucide-react";
import EditableTitle from "./EditableTitle";

const DocumentsList = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { documents } = useSelector((state) => state.documents);
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    if (user) {
      dispatch(fetchUserDocuments(user.uid));
    }
  }, [dispatch, user]);

  const handleDocumentSelect = (document) => {
    dispatch(setCurrentDocument(document));
    dispatch(setMarkdown(document.content));
    dispatch(setEditorEnabled(true));
  };

  const handleDocumentDelete = async (e, docId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await dispatch(deleteExistingDocument(docId)).unwrap();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // If the date is today
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    // If the date is yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    // For other dates
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full">
      {documents.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center py-12 ${
            isDarkTheme ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <FileText size={48} className="opacity-40 mb-4" />
          <p className="text-lg font-medium mb-2">No documents yet</p>
          <p className="text-sm opacity-75">
            Create a new document to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`group relative rounded-xl transition-all duration-200 ${
                isDarkTheme
                  ? "bg-gray-800/50 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/5"
                  : "bg-gray-50 hover:bg-white hover:shadow-lg hover:shadow-black/5"
              }`}
            >
              <div
                onClick={() => handleDocumentSelect(doc)}
                className="p-4 cursor-pointer relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-grow min-w-0 mr-12">
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        isDarkTheme
                          ? "bg-gray-700/50 text-blue-400"
                          : "bg-blue-50 text-blue-500"
                      }`}
                    >
                      <FileText size={20} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <EditableTitle
                        initialTitle={doc.title}
                        onSave={async (newTitle) => {
                          try {
                            await dispatch(
                              updateExistingDocument({
                                docId: doc.id,
                                updates: { title: newTitle },
                              })
                            ).unwrap();
                          } catch (error) {
                            console.error("Error updating title:", error);
                          }
                        }}
                        isDarkTheme={isDarkTheme}
                        className="mb-1"
                      />
                      <div
                        className={`flex items-center text-sm ${
                          isDarkTheme ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(doc.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute right-4 top-1/2 -translate-y-1/2
          opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                  >
                    <button
                      onClick={(e) => handleDocumentDelete(e, doc.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkTheme
                          ? "bg-gray-700 hover:bg-red-900/70 text-gray-300 hover:text-red-300"
                          : "bg-white hover:bg-red-50 text-gray-600 hover:text-red-600"
                      }`}
                      title="Delete document"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsList;
