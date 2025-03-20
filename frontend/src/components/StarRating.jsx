import React, { useState } from "react";

const StarRating = ({ rating, onRatingChange, totalStars = 5 }) => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);
  const handleClick = (index) => onRatingChange(index + 1);

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={index < (hovered !== null ? hovered : rating) ? "#FFD700" : "#e4e5e9"}
          className="w-6 h-6 cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
