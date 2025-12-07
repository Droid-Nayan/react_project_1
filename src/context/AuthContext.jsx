// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../utils/firebase";

const AuthContext = createContext();

// Custom hook for easy consumption
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Firebase user object or null
  const [loading, setLoading] = useState(true); // true while we check auth state

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Register with email & password
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Login with Google popup
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Login with GitHub popup
  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // Value we give to children
  const value = {
    user,
    loading,
    register,
    login,
    logout,
    signInWithGoogle,
    signInWithGithub
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Checking authentication...</div>}
    </AuthContext.Provider>
  );
};
