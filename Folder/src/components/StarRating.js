import React from 'react';

const StarRating = ({ rating, onSetRating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => onSetRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;