/* eslint-disable react/prop-types */
import "../styles/profile.css";
import { CiFaceSmile } from "react-icons/ci";
import GameCard from "../components/GameCard";
import { useEffect, useState } from "react";
import "../styles/gameCard.css";
import { apiHelper } from "../lib/apiHelper";
import Loader from "../components/Loader";

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null); 
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const user = await apiHelper.getUser(token);
    if (user.error) {
      console.log(user.error);
      return;
    }
    setUserInfo(user);
    setGames(prev=>[])
    user.interestedGames.forEach(async (gameId) => {
      const res = await apiHelper.fetchGameData(gameId);
      if (res.error) {
        console.log(res.error);
        return;
      }
      setGames((prev) => [...prev, res]);
    })
    if (res.error) {
      console.log(res.error);
      return;
    }
    setGames(res)
  };

  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  return userInfo?(
    <main className="main-page">
      <div className="userInfo">
        <div className="image">
          {/* <img src="../assets/sampleProfile.jpeg" alt="Profile Photo"></img> */}
          <CiFaceSmile className="img" />
        </div>
        <div className="info">
          <div className="nameTimezone">
            <div className="username">Username: {userInfo.username}</div>
            <div className="timezone">Timezone: {(new Date(userInfo.startTime)).getHours().toString()+" to "+(new Date(userInfo.endTime)).getHours().toString()}</div>
          </div>
          <div className="moreInfo">
            <div className="furtherInfo">
              Interested Genre: {" "+userInfo.genre.join(", ")}
              <br />
              Rank: {userInfo.rank}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  )
  :
  (
    <main className=" min-h-screen flex flex-col justify-center items-center w-full">
      <Loader/>
    </main>
  )
}
