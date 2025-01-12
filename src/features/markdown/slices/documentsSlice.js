import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveDocument,
  updateDocument,
  deleteDocument,
  getUserDocuments,
} from "../../../lib/firestore";

export const saveNewDocument = createAsyncThunk(
  "documents/saveNew",
  async ({ userId, title, content }) => {
    const docId = await saveDocument(userId, title, content);
    return { id: docId, userId, title, content };
  }
);

export const updateExistingDocument = createAsyncThunk(
  "documents/update",
  async ({ docId, updates }) => {
    await updateDocument(docId, updates);
    return { id: docId, ...updates };
  }
);

export const deleteExistingDocument = createAsyncThunk(
  "documents/delete",
  async (docId) => {
    await deleteDocument(docId);
    return docId;
  }
);

export const fetchUserDocuments = createAsyncThunk(
  "documents/fetchAll",
  async (userId) => {
    return await getUserDocuments(userId);
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    currentDocument: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveNewDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveNewDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documents.push(action.payload);
        state.currentDocument = action.payload;
      })
      .addCase(saveNewDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateExistingDocument.fulfilled, (state, action) => {
        const index = state.documents.findIndex(
          (doc) => doc.id === action.payload.id
        );
        if (index !== -1) {
          state.documents[index] = {
            ...state.documents[index],
            ...action.payload,
          };
        }
      })
      .addCase(deleteExistingDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter(
          (doc) => doc.id !== action.payload
        );
        if (state.currentDocument?.id === action.payload) {
          state.currentDocument = null;
        }
      })
      .addCase(fetchUserDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documents = action.payload;
      });
  },
});

export const { setCurrentDocument } = documentsSlice.actions;
export default documentsSlice.reducer;
