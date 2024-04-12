import "../styles/profile_main.css";
import { CiFaceSmile } from "react-icons/ci";

export default function Profile_Main() {
  return (
    <main className="main-page">
      <div className="userInfo">
        <div className="image">
          {/* <img src="../assets/sampleProfile.jpeg" alt="Profile Photo"></img> */}
          <CiFaceSmile className="img" />
        </div>
        <div className="info">
          <div className="nameTimezone">
            <div className="username">Username: AssaultKing777</div>
            <div className="timezone">Timezone: +5:30 UTC</div>
          </div>
          <div className="moreInfo">
            <div className="furtherInfo">
              Email: tirath.bhathawala@gmail.com <br />
              Timezone: +5:30 UTC
            </div>
          </div>
        </div>
      </div>
      <div className="games">
        <div className="game">Sample Game</div>
        <div className="game">Sample Game</div>
        <div className="game">Sample Game</div>
        <div className="game">Sample Game</div>
        <div className="game">Sample Game</div>
      </div>
    </main>
  );
}
