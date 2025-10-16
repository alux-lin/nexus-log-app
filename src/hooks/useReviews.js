import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function useReviews(userId) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userId) return;
      setStatus('Loading Chronicle...');
      const reviewsCol = collection(db, 'users', userId, 'reviews');
      const q = query(reviewsCol, orderBy('createdAt', 'desc'));
      const reviewSnapshot = await getDocs(q);
      const reviewList = reviewSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setReviews(reviewList);
      setStatus('Ready');
    };

    fetchReviews();
  }, [userId]);

  const addReview = async (reviewData) => {
    if (!userId) throw new Error("User not authenticated.");
    setStatus('Saving...');
    
    const dataToSend = {
        ...reviewData,
        createdAt: serverTimestamp(),
    };

    const reviewsCol = collection(db, 'users', userId, 'reviews');
    const newDocRef = await addDoc(reviewsCol, dataToSend);

    // 🎯 FINAL FIX: Create a Firestore-compatible Timestamp for our local state.
    // This ensures the local data structure matches the server data structure.
    const newReviewForState = {
        ...reviewData,
        id: newDocRef.id,
        createdAt: Timestamp.now(), // Use Firestore's Timestamp class to create a compatible object
    };

    setReviews(prev => [newReviewForState, ...prev]);
    setStatus('Save complete!');
    return newReviewForState;
  };

  return { reviews, addReview, reviewsStatus: status };
}