import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Collection references
const DOCUMENTS_COLLECTION = "documents";

// Save a new document
export const saveDocument = async (userId, title, content) => {
  try {
    const docRef = await addDoc(collection(db, DOCUMENTS_COLLECTION), {
      userId,
      title,
      content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving document:", error);
    throw error;
  }
};

// Update an existing document
export const updateDocument = async (docId, updates) => {
  try {
    const docRef = doc(db, DOCUMENTS_COLLECTION, docId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (docId) => {
  try {
    const docRef = doc(db, DOCUMENTS_COLLECTION, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Get all documents for a user
export const getUserDocuments = async (userId) => {
  try {
    const q = query(
      collection(db, DOCUMENTS_COLLECTION),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Convert Firestore Timestamps to ISO strings
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching user documents:", error);
    throw error;
  }
};

export const createUserProfile = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...data,
      hasSeenTour: false,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const updateUserTourStatus = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create the user document if it doesn't exist
      await setDoc(userRef, {
        hasSeenTour: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      // Update existing document
      await updateDoc(userRef, {
        hasSeenTour: true,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error updating tour status:", error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
