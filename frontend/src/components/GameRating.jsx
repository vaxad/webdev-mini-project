/* eslint-disable react/prop-types */
// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import '../styles/gameCard.css'; 

export default function GameRating({ rating }) {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;

  return (
    <div className="gameRating">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} className="text-warning" />
      ))}
      {partialStar > 0 && <FontAwesomeIcon icon={faStarHalfAlt} className="text-warning opacity-50" />}
    </div>
  );
}

