import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiHelper } from '../lib/apiHelper';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Import the star icon
import "../styles/game.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Game() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    async function getSuggestions(searchTerm) {
        const res = await apiHelper.dynamicSearch(searchTerm);
        if (res.error) {
            console.log(res.error);
            return;
        }
        setSuggestions(res);
    }

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSuggestions([]);
            return;
        }
        getSuggestions(searchTerm);
    }, [searchTerm]);

    const getData = async () => {
        const res = await apiHelper.fetchGameData(id);
        if (res.error) {
            console.log(res.error);
            return;
        }
        setData(res);
    };

    useEffect(() => {
        getData();
    }, []);

    const releaseYear = data?.released ? new Date(data.released).getFullYear() : '';

    // Function to render genres with title
    const renderGenres = () => {
        return (
            <div>
                <h3 className="text-lg  text-grey-2000">Genres:</h3>
                <div className='flex flex-row flex-shrink gap-2 py-2'>
                    {data.genres.slice(0, 6).map((genre, index) => (
                        <div key={index} className="tagChip bg-yellow-500 text-white font-bold">{genre.name}</div>
                    ))}
                </div>
            </div>
        );
    };

    // Function to render game types with title
    const renderGameTypes = () => {
        return (
            <div>
                <h3 className="text-lg font-semibold text-grey">Game Types:</h3>
                <div className='flex flex-row flex-shrink gap-2 py-2'>
                    {data.tags.slice(0, 6).map((tag, index) => (
                        <div key={index} className="tagChip bg-yellow-500 text-white font-bold">{tag.name}</div>
                    ))}
                </div>
            </div>
        );
    };

    // Function to render platforms with title
    const renderPlatforms = () => {
        return (
            <div>
                <h3 className="text-lg font-semibold text-grey">Platforms:</h3>
                <div className='flex flex-row flex-shrink gap-2 py-2'>
                    {data.platforms.slice(0, 6).map((platform, index) => (
                        <div key={index} className="tagChip bg-green-500 text-white font-bold">{platform.platform.name}</div>
                    ))}
                </div>
            </div>
        );
    };

    // Function to render the game rating
    const renderRating = () => {
        if (!data || !data.rating) return null;

        return (
            <div className="gameRating" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faStar} className="text-warning" />
                <span className="ms-2">{data.rating}/5.0</span>
            </div>
        );
    };

    // Carousel component
    const Carousel = ({ images }) => {
        const [currentIndex, setCurrentIndex] = useState(0);
      
        const handleNext = () => {
          setCurrentIndex((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
          );
        };
        const handlePrevious = () => {
          setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
          );
        };
        const handleDotClick = (index) => {
          setCurrentIndex(index);
        };

        return (
            <div className="carousel">
                <img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Screenshot ${currentIndex}`}
                />
                <div className="slide_direction">
                    <div className="left" onClick={handlePrevious}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 96 960 960"
                            width="20"
                        >
                            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                        </svg>
                    </div>
                    <div className="right" onClick={handleNext}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 96 960 960"
                            width="20"
                        >
                            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                        </svg>
                    </div>
                </div>
                <div className="indicator">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentIndex === index ? "active" : ""}`}
                            onClick={() => handleDotClick(index)}
                        ></div>
                    ))}
                </div>
            </div>
        );
    };

    

    return (
        <div className='flex w-full h-full min-h-screen px-6 py-6 flex-col'>
            <div className='py-3 px-5 border border-slate-100 relative rounded-lg flex flex-row justify-start items-center w-full h-fit gap-4'>
                <FaSearch color='#ffffff' className='w-8 h-8' />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search Games' className='outline-none bg-transparent flex w-full px-4 py-2 text-slate-100 text-2xl font-semibold' />
            </div>
            <div className='relative mt-2'>
                <div className='z-30 absolute top-0 w-full h-fit rounded-lg overflow-clip'>
                    {suggestions.map((elem, ind) => (
                        <Link to={`/games/${elem.id}`} key={`suggestion-${ind}`}>
                            <div className={`py-2 px-5 bg-slate-50 hover:bg-zinc-900 text-zinc-950 hover:text-slate-50 transition-all ${ind === suggestions.length - 1 ? "" : "border-b border-zinc-400"}`}>
                                <h2 className='text-xl font-semibold'>{elem.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
                
            </div>
          
            <div className='flex flex-col py-6'>
                {data && (
                    <div className="game-info">
                        <div className="game-img border-yellow-500">
                            <img src={data.background_image} alt={data.name} className="w-full h-auto object-cover" />
                        </div>
                        <div className="game-title text-4xl font-bold text-yellow-500">
                            <h1>{data.name}</h1>
                        </div>
                       
                        <div className='date'>
                            Released Year: {releaseYear}
                        </div>
                        
                        <div className='rew-rat'>
                            {renderRating()}
                            <div className="review">
                                {data.ratings_count} reviews
                            </div>
                        </div>
                      
                        {/* Render genres with title */}
                        {renderGenres()}
                        {/* Render game types with title */}
                        {renderGameTypes()}
                        {/* Render platforms with title */}
                        {renderPlatforms()}
                      
                        {/* Render the game rating */}
                      
                       
                        <div className='bg-gray-900 p-6 rounded-lg shadow-md border-yellow-500'>
                            <h2 className='text-2xl font-semibold text-white mb-4'>Description</h2>
                            <p className='text-gray-300 leading-relaxed' dangerouslySetInnerHTML={{ __html: data.description }}></p>
                        </div>
                        
                        {/* Add more details about the game here */}
{data && data.short_screenshots && data.short_screenshots.length > 0 && (
    <Carousel images={data.short_screenshots.map(screenshot => screenshot.image)} />
)}

                    </div>
                )}
            </div>
        </div>
    );
}
