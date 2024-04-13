/* eslint-disable react/prop-types */
// import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/gameCard.css'; 

function Rating({ rating }) {
  return (
    <div className="gameRating" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faStar} className="text-warning" />
      <span className="ms-2">{rating}/5.0</span>
    </div>
  );
}

function GameCard({ game }) {
  const releaseYear = game.released ? game.released.substring(0, 4) : '';

  const getRandomTags = (tags) => {
    if (!tags || tags.length === 0) {
      return [];
    }

    const availableTags = tags.slice(0, 4); 
    const shuffledTags = availableTags.sort(() => Math.random() - 0.5); 

    return shuffledTags.slice(0, Math.min(4, availableTags.length)); 
  };

  const randomTags = getRandomTags(game.tags || []); 
  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="gameCard">
        <img src={game.background_image} alt={game.name} className="img-fluid" />
        <div className="genreChipContainer"> 
          {game.genres && game.genres.length > 0 && game.genres.map((genre, index) => (
            <div className="genreChip" key={index}>{genre.name}</div>
          ))}
          {randomTags.slice(0, 4).map((tag, index) => (
            <div className="tagChip" key={index}>{tag.name}</div>
          ))}
        </div>
        <div className="gameInfo">
          <div className="left">
            <div className="gameTitle mt-4 mb-2">{game.name}</div>
            <div className="releaseDate"> {releaseYear}</div>
          </div>
          <div className="right">
            <div><Rating rating={game.rating} /></div>
            <div className="review">{game.ratings_count} reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
