/* eslint-disable react/prop-types */
import "../styles/profile.css";
import { CiFaceSmile } from "react-icons/ci";
import GameCard from "../components/GameCard";
import { useEffect, useState } from "react";
import "../styles/gameCard.css";
import { apiHelper } from "../lib/apiHelper";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null); 
  function isElementInArray(element, array){
    return array.filter(e=>e.id===element.id).length>0
  }
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const user = await apiHelper.getUserById(token, id);
    if (user.error) {
      console.log(user.error);
      return;
    }
    setUserInfo(user);
    setGames(prev=>[])
    user.interestedGames.forEach(async (gameId) => {
      const res = await apiHelper.fetchGameData(gameId);
      console.log(res)
      if(!res)return
      if (res.error) {
        console.log(res.error);
        return;
      }
      setGames((prev) =>  isElementInArray(res, prev)?prev:[...prev, res]);
    })
  };

  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  return userInfo?(
    <main className="main-page">
      <div className="userInfo ">
        <div className="image rounded-xl">
          {/* <img src="../assets/sampleProfile.jpeg" alt="Profile Photo"></img> */}
          <CiFaceSmile className="img" />
        </div>
        <div className="info rounded-xl">
          <div className="nameTimezone rounded-xl">
            <div className="username rounded-xl">Username: {userInfo.username}</div>
            <div className="timezone rounded-xl">Timezone: {(new Date(userInfo.startTime)).getHours().toString()+" to "+(new Date(userInfo.endTime)).getHours().toString()}</div>
          </div>
          <div className="moreInfo">
            <div className="furtherInfo rounded-xl">
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
