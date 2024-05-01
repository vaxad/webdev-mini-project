/* eslint-disable react/prop-types */
// import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/gameCard.css'; 
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [hover,setHover] = useState(false)
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
    <div className=" p-4 h-full w-full relative flex flex-grow">
      <Link to={`/games/${game.id}`} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>{setHover(false)}} className="flex flex-col rounded-2xl h-full w-full overflow-clip bg-zinc-950 border border-yellow-500">
      
        <div className=' w-full flex h-3/5 relative'>
        <div  className={`absolute top-0 right-0 h-full w-full opacity-0 ${hover?"opacity-90 cursor-pointer":""} transition-all delay-75 duration-300 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.9)]`}>
        <h1 className=' text-slate-50 font-semibold text-xl text-center '>Genre:<span className=' font-medium'>{" "}{game.genres.map((genre)=>genre.name).join(", ")}</span></h1>
      </div>
        <img src={game.background_image} alt={game.name} className=" w-full h-full" />
        </div>
        {/* <div className="genreChipContainer"> 
          {game.genres && game.genres.length > 0 && game.genres.map((genre, index) => (
            <div className="genreChip" key={index}>{genre.name}</div>
          ))}
        </div> */}
        <div className=' px-4 flex flex-col pb-4'>
        <div className=" flex flex-row justify-between  items-end ">
          <div className=" gap-3">
            <div className=" mt-4 mb-2 text-2xl font-semibold w-full">{game.name}</div>
            <div className=""> {releaseYear}</div>
          </div>
          <div className=" flex flex-col py-2 gap-1 items-end justify-end">
            <div><Rating rating={game.rating} /></div>
            <div className=" text-nowrap">{game.ratings_count} reviews</div>
          </div>
        </div>
        <div className=' flex flex-row flex-shrink gap-2 py-2'>
          {randomTags.slice(0, 2).map((tag, index) => (
            <div className="tagChip bg-yellow-500 text-zinc-950 font-bold flex-shrink" key={index}>{tag.name}</div>
          ))}
        </div>
        </div>
      </Link>
    </div>
  );
}

export default GameCard;
