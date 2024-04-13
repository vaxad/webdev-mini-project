/* eslint-disable react/prop-types */
import "../styles/profile.css";
import { CiFaceSmile } from "react-icons/ci";
import GameCard from "../components/GameCard";
import { useEffect, useState } from "react";
import "../styles/gameCard.css";

export default function Profile() {
  const userInfo = {
    username: "AssaultKing777",
    timezone: "+5:30 UTC",
    interestedGenre: "Action",
    rank: "Legendary",
  };
  const { username, timezone, interestedGenre, rank } = userInfo;
  const fetchData = async () => {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=00b1ff86099d4d958b6f4a2d9b43c69c"
    );
    const data = await response.json();
    return data.results;
  };

  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData().then((gamesData) => setGames(gamesData));
  }, []);

  return (
    <main className="main-page">
      <div className="userInfo">
        <div className="image">
          {/* <img src="../assets/sampleProfile.jpeg" alt="Profile Photo"></img> */}
          <CiFaceSmile className="img" />
        </div>
        <div className="info">
          <div className="nameTimezone">
            <div className="username">Username: {username}</div>
            <div className="timezone">Timezone: {timezone}</div>
          </div>
          <div className="moreInfo">
            <div className="furtherInfo">
              Interested Genre: {interestedGenre}
              <br />
              Rank: {rank}
            </div>
          </div>
        </div>
      </div>
      <div className="games">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
