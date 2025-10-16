// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signInAnonymously } from '../firebaseConfig';

export function useAuth() {
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setStatus('Ready');
      } else {
        setStatus('Authenticating...');
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
          setStatus('Authentication Failed');
        });
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return { userId, authStatus: status };
}