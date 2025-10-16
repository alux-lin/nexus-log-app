// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
// 🎯 ADDED: Imports for the services we need
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from your file
const firebaseConfig = {
  apiKey: "AIzaSyBTQKhoJhYp7VQMWaYeaEfdvgxae4-1W1s",
  authDomain: "nexus-log.firebaseapp.com",
  projectId: "nexus-log",
  storageBucket: "nexus-log.appspot.com", // Corrected common typo from .firebasestorage. to .appspot.
  messagingSenderId: "1014755531449",
  appId: "1:1014755531449:web:11b23710f4ccdf72ea5968",
  measurementId: "G-02JGX2BX8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🎯 FIXED: Initialize and export the services for the rest of the app to use
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export other useful functions for convenience
export { signInAnonymously, onAuthStateChanged };