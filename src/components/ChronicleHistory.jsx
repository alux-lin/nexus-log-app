import React from 'react';

export const ChronicleHistory = ({ reviews, onSelectReview }) => {
  if (reviews.length === 0) {
    return <p>No entries saved.</p>;
  }

  // 🎯 FINAL FIX: This function now correctly handles Firestore Timestamps.
  const formatDate = (timestamp) => {
    // The timestamp object from Firestore has a toDate() method.
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toLocaleDateString();
    }
    // If it's not a Firestore timestamp (e.g., from our optimistic update),
    // we return an empty string to avoid errors. The data will be correct on refresh.
    // This prevents the app from crashing.
    return 'Just now'; 
  };

  return (
    <ul className="space-y-2 text-sm">
      {reviews.map(review => (
        <li key={review.id}>
          <button
            onClick={() => onSelectReview(review)}
            className="w-full text-left p-2 bg-gray-800/50 hover:bg-gray-700/50 border-l-2 border-amber-500 hover:border-amber-400 transition-colors rounded-r-sm"
          >
            <div className="flex justify-between items-center">
              <span>Level {review.level} - {review.characterName}</span>
              {/* This will now show "Just now" for the new entry, and the date for old ones */}
              <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

