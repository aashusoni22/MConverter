import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_r16RDpcJPpPKrMUE9mXaQs1LQtaGEFQ",
  authDomain: "mconverter-32f34.firebaseapp.com",
  projectId: "mconverter-32f34",
  storageBucket: "mconverter-32f34.firebasestorage.app",
  messagingSenderId: "726390157933",
  appId: "1:726390157933:web:69664f4fae8b8030d7c564",
  measurementId: "G-E1BVHWJHW9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
