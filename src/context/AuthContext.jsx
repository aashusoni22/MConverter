import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { createUserProfile, getUserProfile } from "../lib/firestore";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Create user profile
      await createUserProfile(result.user.uid, {
        email: result.user.email,
        displayName: result.user.displayName,
      });
      return result;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Check if user profile exists, if not create one
      const profile = await getUserProfile(result.user.uid);
      if (!profile) {
        await createUserProfile(result.user.uid, {
          email: result.user.email,
          displayName: result.user.displayName,
        });
      }
      return result;
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Check if user profile exists, if not create one
      const profile = await getUserProfile(result.user.uid);
      if (!profile) {
        await createUserProfile(result.user.uid, {
          email: result.user.email,
          displayName: result.user.displayName,
        });
      }
      return result;
    } catch (error) {
      console.error("Github sign in error:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        logOut,
        signInWithGoogle,
        signInWithGithub,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
