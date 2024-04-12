import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

// Assuming you're fetching this data from an API
const fetchData = async () => {
  const response = await fetch('https://api.rawg.io/api/games?key=00b1ff86099d4d958b6f4a2d9b43c69c');
  const data = await response.json();
  return data.results; // Assuming 'results' contains an array of games
};

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData().then(gamesData => setGames(gamesData));
  }, []);

  return (
    <div className="flex h-full flex-grow justify-center items-center">
      <div className="row">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
