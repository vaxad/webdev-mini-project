/* eslint-disable react/prop-types */
// import React from "react";  (Assuming React is already imported)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import "../styles/userCard.css"; // Update the CSS file name
import { useState } from "react";
import { Link } from "react-router-dom";

function Timezone({ timezone }) {
  return (
    <div
      className="timeZone"
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      <FontAwesomeIcon icon={faStar} className="text-warning" />
      <span className="ms-2">{timezone} UTC</span>
    </div>
  );
}

function UserCard({ user }) {
  // Rename prop name to 'user'
  // No release year needed for users, remove the logic
  const [hover, setHover] = useState(false);

  // No tag functionality needed for users, remove getRandomTags and randomTags

  return (
    <div className=" p-4 h-full w-full relative flex flex-grow">
      <Link
        to={`/users/${user.id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
        }}
        className="userCard h-full w-full overflow-clip bg-zinc-950 border border-yellow-500"
      >
        <div className=" w-full flex h-3/5 relative">
          <div
            className={`absolute top-0 right-0 h-full w-full opacity-0 ${
              hover ? "opacity-90 cursor-pointer" : ""
            } transition-all delay-75 duration-300 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.9)]`}
          >
            <h1 className=" text-slate-50 font-semibold text-xl text-center ">
              Email:<span className=" font-medium"> {user.email}</span>
            </h1>{" "}
            {/* Assuming there's a email property */}
          </div>
          <img src={user.rank} alt={user.username} className=" w-full h-full" />{" "}
          {/* Assuming there's an rank property */}
        </div>

        <div className=" flex flex-col pb-4">
          <div className="userInfo">
            <div className="left gap-3">
              <div className="userName mt-4 mb-2 text-2xl font-semibold">
                {user.username}
              </div>
              {/* No release date for users */}
            </div>
            <div className="right">
              <div>
                <Timezone timezone={user.timezone} />
              </div>{" "}
              {/* Assuming there's a genre property */}
              <div className="genre">
                {user.selectedGenres ? user.selectedGenres.length : 0}{" "}
                selectedGenres
              </div>{" "}
              {/* Assuming there's a selectedGenres property with a count */}
            </div>
          </div>
          {/* No tag section needed for users */}
        </div>
      </Link>
    </div>
  );
}

export default UserCard;
